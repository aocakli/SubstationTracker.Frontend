import { DataResponse } from "@contracts/_common/responses/data.response";
import { SubstationSingleDto } from "../dtos/substation-single.dto";

export interface SubstationGetByIdResponse extends DataResponse<SubstationSingleDto> { }