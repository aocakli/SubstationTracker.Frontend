import { BaseResponse } from "./base.response";

export interface DataResponse<T> extends BaseResponse {
	data: T;
}