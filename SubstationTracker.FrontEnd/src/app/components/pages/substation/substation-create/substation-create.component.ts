import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { SectorListDto } from '@contracts/sectors/dtos/sector-list.dto';
import { SectorListRequest } from '@contracts/sectors/requests/sector-list.request';
import { SubstationCreateRequest } from '@contracts/substations/requests/substation-create.request';
import { ToastService } from '@services/_common/toast.service';
import { SectorService } from '@services/sectors/sector.service';
import { SubstationService } from '@services/substations/substation.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-substation-create',
	templateUrl: './substation-create.component.html',
	styleUrls: ['./substation-create.component.scss']
})
export class SubstationCreateComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { titile: 'Şube Ekle', type: 'go-back' };
	fileString: string = "";
	imageText: string = "Şube Resimi Seç";
	sectors: SectorListDto[] = [];
	createForm: FormGroup | undefined = undefined;

	private subscribers: Subscription[] = [];

	get controls() { return this.createForm?.controls; }

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		private sectorService: SectorService,
		private substationService: SubstationService,
	) { }

	initForm() {
		this.createForm = this.formBuilder.group({
			name: [null, [Validators.required]],
			sectorIdentities: [null, [Validators.required]],
			phoneNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
			description: [null, [Validators.required]],
			address: [null, [Validators.required]],
			image: [null],
		});
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

	submitForm() {
		if (!this.createForm || this.createForm.invalid) {
			this.toastService.warning("Doldurulan veriler geçersiz.");
			return;
		}

		const request = new SubstationCreateRequest({ ...this.createForm.value });

		const subscriber = this.substationService.create(request).subscribe(response => response.isSuccess && this.router.navigateByUrl(`/substations/create/choice/${response.data.id}`));
		this.subscribers.push(subscriber);
	}

	loadOnInit() {
		this.initForm();
		this.getAllSectors();
	}

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
