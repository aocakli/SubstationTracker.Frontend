export class ProductGetByIdRequest {
	private id: string;

	constructor(id: string) {
		this.id = id;
	}

	get getConvertedUrl() { return `products/${this.id}`; }
}