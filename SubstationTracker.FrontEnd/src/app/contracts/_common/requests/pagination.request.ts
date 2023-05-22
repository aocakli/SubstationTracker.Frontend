import { OrderByEnum } from "../enums/order-by-enum";

export class PaginationRequest {
	page: number;
	itemCount: number | null;
	orderBy: OrderByEnum;

	constructor(page?: number, itemCount?: number | null, orderBy?: OrderByEnum) {
		this.page = page || 1;
		this.itemCount = typeof itemCount !== 'undefined' ? itemCount : 4;
		this.orderBy = orderBy || OrderByEnum.Descending;
	}
}