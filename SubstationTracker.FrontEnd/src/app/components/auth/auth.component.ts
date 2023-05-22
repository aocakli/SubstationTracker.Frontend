import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
	constructor() { }

	ngOnInit(): void {
		const body = document.getElementsByTagName("body")[0];

		if (body.className.includes("sidebar-mini"))
			body.className = body.className.replace("sidebar-mini", "login-page")
	}
}
