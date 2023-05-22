import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { BaseResponse } from '@contracts/_common/responses/base.response';
import { ToastService } from '@services/_common/toast.service';
import { environment } from '@environments/environment';

@Injectable()
export class HandleMessagesInterceptor implements HttpInterceptor {
	constructor(private toastService: ToastService) { }

	private showSuccessMessage(httpResponse: HttpResponse<BaseResponse | any>) {
		const baseResponse = httpResponse.body as BaseResponse;

		if (!baseResponse) return;
		if (!baseResponse.isSuccess) return;
		if (!baseResponse.message || baseResponse.message.length < 1) return;

		this.toastService.success(baseResponse.message);
	}

	private handleValidateErrorMessages(errors: { key: string, value: string }[]) {
		let messsages: string = "";

		errors.forEach(error => messsages += `${error.key}: ${error.value}<br />`);

		this.toastService.warning(messsages);
	}

	private showErrorMessage(httpErrorResponse: HttpErrorResponse) {
		if (!environment.production) console.error('ERROR', httpErrorResponse);

		const baseResponse = httpErrorResponse.error as BaseResponse;

		if ('validationErrors' in baseResponse) {
			this.handleValidateErrorMessages(baseResponse.validationErrors as []);
			return of();
		}

		this.toastService.error(baseResponse.message || httpErrorResponse.message);

		return of();
	}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError(response => this.showErrorMessage(response)),
			tap(response => response instanceof HttpResponse && this.showSuccessMessage(response)),
		);
	}
}
