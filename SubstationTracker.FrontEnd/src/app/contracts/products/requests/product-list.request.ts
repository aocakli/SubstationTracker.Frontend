import { PaginationRequest } from "@contracts/_common/requests/pagination.request";

export class ProductListRequest {
	pagination: PaginationRequest;

	constructor(pagination?: PaginationRequest) {
		this.pagination = pagination || new PaginationRequest();
	}

	get getConvertedUrl() { return "products/get-list"; }
}