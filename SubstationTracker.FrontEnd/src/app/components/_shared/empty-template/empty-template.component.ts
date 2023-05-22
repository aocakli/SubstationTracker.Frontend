import { Component, Input } from '@angular/core';

@Component({
	selector: 'shared-empty-template',
	templateUrl: './empty-template.component.html',
	styleUrls: ['./empty-template.component.scss']
})
export class EmptyTemplateComponent {
	@Input() message: string = "Hiç veri bulunamadı.";
}
