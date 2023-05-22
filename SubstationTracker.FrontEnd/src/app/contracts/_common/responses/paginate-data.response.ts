import { DataResponse } from "./data.response";
import { PaginationResponse } from "./pagination.response";

export interface PaginateDataResponse<T> extends DataResponse<Array<T>> {
	pagination: PaginationResponse;
}