export class ProductUpdateRequest {
	id: string;
	sectorIdentities: string[] | null;
	name: string;
	unit: string;
	image: File | null;

	constructor({ ...props }: ProductUpdateRequest | null = null) {
		this.id = props.id || "";
		this.sectorIdentities = props.sectorIdentities || null;
		this.name = props.name || "";
		this.unit = props.unit || "";
		this.image = props.image || null;
	}

	get getConvertedUrl() { return "products/update"; }
}