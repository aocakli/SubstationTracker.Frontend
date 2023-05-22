import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@components/_shared/shared.module';

import { PaginatorModule } from 'primeng/paginator';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductListBySubstationComponent } from './product-list-by-substation/product-list-by-substation.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
	declarations: [
		ProductListComponent,
		ProductCreateComponent,
		ProductUpdateComponent,
		ProductListBySubstationComponent,
		ProductDetailComponent
	],
	imports: [
		CommonModule,
		ProductRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		PaginatorModule,
		DynamicDialogModule,
		MultiSelectModule,
	],
	providers: [DialogService]
})
export class ProductModule { }
