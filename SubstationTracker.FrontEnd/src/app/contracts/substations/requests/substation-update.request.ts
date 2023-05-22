export class SubstationUpdateRequest {
	id: string = "";
	sectorIdentities: string = "";
	name: string = "";
	phoneNumber: string = "";
	address: string = "";
	description: string = "";
	image: File = new File([], "");

	constructor({ ...props }: SubstationUpdateRequest | null = null) {
		if (!props) return;

		this.id = props.id
		this.sectorIdentities = props.sectorIdentities;
		this.name = props.name;
		this.phoneNumber = props.phoneNumber;
		this.address = props.address;
		this.description = props.description;
		this.image = props.image;
	}

	get getConvertedUrl() { return "substations/update"; }
}