import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { SectorListDto } from '@contracts/sectors/dtos/sector-list.dto';
import { SectorListRequest } from '@contracts/sectors/requests/sector-list.request';
import { SubstationSingleDto } from '@contracts/substations/dtos/substation-single.dto';
import { SubstationGetByIdRequest } from '@contracts/substations/requests/substation-get-by-id.request';
import { SubstationUpdateRequest } from '@contracts/substations/requests/substation-update.request';
import { WithApiUrlPipe } from '@helpers/pipes/with-api-url.pipe';
import { ToastService } from '@services/_common/toast.service';
import { SectorService } from '@services/sectors/sector.service';
import { SubstationService } from '@services/substations/substation.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-substation-update',
	templateUrl: './substation-update.component.html',
	styleUrls: ['./substation-update.component.scss'],
	providers: [WithApiUrlPipe]
})
export class SubstationUpdateComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { titile: 'Şube Güncelle', type: 'go-back' };
	imageText: string = "Şube Resimi Seç";
	fileString: string = "";
	sectors: SectorListDto[] = [];
	updateForm: FormGroup | undefined = undefined;

	private subscribers: Subscription[] = [];

	get controls() { return this.updateForm?.controls; }

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		private sectorService: SectorService,
		private activatedRoute: ActivatedRoute,
		private withApiUrlPipe: WithApiUrlPipe,
		private substationService: SubstationService,
	) { }

	initForm(substation: SubstationSingleDto) {
		if (!substation) return;

		this.updateForm = this.formBuilder.group({
			id: [substation.id, Validators.required],
			name: [substation.name, [Validators.required]],
			sectorIdentities: [substation.sectors.map(sector => sector.id), [Validators.required]],
			phoneNumber: [substation.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
			description: [substation.description, [Validators.required]],
			address: [substation.address, [Validators.required]],
			image: [null],
		});

		this.fileString = !!substation.photoPath ? this.withApiUrlPipe.transform(substation.photoPath) : "";
	}

	getSubstationById(substationId: string) {
		const request = new SubstationGetByIdRequest(substationId);

		const subscriber = this.substationService.getById(request).subscribe(response => response.isSuccess && this.initForm(response.data));

		this.subscribers.push(subscriber);
	}

	getSubstationFromRoute() {
		const subscriber = this.activatedRoute.params.subscribe(params => {
			const substationId: string = params["id"];
			if (!substationId) {
				this.toastService.error("Şube bilgisi bulunamadı");
				return;
			}

			this.getSubstationById(substationId);
		});

		this.subscribers.push(subscriber);
	}

	onFileChange(event: any) {
		if (!this.updateForm) return;

		const fileList: FileList | undefined = event.target.files;
		if (!fileList) return;

		const file = fileList.item(0);
		if (!file) return;

		this.imageText = file.name;

		const fileString = URL.createObjectURL(file);
		if (!fileString) return;

		this.fileString = fileString;

		this.updateForm.patchValue({ image: file });
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
		if (!this.updateForm || this.updateForm.invalid) {
			this.toastService.warning("Doldurulan veriler geçersiz.");
			return;
		}

		const request = new SubstationUpdateRequest({ ...this.updateForm.value });

		const subscriber = this.substationService.update(request).subscribe(response => response.isSuccess && this.router.navigateByUrl(`/substations`));
		this.subscribers.push(subscriber);
	}

	loadOnInit() {
		this.getSubstationFromRoute();
		this.getAllSectors();
	}

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
