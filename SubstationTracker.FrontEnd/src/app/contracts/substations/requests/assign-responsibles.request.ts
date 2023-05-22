export class AssignResponsiblesRequest {
	substationId: string;
	userIdentities: string[];
	canTransferTheResponsibleUser: boolean;

	constructor(substationId: string, userIdentities: string[] | string, canTransferTheResponsibleUser: boolean) {
		this.substationId = substationId;
		this.userIdentities = typeof userIdentities === 'string' ? [userIdentities] : userIdentities;
		this.canTransferTheResponsibleUser = canTransferTheResponsibleUser;
	}

	get getConvertedUrl() { return "substations/assign-responsibles"; }
}