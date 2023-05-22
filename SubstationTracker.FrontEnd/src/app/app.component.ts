import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	confirmDialogBreakpoints: object = { '960px': '75vw', '640px': '90vw' };
}
