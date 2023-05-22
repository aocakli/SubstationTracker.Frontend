export class SectorGetByIdRequest {
	private id: string;

	constructor(id: string) {
		this.id = id;
	}

	get getConvertedUrl() { return `sectors/get-by-id?Id=${this.id}`; }
}