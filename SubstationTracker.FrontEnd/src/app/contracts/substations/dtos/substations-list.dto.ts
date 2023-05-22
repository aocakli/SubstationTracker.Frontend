import { SubstationBaseDto } from "./substation.base.dto";

export interface SubstationListDto extends SubstationBaseDto {
	sectors: string[];
}