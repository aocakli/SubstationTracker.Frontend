import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { PaginationRequest } from '@contracts/_common/requests/pagination.request';
import { PaginationResponse } from '@contracts/_common/responses/pagination.response';
import { SubstationListDto } from '@contracts/substations/dtos/substations-list.dto';
import { SubstationListRequest } from '@contracts/substations/requests/substation-list.request';
import { SubstationDetailComponent } from '../substation-detail/substation-detail.component';
import { SubstationService } from '@services/substations/substation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-substation-list',
	templateUrl: './substation-list.component.html',
	styleUrls: ['./substation-list.component.scss']
})
export class SubstationListComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { titile: 'Şubeler', routerLink: '/substations/create', type: 'create-new' };

	substations: SubstationListDto[] = [];
	first: number = 0;
	paginationResponse: PaginationResponse | undefined = undefined;
	paginationRequest: PaginationRequest = new PaginationRequest();

	private subscribers: Subscription[] = [];

	constructor(private substationService: SubstationService, private dialogService: DialogService) { }

	getAll() {
		const request = new SubstationListRequest(this.paginationRequest);
		const subscriber = this.substationService.getAll(request).subscribe(response => {
			if (!response || !response.isSuccess) {
				this.substations = [];
				return;
			}

			this.substations = response.data;
			this.paginationResponse = response.pagination;
		});
		this.subscribers.push(subscriber);
	}

	openDetail(substation: SubstationListDto) { this.dialogService.open(SubstationDetailComponent, { data: substation, header: substation.name, styleClass: 'custom-dialog' }); }

	softDelete(substationId: string) {
		this.substationService.softDelete(substationId).then(response => response && this.getAll())
	}

	onPageChange(event: { page: number, first: number, rows: number, pageCount: number }) {
		this.first = event.first;
		this.paginationRequest.page = event.page + 1;
		this.paginationRequest.itemCount = event.rows;

		this.getAll();
	}

	loadOnInit() { this.getAll(); }

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
