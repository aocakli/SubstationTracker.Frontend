import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorListComponent } from './sector-list/sector-list.component';
import { SectorCreateComponent } from './sector-create/sector-create.component';
import { SectorUpdateComponent } from './sector-update/sector-update.component';

const routes: Routes = [
	{ path: '', component: SectorListComponent },
	{ path: 'create', component: SectorCreateComponent },
	{ path: 'update/:id', component: SectorUpdateComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SectorRoutingModule { }
