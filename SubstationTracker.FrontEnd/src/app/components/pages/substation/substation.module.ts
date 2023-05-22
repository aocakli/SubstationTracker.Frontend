import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubstationRoutingModule } from './substation-routing.module';
import { SharedModule } from '@components/_shared/shared.module';

import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { SubstationListComponent } from './substation-list/substation-list.component';
import { SubstationCreateComponent } from './substation-create/substation-create.component';
import { SubstationCreateChoiceComponent } from './substation-create-choice/substation-create-choice.component';
import { SubstationCreateSelectResponsibleComponent } from './substation-create-select-responsible/substation-create-select-responsible.component';
import { SubstationCreateCreateResponsibleComponent } from './substation-create-create-responsible/substation-create-create-responsible.component';
import { SubstationDetailComponent } from './substation-detail/substation-detail.component';
import { SubstationUpdateComponent } from './substation-update/substation-update.component';


@NgModule({
	declarations: [
		SubstationListComponent,
		SubstationCreateComponent,
		SubstationCreateChoiceComponent,
		SubstationCreateSelectResponsibleComponent,
		SubstationCreateCreateResponsibleComponent,
		SubstationDetailComponent,
		SubstationUpdateComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		SubstationRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		PaginatorModule,
		MultiSelectModule,
		InputMaskModule,
		DropdownModule,
		DynamicDialogModule
	],
	providers: [DialogService]
})
export class SubstationModule { }
