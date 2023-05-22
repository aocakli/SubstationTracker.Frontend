import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '@helpers/guards/auth.guard';
import { NoAuthGuard } from '@helpers/guards/no-auth.guard';

const routes: Routes = [
	{
		path: "", component: LayoutComponent, children: [
			{ path: "", loadChildren: () => import("./components/pages/dashboard/dashboard.module").then(module => module.DashboardModule), canActivate: [AuthGuard] },
			{ path: "substations", loadChildren: () => import("./components/pages/substation/substation.module").then(module => module.SubstationModule), canActivate: [AuthGuard] },
			{ path: "sectors", loadChildren: () => import("./components/pages/sector/sector.module").then(module => module.SectorModule), canActivate: [AuthGuard] },
			{ path: "products", loadChildren: () => import("./components/pages/product/product.module").then(module => module.ProductModule), canActivate: [AuthGuard] },
		], canActivate: [AuthGuard]
	},
	{ path: "auth", loadChildren: () => import("./components/auth/auth.module").then(module => module.AuthModule), canActivate: [NoAuthGuard] },
	{ path: "**", redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
