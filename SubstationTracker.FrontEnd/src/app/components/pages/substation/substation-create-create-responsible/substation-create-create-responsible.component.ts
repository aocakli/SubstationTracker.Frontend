import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { CreateUserAndAssignResponsiblesRequest } from '@contracts/substations/requests/create-user-and-assign-responsibles.request';
import { ToastService } from '@services/_common/toast.service';
import { SubstationService } from '@services/substations/substation.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-substation-create-create-responsible',
	templateUrl: './substation-create-create-responsible.component.html',
	styleUrls: ['./substation-create-create-responsible.component.scss']
})
export class SubstationCreateCreateResponsibleComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { titile: 'Yeni Sorumlu Oluştur', type: 'go-back' };
	createForm: FormGroup | undefined = undefined;

	private subscribers: Subscription[] = [];

	get controls() { return this.createForm?.controls; }

	get userControls() { return (this.createForm?.get('user') as FormGroup).controls; };

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private substationService: SubstationService,
	) { }

	initForm() {
		this.createForm = this.formBuilder.group({
			substationId: [null, [Validators.required]],
			canForceAssignResponsibleToSubstation: [false],
			user: this.formBuilder.group({
				name: [null, [Validators.required]],
				surname: [null, [Validators.required]],
				email: [null, [Validators.required, Validators.email]],
				password: [null, [Validators.required]]
			})
		});
	}

	setFormSubstationIdFromRoute() {
		if (!this.createForm) return;


		const subscriber = this.activatedRoute.params.subscribe(param => {
			const substationId: string = param["id"];
			if (!substationId) {
				this.toastService.error("Şube bilgisi bulunamadı");
				return;
			}

			this.createForm?.patchValue({
				substationId
			});
		});

		this.subscribers.push(subscriber);
	}

	submitForm() {
		if (!this.createForm || this.createForm.invalid) {
			this.toastService.warning("Doldurulan veriler geçersiz.");
			return;
		}

		const request = new CreateUserAndAssignResponsiblesRequest({ ...this.createForm.value });

		const subscriber = this.substationService.createUserAndAssignResponsibles(request).subscribe(response => response.isSuccess && this.router.navigateByUrl("/substations"));
		this.subscribers.push(subscriber);
	}

	loadOnInit() {
		this.initForm();
		this.setFormSubstationIdFromRoute();
	}

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
