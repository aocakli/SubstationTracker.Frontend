import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { AuthDto } from '@contracts/auth/_common/dtos/auth.dto';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!this.authService.isLoggedIn) return next.handle(request);

		const token = (this.authService.authData as AuthDto).accessToken.token;

		return next.handle(request.clone({ headers: request.headers.append("Authorization", `Bearer ${token}`) }));
	}
}
