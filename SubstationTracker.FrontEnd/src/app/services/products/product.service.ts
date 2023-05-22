import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCreateRequest } from '@contracts/products/requests/product-create.request';
import { ProductGetByIdRequest } from '@contracts/products/requests/product-get-by-id.request';
import { ProductListBySubstationRequest } from '@contracts/products/requests/product-list-by-substation.request';
import { ProductListRequest } from '@contracts/products/requests/product-list.request';
import { ProductUpdateRequest } from '@contracts/products/requests/product-update.request';
import { ProductCreateResponse } from '@contracts/products/responses/product-create.response';
import { ProductGetByIdResponse } from '@contracts/products/responses/product-get-by-id.response';
import { ProductListBySubstationResponse } from '@contracts/products/responses/product-list-by-substation.response';
import { ProductListResponse } from '@contracts/products/responses/product-list.response';
import { ProductUpdateResponse } from '@contracts/products/responses/product-update.response';
import { HttpBaseService } from '@services/_common/http-base.service';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService extends HttpBaseService {
	constructor(httpClient: HttpClient, confirmationService: ConfirmationService) { super(httpClient, confirmationService); }

	create(request: ProductCreateRequest): Observable<ProductCreateResponse> {
		return this.postData(request.getConvertedUrl, request, true);
	}

	update(request: ProductUpdateRequest): Observable<ProductUpdateResponse> {
		return this.putData(request.getConvertedUrl, request, true);
	}

	softDelete(id: string): Promise<boolean> {
		return this.deleteData("products/delete", id);
	}

	getById(request: ProductGetByIdRequest): Observable<ProductGetByIdResponse> {
		return this.getData(request.getConvertedUrl);
	}

	getListBySubstation(request: ProductListBySubstationRequest): Observable<ProductListBySubstationResponse> {
		return this.postData(request.getConvertedUrl, request);
	}

	getAll(request: ProductListRequest): Observable<ProductListResponse> {
		return this.postData(request.getConvertedUrl, request);
	}
}
