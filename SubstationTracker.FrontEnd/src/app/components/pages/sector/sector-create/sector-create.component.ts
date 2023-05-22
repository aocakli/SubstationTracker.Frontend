import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { SectorCreateRequest } from '@contracts/sectors/requests/sector-create.request';
import { ToastService } from '@services/_common/toast.service';
import { SectorService } from '@services/sectors/sector.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-sector-create',
	templateUrl: './sector-create.component.html',
	styleUrls: ['./sector-create.component.scss']
})
export class SectorCreateComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { type: 'go-back', titile: 'Sektör Ekle' };
	createForm: FormGroup | undefined = undefined;

	private subscribers: Subscription[] = [];

	get controls() { return this.createForm?.controls; }

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		private sectorService: SectorService
	) { }

	initForm() {
		this.createForm = this.formBuilder.group({
			name: [null, [Validators.required]],
			description: [null],
		});
	}

	submitForm() {
		if (!this.createForm || this.createForm.invalid) {
			this.toastService.warning("Doldurulan veriler geçersiz.");
			return;
		}

		const request = new SectorCreateRequest({ ...this.createForm.value });

		const subscriber = this.sectorService.create(request).subscribe(response => response.isSuccess && this.router.navigateByUrl(`/sectors`));
		this.subscribers.push(subscriber);
	}

	ngOnInit(): void { this.initForm(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
