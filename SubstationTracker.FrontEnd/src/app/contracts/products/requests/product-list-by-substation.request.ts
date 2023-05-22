import { PaginationRequest } from "@contracts/_common/requests/pagination.request";

export class ProductListBySubstationRequest {
	userId: string;
	substationId: string;
	pagination: PaginationRequest;

	constructor(props?: Partial<ProductListBySubstationRequest>) {
		this.userId = props?.userId || "";
		this.substationId = props?.substationId || "";
		this.pagination = props?.pagination || new PaginationRequest();
	}

	get getConvertedUrl() { return "products/get-list-by-substation"; }
}