import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseService } from '@services/_common/http-base.service';
import { AuthDto } from '@contracts/auth/_common/dtos/auth.dto';
import { DataResponse } from '@contracts/_common/responses/data.response';
import { UserLoginRequest } from '@contracts/auth/user/requests/user-login.request';
import { GetUserListRequest } from '@contracts/auth/user/requests/get-user-list.request';
import { GetUserListResponse } from '@contracts/auth/user/responses/get-user-list.response';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends HttpBaseService {
	constructor(httpClient: HttpClient, confirmationService: ConfirmationService) { super(httpClient, confirmationService); }

	login(request: UserLoginRequest): Observable<DataResponse<AuthDto>> {
		return this.postData(request.getConvertedUrl, request);
	}

	getUserList(request: GetUserListRequest): Observable<GetUserListResponse> {
		return this.postData(request.getConvertedUrl, request);
	}
}
