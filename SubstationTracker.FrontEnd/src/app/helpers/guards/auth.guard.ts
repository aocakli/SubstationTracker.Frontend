import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastService } from '@services/_common/toast.service';
import { AuthService } from '@services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private toastService: ToastService, private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.isLoggedIn) return true;

		this.router.navigateByUrl('/auth/login');
		this.toastService.notify('Oturumu başlatmak için önce giriş yapın');
		return false;
	}
}
