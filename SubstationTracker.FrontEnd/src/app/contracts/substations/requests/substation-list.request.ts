import { PaginationRequest } from "@contracts/_common/requests/pagination.request";

export class SubstationListRequest {
	pagination: PaginationRequest;

	constructor(pagination?: PaginationRequest) {
		this.pagination = pagination || new PaginationRequest();
	}

	get getConvertedUrl() { return "substations/get-list"; }
}