import { CreateAndAssignUser } from "../dtos/create-and-assign-user.dto";

export class CreateUserAndAssignResponsiblesRequest {
	substationId: string;
	canForceAssignResponsibleToSubstation: boolean;
	user: CreateAndAssignUser;

	constructor({ ...props }: CreateUserAndAssignResponsiblesRequest | null = null) {
		this.substationId = props.substationId || "";
		this.canForceAssignResponsibleToSubstation = props.canForceAssignResponsibleToSubstation || false;
		this.user = new CreateAndAssignUser({ ...props.user });
	}

	get getConvertedUrl() { return "substations/create-user-and-assign-responsibles"; }
}
