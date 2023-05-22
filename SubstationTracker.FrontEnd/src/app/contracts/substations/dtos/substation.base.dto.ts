export interface SubstationBaseDto {
	id: string;
	responsibleUserFullNames: string[];
	name: string;
	phoneNumber: string;
	address: string;
	description: string;
	photoPath: string | null;
}