import { Component } from '@angular/core';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { PaginationRequest } from '@contracts/_common/requests/pagination.request';
import { PaginationResponse } from '@contracts/_common/responses/pagination.response';
import { ProductBaseDto } from '@contracts/products/dtos/product.base.dto';
import { ProductGetByIdRequest } from '@contracts/products/requests/product-get-by-id.request';
import { ProductListBySubstationRequest } from '@contracts/products/requests/product-list-by-substation.request';
import { DateFormatEnum } from '@helpers/enums/date-format.enum';
import { AuthService } from '@services/auth/auth.service';
import { ProductService } from '@services/products/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@services/_common/toast.service';

@Component({
	selector: 'app-product-list-by-substation',
	templateUrl: './product-list-by-substation.component.html',
	styleUrls: ['./product-list-by-substation.component.scss']
})
export class ProductListBySubstationComponent {
	pageTitleConfig: PageTitleConfig = { type: 'create-new', titile: 'Ürünler', routerLink: '/products/create' };

	products: ProductBaseDto[] = [];
	userId: string;
	substationId: string = "";
	first: number = 0;
	paginationRequest: PaginationRequest = new PaginationRequest(1, 4);
	paginationResponse: PaginationResponse | undefined = undefined;
	dateFormatEnum = DateFormatEnum;

	private subscribers: Subscription[] = [];

	constructor(
		private authService: AuthService,
		private toastService: ToastService,
		private dialogService: DialogService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
	) { this.userId = this.authService.authData?.id || ""; }

	getListBySubstation() {
		const request = new ProductListBySubstationRequest({ substationId: this.substationId, userId: this.userId, pagination: this.paginationRequest });

		const subscriber = this.productService.getListBySubstation(request).subscribe(response => {
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

		this.getListBySubstation();
	}

	openDetail(productId: string) {
		const request = new ProductGetByIdRequest(productId);

		const subscriber = this.productService.getById(request).subscribe(response => {
			if (!response.isSuccess) return;

			this.dialogService.open(ProductDetailComponent, { data: response.data, header: response.data.name, styleClass: 'custom-dialog' });
		});

		this.subscribers.push(subscriber);
	}

	softDelete(productId: string) { this.productService.softDelete(productId).then(response => response && this.getListBySubstation()); }

	getSubstationFromRoute() {
		const subscriber = this.activatedRoute.params.subscribe(params => {
			const substationId: string = params["substationId"];
			if (!substationId) {
				this.toastService.error("Product bilgisi bulunamadı");
				return;
			}
			this.substationId = substationId;
			this.getListBySubstation();
		});
	}

	ngOnInit(): void { this.getSubstationFromRoute(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
