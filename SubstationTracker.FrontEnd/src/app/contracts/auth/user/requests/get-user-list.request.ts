import { PaginationRequest } from "@contracts/_common/requests/pagination.request";
import { UserRoleEnum } from "@contracts/_common/enums/user-role.enum";

export class GetUserListRequest {
	contains: string | null;
	role: UserRoleEnum | null;
	pagination: PaginationRequest;

	constructor(contains?: string, role?: UserRoleEnum, pagination?: PaginationRequest) {
		this.contains = contains || null;
		this.role = role || null;
		this.pagination = pagination || new PaginationRequest();
	}

	get getConvertedUrl() { return "users/get-user-list"; }
}