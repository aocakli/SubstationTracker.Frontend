import { ProductBaseDto } from "./product.base.dto";

export interface ProductListDto extends ProductBaseDto {
	sectorNames: string[];
}