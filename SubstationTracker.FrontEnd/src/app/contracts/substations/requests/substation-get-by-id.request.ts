export class SubstationGetByIdRequest {
	private id: string;

	constructor(id: string) {
		this.id = id;
	}

	get getConvertedUrl() { return `substations/get-by-id?Id=${this.id}`; }
}