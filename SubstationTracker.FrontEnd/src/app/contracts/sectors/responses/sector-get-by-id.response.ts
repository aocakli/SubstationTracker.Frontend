import { DataResponse } from "@contracts/_common/responses/data.response";
import { SectorSingleDto } from "../dtos/sector-single.dto";

export interface SectorGetByIdResponse extends DataResponse<SectorSingleDto> { }