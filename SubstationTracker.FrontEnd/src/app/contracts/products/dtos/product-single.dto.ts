import { ProductSectorDto } from "./product-sector.dto";
import { ProductBaseDto } from "./product.base.dto";

export interface ProductSingleDto extends ProductBaseDto {
	sectors: ProductSectorDto[];
}