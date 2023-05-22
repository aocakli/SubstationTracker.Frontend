import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseService } from '@services/_common/http-base.service';
import { SectorCreateRequest } from '@contracts/sectors/requests/sector-create.request';
import { SectorGetByIdRequest } from '@contracts/sectors/requests/sector-get-by-id.request';
import { SectorListRequest } from '@contracts/sectors/requests/sector-list.request';
import { SectorUpdateRequest } from '@contracts/sectors/requests/sector-update.request';
import { SectorCreateResponse } from '@contracts/sectors/responses/sector-create.response';
import { SectorGetByIdResponse } from '@contracts/sectors/responses/sector-get-by-id.response';
import { SectorListResponse } from '@contracts/sectors/responses/sector-list.response';
import { SectorUpdateResponse } from '@contracts/sectors/responses/sector-update.request';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SectorService extends HttpBaseService {
	constructor(httpClient: HttpClient, confirmationService: ConfirmationService) { super(httpClient, confirmationService); }

	create(request: SectorCreateRequest): Observable<SectorCreateResponse> {
		return this.postData(request.getConvertedUrl, request);
	}

	update(request: SectorUpdateRequest): Observable<SectorUpdateResponse> {
		return this.putData(request.getConvertedUrl, request);
	}

	softDelete(id: string): Promise<boolean> {
		return this.deleteData("sectors/soft-delete", id);
	}

	getById(request: SectorGetByIdRequest): Observable<SectorGetByIdResponse> {
		return this.getData(request.getConvertedUrl);
	}

	getAll(request: SectorListRequest): Observable<SectorListResponse> {
		return this.postData(request.getConvertedUrl, request);
	}
}
