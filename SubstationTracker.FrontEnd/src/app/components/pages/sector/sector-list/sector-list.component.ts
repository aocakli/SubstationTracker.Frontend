import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { PaginationRequest } from '@contracts/_common/requests/pagination.request';
import { PaginationResponse } from '@contracts/_common/responses/pagination.response';
import { SectorListDto } from '@contracts/sectors/dtos/sector-list.dto';
import { SectorListRequest } from '@contracts/sectors/requests/sector-list.request';
import { SectorService } from '@services/sectors/sector.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-sector-list',
	templateUrl: './sector-list.component.html',
	styleUrls: ['./sector-list.component.scss']
})

export class SectorListComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { type: 'create-new', titile: 'Sektörler', routerLink: 'create' };

	sectors: SectorListDto[] = [];
	first: number = 0;
	paginationResponse: PaginationResponse | undefined = undefined;
	paginationRequest: PaginationRequest = new PaginationRequest(1, 8);

	private subscribers: Subscription[] = [];

	constructor(private sectorService: SectorService) { }

	getAll() {
		const request = new SectorListRequest(this.paginationRequest);

		const subscriber = this.sectorService.getAll(request).subscribe(response => {
			if (!response || !response.isSuccess) {
				this.sectors = [];
				return;
			}

			this.sectors = response.data;
			this.paginationResponse = response.pagination;
		});

		this.subscribers.push(subscriber);
	}

	onPageChange(event: { page: number, first: number, rows: number, pageCount: number }) {
		this.first = event.first;
		this.paginationRequest.page = event.page + 1;
		this.paginationRequest.itemCount = event.rows;

		this.getAll();
	}

	softDelete(sectorId: string) { this.sectorService.softDelete(sectorId).then(response => response && this.getAll()); }

	loadOnInit() { this.getAll(); }

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
