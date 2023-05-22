export class SectorUpdateRequest {
	id: string;
	name: string;
	description: string | null;

	constructor({ ...props }: SectorUpdateRequest | null = null) {
		this.id = props.id || "";
		this.name = props.name || "";
		this.description = props.description || null;
	}

	get getConvertedUrl() { return "sectors/update"; }
}