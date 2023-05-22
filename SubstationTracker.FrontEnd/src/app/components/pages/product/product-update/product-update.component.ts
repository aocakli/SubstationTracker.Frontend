import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { ProductSingleDto } from '@contracts/products/dtos/product-single.dto';
import { ProductGetByIdRequest } from '@contracts/products/requests/product-get-by-id.request';
import { ProductUpdateRequest } from '@contracts/products/requests/product-update.request';
import { SectorListDto } from '@contracts/sectors/dtos/sector-list.dto';
import { SectorListRequest } from '@contracts/sectors/requests/sector-list.request';
import { WithApiUrlPipe } from '@helpers/pipes/with-api-url.pipe';
import { ToastService } from '@services/_common/toast.service';
import { ProductService } from '@services/products/product.service';
import { SectorService } from '@services/sectors/sector.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product-update',
	templateUrl: './product-update.component.html',
	styleUrls: ['./product-update.component.scss'],
	providers: [WithApiUrlPipe]
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { type: 'go-back', titile: 'Ürün Güncelle' };

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
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private withApiUrlPipe: WithApiUrlPipe
	) { }

	initForm(product: ProductSingleDto) {
		if (!product) return;

		this.createForm = this.formBuilder.group({
			id: [product.id, [Validators.required]],
			sectorIdentities: [product.sectors.map(sector => sector.sectorId), [Validators.required]],
			name: [product.name, [Validators.required]],
			unit: [product.unit, [Validators.required]],
			image: [null],
		});

		this.fileString = !!product.photoPath ? this.withApiUrlPipe.transform(product.photoPath) : "";
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

	getProductById(sectorId: string) {
		const request = new ProductGetByIdRequest(sectorId);

		const subscriber = this.productService.getById(request).subscribe(response => response.isSuccess && this.initForm(response.data));

		this.subscribers.push(subscriber);
	}

	getProductIdFromRoute() {
		const subscriber = this.activatedRoute.params.subscribe(params => {
			const substationId: string = params["id"];
			if (!substationId) {
				this.toastService.error("Product bilgisi bulunamadı");
				return;
			}

			this.getProductById(substationId);
		});

		this.subscribers.push(subscriber);
	}

	submitForm() {
		if (!this.createForm || this.createForm.invalid) {
			this.toastService.warning("Doldurulan veriler geçersiz.");
			return;
		}

		const request = new ProductUpdateRequest({ ...this.createForm.value });

		const subscriber = this.productService.update(request).subscribe(response => response.isSuccess && this.router.navigateByUrl(`/products`));
		this.subscribers.push(subscriber);
	}

	loadOnInit() {
		this.getProductIdFromRoute();
		this.getAllSectors();
	}

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}