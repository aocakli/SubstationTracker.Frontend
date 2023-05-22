import { PaginateDataResponse } from "@contracts/_common/responses/paginate-data.response";
import { ProductListDto } from "../dtos/product-list.dto";

export interface ProductListResponse extends PaginateDataResponse<ProductListDto> { }