import { DataResponse } from "@contracts/_common/responses/data.response";
import { ProductSingleDto } from "../dtos/product-single.dto";

export interface ProductGetByIdResponse extends DataResponse<ProductSingleDto> { }