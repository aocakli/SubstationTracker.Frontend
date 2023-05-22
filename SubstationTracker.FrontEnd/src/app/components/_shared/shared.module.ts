import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import exportList from '.';
import { GoBackDirective } from '@helpers/directives/go-back.directive';
import { WithApiUrlPipe } from '@helpers/pipes/with-api-url.pipe';
import { EmptyTemplateComponent } from './empty-template/empty-template.component';

@NgModule({
	declarations: [...exportList, GoBackDirective, WithApiUrlPipe],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [...exportList, WithApiUrlPipe]
})
export class SharedModule { }
