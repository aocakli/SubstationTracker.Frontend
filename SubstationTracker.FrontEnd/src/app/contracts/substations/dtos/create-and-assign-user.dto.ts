export class CreateAndAssignUser {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;

	constructor({ ...props }: CreateAndAssignUser | null = null) {
		this.name = props.name || "";
		this.surname = props.surname || "";
		this.email = props.email || "";
		this.password = props.password || "";
		this.confirmPassword = props.confirmPassword || props.password || "";
	}
}