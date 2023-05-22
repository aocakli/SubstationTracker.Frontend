import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { ProductCreateRequest } from '@contracts/products/requests/product-create.request';
import { SectorListDto } from '@contracts/sectors/dtos/sector-list.dto';
import { SectorListRequest } from '@contracts/sectors/requests/sector-list.request';
import { ToastService } from '@services/_common/toast.service';
import { ProductService } from '@services/products/product.service';
import { SectorService } from '@services/sectors/sector.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product-create',
	templateUrl: './product-create.component.html',
	styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { type: 'go-back', titile: 'Ürün Ekle' };

	createForm: FormGroup | undefined = undefined;
	fileString: string = "";
	imageText: string = "Ürün Resimi Seç";
	sectors: SectorListDto[] = [];

	private subscribers: Subscription[] = [];

	get controls() { return this.createForm?.controls; }

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		private sectorService: SectorService,
		private productService: ProductService
	) { }

	initForm() {
		this.createForm = this.formBuilder.group({
			sectorIdentities: [null, [Validators.required]],
			name: [null, [Validators.required]],
			unit: [null, [Validators.required]],
			image: [null],
		});
	}

	getAllSectors() {
		const request = new SectorListRequest();
		request.pagination.itemCount = null;

		const subscriber = this.sectorService.getAll(request).subscribe(response => {
			if (!response.isSuccess) {
				this.sectors = [];
				return;
			}

			this.sectors = response.data;
		});

		this.subscribers.push(subscriber);
	}

	onFileChange(event: any) {
		if (!this.createForm) return;

		const fileList: FileList | undefined = event.target.files;
		if (!fileList) return;

		const file = fileList.item(0);
		if (!file) return;

		this.imageText = file.name;

		const fileString = URL.createObjectURL(file);
		if (!fileString) return;

		this.fileString = fileString;

		this.createForm.patchValue({ image: file });
	}

	submitForm() {
		if (!this.createForm || this.createForm.invalid) {
			this.toastService.warning("Doldurulan veriler geçersiz.");
			return;
		}

		const request = new ProductCreateRequest({ ...this.createForm.value });

		const subscriber = this.productService.create(request).subscribe(response => response.isSuccess && this.router.navigateByUrl(`/products`));
		this.subscribers.push(subscriber);
	}

	loadOnInit() {
		this.initForm();
		this.getAllSectors();
	}

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
