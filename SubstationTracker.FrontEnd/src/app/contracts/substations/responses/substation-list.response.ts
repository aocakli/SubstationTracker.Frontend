import { PaginateDataResponse } from "@contracts/_common/responses/paginate-data.response";
import { SubstationListDto } from "../dtos/substations-list.dto";

export interface SubstationListResponse extends PaginateDataResponse<SubstationListDto> { }