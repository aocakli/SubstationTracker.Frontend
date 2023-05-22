import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubstationListComponent } from './substation-list/substation-list.component';
import { SubstationCreateComponent } from './substation-create/substation-create.component';
import { SubstationCreateChoiceComponent } from './substation-create-choice/substation-create-choice.component';
import { SubstationCreateSelectResponsibleComponent } from './substation-create-select-responsible/substation-create-select-responsible.component';
import { SubstationCreateCreateResponsibleComponent } from './substation-create-create-responsible/substation-create-create-responsible.component';
import { SubstationUpdateComponent } from './substation-update/substation-update.component';

const routes: Routes = [
	{ path: '', component: SubstationListComponent },
	{ path: 'create', component: SubstationCreateComponent },
	{ path: 'create/choice/:id', component: SubstationCreateChoiceComponent },
	{ path: 'create/select/:id', component: SubstationCreateSelectResponsibleComponent },
	{ path: 'create/create/:id', component: SubstationCreateCreateResponsibleComponent },
	{ path: 'update/:id', component: SubstationUpdateComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SubstationRoutingModule { }
