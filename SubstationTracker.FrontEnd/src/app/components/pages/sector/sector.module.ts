import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@components/_shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';

import { SectorRoutingModule } from './sector-routing.module';
import { SectorListComponent } from './sector-list/sector-list.component';
import { SectorCreateComponent } from './sector-create/sector-create.component';
import { SectorUpdateComponent } from './sector-update/sector-update.component';


@NgModule({
	declarations: [
		SectorListComponent,
  SectorCreateComponent,
  SectorUpdateComponent
	],
	imports: [
		CommonModule,
		SectorRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		PaginatorModule
	]
})
export class SectorModule { }
