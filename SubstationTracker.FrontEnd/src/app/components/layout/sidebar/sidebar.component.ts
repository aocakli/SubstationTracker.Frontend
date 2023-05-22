import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDto } from '@contracts/auth/_common/dtos/auth.dto';
import { environment } from '@environments/environment';
import { AuthService } from '@services/auth/auth.service';

@Component({
	selector: 'layout-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	auth: AuthDto | null;
	projectName: string = environment.projectName;

	constructor(private router: Router, private authService: AuthService) {
		this.auth = this.authService.authData;
	}

	get role() {
		return this.auth?.role.roles.join(' ');
	}

	logOut() {
		this.authService.logOut();
		this.router.navigateByUrl('/auth/login');
	}
}
