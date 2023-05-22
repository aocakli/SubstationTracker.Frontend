import { Injectable } from '@angular/core';
import { AuthDto } from '@contracts/auth/_common/dtos/auth.dto';
import { LocalStorageService } from '@helpers/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private localStorageService: LocalStorageService) { }

	get authData(): AuthDto | null { return this.localStorageService.getAndParse('auth'); }

	get isLoggedIn() {
		if (!this.authData) return false;

		if (new Date(this.authData.accessToken.expiryDate) < new Date()) {
			this.localStorageService.remove('auth');
			return false
		};

		return true;
	}

	logOut() { this.localStorageService.remove('auth'); }
}
