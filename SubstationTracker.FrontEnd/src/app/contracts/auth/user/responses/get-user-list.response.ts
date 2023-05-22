import { PaginateDataResponse } from "@contracts/_common/responses/paginate-data.response";
import { UserForListDto } from "../dtos/user-for-list.dto";

export interface GetUserListResponse extends PaginateDataResponse<UserForListDto> { }