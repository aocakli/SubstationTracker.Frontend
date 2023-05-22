import { PaginateDataResponse } from "@contracts/_common/responses/paginate-data.response";
import { ProductBaseDto } from "../dtos/product.base.dto";

export interface ProductListBySubstationResponse extends PaginateDataResponse<ProductBaseDto> { }