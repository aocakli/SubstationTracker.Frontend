import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListBySubstationComponent } from './product-list-by-substation/product-list-by-substation.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
	{ path: '', component: ProductListComponent },
	{ path: 'create', component: ProductCreateComponent },
	{ path: 'update/:id', component: ProductUpdateComponent },
	{ path: ':substationId', component: ProductListBySubstationComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule { }
