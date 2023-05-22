import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignResponsiblesRequest } from '@contracts/substations/requests/assign-responsibles.request';
import { CreateUserAndAssignResponsiblesRequest } from '@contracts/substations/requests/create-user-and-assign-responsibles.request';
import { SubstationCreateRequest } from '@contracts/substations/requests/substation-create.request';
import { SubstationGetByIdRequest } from '@contracts/substations/requests/substation-get-by-id.request';
import { SubstationListRequest } from '@contracts/substations/requests/substation-list.request';
import { SubstationUpdateRequest } from '@contracts/substations/requests/substation-update.request';
import { AssignResponsiblesResponse } from '@contracts/substations/responses/assign-responsibles.response';
import { CreateUserAndAssignResponsiblesResponse } from '@contracts/substations/responses/create-user-and-assign-responsibles.response';
import { SubstationCreateResponse } from '@contracts/substations/responses/substation-create.response';
import { SubstationGetByIdResponse } from '@contracts/substations/responses/substation-get-by-id.response';
import { SubstationListResponse } from '@contracts/substations/responses/substation-list.response';
import { SubstationUpdateResponse } from '@contracts/substations/responses/substation-update.response';
import { HttpBaseService } from '@services/_common/http-base.service';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubstationService extends HttpBaseService {
	constructor(httpClient: HttpClient, confirmationService: ConfirmationService) { super(httpClient, confirmationService); }

	create(request: SubstationCreateRequest): Observable<SubstationCreateResponse> {
		return this.postData(request.getConvertedUrl, request, true);
	}

	createUserAndAssignResponsibles(request: CreateUserAndAssignResponsiblesRequest): Observable<CreateUserAndAssignResponsiblesResponse> {
		return this.postData(request.getConvertedUrl, request);
	}

	assignResponsibles(request: AssignResponsiblesRequest): Observable<AssignResponsiblesResponse> {
		return this.postData(request.getConvertedUrl, request);
	}

	update(request: SubstationUpdateRequest): Observable<SubstationUpdateResponse> {
		return this.putData(request.getConvertedUrl, request, true);
	}

	softDelete(id: string): Promise<boolean> {
		return this.deleteData("substations/soft-delete", id);
	}

	getAll(request: SubstationListRequest): Observable<SubstationListResponse> {
		return this.postData(request.getConvertedUrl, request);
	}

	getById(request: SubstationGetByIdRequest): Observable<SubstationGetByIdResponse> {
		return this.getData(request.getConvertedUrl);
	}
}
