import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { SectorSingleDto } from '@contracts/sectors/dtos/sector-single.dto';
import { SectorGetByIdRequest } from '@contracts/sectors/requests/sector-get-by-id.request';
import { SectorUpdateRequest } from '@contracts/sectors/requests/sector-update.request';
import { ToastService } from '@services/_common/toast.service';
import { SectorService } from '@services/sectors/sector.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-sector-update',
	templateUrl: './sector-update.component.html',
	styleUrls: ['./sector-update.component.scss']
})
export class SectorUpdateComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { type: 'go-back', titile: 'Sektör Güncelle' };
	updateForm: FormGroup | undefined = undefined;

	private subscribers: Subscription[] = [];

	get controls() { return this.updateForm?.controls; }

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		private sectorService: SectorService,
		private activatedRoute: ActivatedRoute
	) { }

	initForm(sector: SectorSingleDto) {
		this.updateForm = this.formBuilder.group({
			id: [sector.id, [Validators.required]],
			name: [sector.name, [Validators.required]],
			description: [sector.description || null],
		});
	}

	getSectorById(sectorId: string) {
		const request = new SectorGetByIdRequest(sectorId);

		const subscriber = this.sectorService.getById(request).subscribe(response => response.isSuccess && this.initForm(response.data));

		this.subscribers.push(subscriber);
	}

	getSectorFromRoute() {
		const subscriber = this.activatedRoute.params.subscribe(params => {
			const substationId: string = params["id"];
			if (!substationId) {
				this.toastService.error("Şube bilgisi bulunamadı");
				return;
			}

			this.getSectorById(substationId);
		});

		this.subscribers.push(subscriber);
	}

	submitForm() {
		if (!this.updateForm || this.updateForm.invalid) {
			this.toastService.warning("Doldurulan veriler geçersiz.");
			return;
		}

		const request = new SectorUpdateRequest({ ...this.updateForm.value });

		const subscriber = this.sectorService.update(request).subscribe(response => response.isSuccess && this.router.navigateByUrl(`/sectors`));
		this.subscribers.push(subscriber);
	}

	ngOnInit(): void { this.getSectorFromRoute(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
