export class UserLoginRequest {
	email: string;
	password: string;

	constructor(email?: string, password?: string) {
		this.email = email || "";
		this.password = password || "";
	}

	get getConvertedUrl() { return "users/login"; }
}