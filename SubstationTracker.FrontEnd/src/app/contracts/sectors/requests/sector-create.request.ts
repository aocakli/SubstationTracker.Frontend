export class SectorCreateRequest {
	name: string;
	description: string | null;

	constructor({ ...props }: SectorCreateRequest | null = null) {
		this.name = props.name || "";
		this.description = props.description || null;
	}

	get getConvertedUrl() { return "sectors/create"; }
}