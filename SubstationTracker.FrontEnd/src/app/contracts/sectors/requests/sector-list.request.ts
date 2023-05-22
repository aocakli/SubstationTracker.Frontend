import { PaginationRequest } from "@contracts/_common/requests/pagination.request";

export class SectorListRequest {
	pagination: PaginationRequest;

	constructor(pagination?: PaginationRequest) {
		this.pagination = pagination || new PaginationRequest();
	}

	get getConvertedUrl() { return "sectors/get-list"; }
}