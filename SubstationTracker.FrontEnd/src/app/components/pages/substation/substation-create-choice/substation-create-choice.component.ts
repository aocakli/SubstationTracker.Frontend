import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { ToastService } from '@services/_common/toast.service';

@Component({
	selector: 'app-substation-create-choice',
	templateUrl: './substation-create-choice.component.html',
	styleUrls: ['./substation-create-choice.component.scss']
})
export class SubstationCreateChoiceComponent implements OnInit {
	pageTitleConfig: PageTitleConfig = { titile: 'Sorumlu Tipi Seç', type: 'go-back' };
	substationId: string = "";

	constructor(private toastService: ToastService, private activatedRoute: ActivatedRoute) { }

	getSubstationIdFromRoute() {
		const params = this.activatedRoute.snapshot.params;
		const substationId: string = params["id"];
		if (!substationId) {
			this.toastService.error("Şube bilgisi bulunamadı");
			return;
		}

		this.substationId = substationId;
	}

	ngOnInit(): void { this.getSubstationIdFromRoute(); }
}
