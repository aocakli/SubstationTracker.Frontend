import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { FormDataService } from '@helpers/services/form-data.service';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpBaseService {
	private apiUrl: string = environment.apiUrl;
	private formDataService = new FormDataService();

	constructor(private httpClient: HttpClient, private confirmationService: ConfirmationService) { }

	protected getData(action: string) {
		const url: string = this.apiUrl + action;

		return this.httpClient.get<any>(url);
	}

	protected postData(action: string, request: any, isFormData: boolean = false) {
		const url: string = this.apiUrl + action;

		let newRequest = request;

		if (isFormData) newRequest = this.formDataService.buildFormData(request);

		return this.httpClient.post<any>(url, newRequest);
	}

	protected putData(action: string, request: any, isFormData: boolean = false) {
		const url: string = this.apiUrl + action;

		let newRequest = request;

		if (isFormData) newRequest = this.formDataService.buildFormData(request);

		return this.httpClient.put<any>(url, newRequest);
	}

	private deleteConfirmed(action: string, id?: string) {
		const url: string = `${this.apiUrl}${action}${!!id ? `?id=${id}` : ''}`;

		return this.httpClient.delete<any>(url);
	}

	protected deleteData(action: string, data: any = null) {
		return new Promise<boolean>((resolve) => {
			const confirmationOptions: object = {
				header: 'Veriyi sileceksin',
				message: 'Bu veriyi silmek istediğine emin misin?',
				accept: () => {
					this.deleteConfirmed(action, data)
						.pipe(finalize(() => resolve(true)))
						.subscribe();
				},
				reject: () => {
					resolve(false);
				},

			};

			this.confirmationService.confirm(confirmationOptions);
		});
	}
}
