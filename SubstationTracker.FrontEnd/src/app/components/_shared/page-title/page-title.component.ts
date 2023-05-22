import { Component, Input } from '@angular/core';
import { environment } from '@environments/environment';

enum PageTitleType {
	GoBack = 'go-back',
	CreateNew = 'create-new'
}

export class PageTitleConfig {
	titile: string = environment.projectName;
	type: `${PageTitleType}` = 'go-back';
	routerLink?: string = '/';
	clickCallback?: () => void;
}

@Component({
	selector: 'shared-page-title',
	templateUrl: './page-title.component.html',
	styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
	@Input() config: Partial<PageTitleConfig> = new PageTitleConfig();
}
