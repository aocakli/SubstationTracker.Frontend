export class ProductCreateRequest {
	sectorIdentities: string[] | null;
	name: string;
	unit: string;
	image: File | null;

	constructor({ ...props }: ProductCreateRequest | null = null) {
		this.sectorIdentities = props.sectorIdentities || null;
		this.name = props.name || "";
		this.unit = props.unit || "";
		this.image = props.image || null;
	}

	get getConvertedUrl() { return "products/create"; }
}