import { SectorBaseDto } from "@contracts/sectors/dtos/sector.base.dto";
import { SubstationBaseDto } from "./substation.base.dto";

export interface SubstationSingleDto extends SubstationBaseDto {
	sectors: SectorBaseDto[];
}