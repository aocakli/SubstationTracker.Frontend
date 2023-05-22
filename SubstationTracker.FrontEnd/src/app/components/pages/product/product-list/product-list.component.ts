import { Component } from '@angular/core';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { PaginationRequest } from '@contracts/_common/requests/pagination.request';
import { PaginationResponse } from '@contracts/_common/responses/pagination.response';
import { ProductListDto } from '@contracts/products/dtos/product-list.dto';
import { ProductGetByIdRequest } from '@contracts/products/requests/product-get-by-id.request';
import { ProductListRequest } from '@contracts/products/requests/product-list.request';
import { DateFormatEnum } from '@helpers/enums/date-format.enum';
import { ProductService } from '@services/products/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
	pageTitleConfig: PageTitleConfig = { type: 'create-new', titile: 'Ürünler', routerLink: 'create' };

	products: ProductListDto[] = [];
	first: number = 0;
	paginationRequest: PaginationRequest = new PaginationRequest(1, 4);
	paginationResponse: PaginationResponse | undefined = undefined;
	dateFormatEnum = DateFormatEnum;

	private subscribers: Subscription[] = [];

	constructor(private productService: ProductService, private dialogService: DialogService) { }

	getAll() {
		const request = new ProductListRequest(this.paginationRequest);

		const subscriber = this.productService.getAll(request).subscribe(response => {
			if (!response || !response.isSuccess) {
				this.products = [];
				return;
			}

			this.products = response.data;
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

	openDetail(productId: string) {
		const request = new ProductGetByIdRequest(productId);

		const subscriber = this.productService.getById(request).subscribe(response => {
			if (!response.isSuccess) return;

			this.dialogService.open(ProductDetailComponent, { data: response.data, header: response.data.name, styleClass: 'custom-dialog' });
		});

		this.subscribers.push(subscriber);
	}

	softDelete(productId: string) { this.productService.softDelete(productId).then(response => response && this.getAll()); }

	ngOnInit(): void { this.getAll(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
