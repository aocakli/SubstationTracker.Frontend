import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	constructor() { }

	ngOnInit(): void {
		const body = document.getElementsByTagName("body")[0];

		if (body.className.includes("login-page")) {
			body.className = body.className.replace("login-page", "sidebar-mini");
			if (window.innerWidth <= 720)
				body.className = body.className.replace("sidebar-open", "sidebar-closed sidebar-collapse");
		}
	}
}
