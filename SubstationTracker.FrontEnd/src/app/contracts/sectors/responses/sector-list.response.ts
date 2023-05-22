import { PaginateDataResponse } from "@contracts/_common/responses/paginate-data.response";
import { SectorListDto } from "../dtos/sector-list.dto";

export interface SectorListResponse extends PaginateDataResponse<SectorListDto> { }