import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleConfig } from '@components/_shared/page-title/page-title.component';
import { UserRoleEnum } from '@contracts/_common/enums/user-role.enum';
import { PaginationRequest } from '@contracts/_common/requests/pagination.request';
import { UserForListDto } from '@contracts/auth/user/dtos/user-for-list.dto';
import { GetUserListRequest } from '@contracts/auth/user/requests/get-user-list.request';
import { AssignResponsiblesRequest } from '@contracts/substations/requests/assign-responsibles.request';
import { ToastService } from '@services/_common/toast.service';
import { UserService } from '@services/auth/user/user.service';
import { SubstationService } from '@services/substations/substation.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-substation-create-select-responsible',
	templateUrl: './substation-create-select-responsible.component.html',
	styleUrls: ['./substation-create-select-responsible.component.scss']
})
export class SubstationCreateSelectResponsibleComponent implements OnInit, OnDestroy {
	pageTitleConfig: PageTitleConfig = { titile: 'Sorumlu Seç', type: 'go-back' };
	users: UserForListDto[] = [];
	selectedUserId: string = "";
	substationId: string = "";
	canTransferTheResponsibleUser: boolean = false;

	private subscribers: Subscription[] = [];

	constructor(
		private router: Router,
		private userService: UserService,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private substationService: SubstationService
	) { }

	getUsers() {
		const request = new GetUserListRequest(undefined, UserRoleEnum.SubstationResponsible, new PaginationRequest(1, null));

		const subscriber = this.userService.getUserList(request).subscribe(response => {
			if (!response.isSuccess) {
				this.users = [];
				return;
			}

			this.users = response.data;
		});

		this.subscribers.push(subscriber);
	}

	getSubstationIdFromRoute() {
		const subscriber = this.activatedRoute.params.subscribe(param => {
			const substationId: string = param["id"];
			if (!substationId) {
				this.toastService.error("Şube bilgisi bulunamadı");
				return;
			}

			this.substationId = substationId;
		});

		this.subscribers.push(subscriber);
	}

	submitAssignResponsibles() {
		if (!this.selectedUserId) {
			this.toastService.warning("Şubeye atanacak kullanıcıyı seçmelisin.");
			return;
		}

		const request = new AssignResponsiblesRequest(this.substationId, this.selectedUserId, this.canTransferTheResponsibleUser);
		const subscriber = this.substationService.assignResponsibles(request).subscribe(response => response.isSuccess && this.router.navigateByUrl("/substations"));
		this.subscribers.push(subscriber);
	}

	loadOnInit() {
		this.getUsers();
		this.getSubstationIdFromRoute();
	}

	ngOnInit(): void { this.loadOnInit(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
