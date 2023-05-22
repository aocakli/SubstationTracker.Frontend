import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequest } from '@contracts/auth/user/requests/user-login.request';
import { LocalStorageService } from '@helpers/services/local-storage.service';
import { ToastService } from '@services/_common/toast.service';
import { UserService } from '@services/auth/user/user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup | undefined = undefined;

	private subscribers: Subscription[] = [];
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private toastService: ToastService,
		private localStorageService: LocalStorageService
	) { }

	initForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	submitForm() {
		if (!this.loginForm) return;

		if (this.loginForm.invalid) {
			this.toastService.warning('Invalid form data');
			return;
		}

		const request: UserLoginRequest = new UserLoginRequest(this.loginForm.value.email, this.loginForm.value.password);

		const subscriber = this.userService.login(request).subscribe(response => {
			if (!response || !response.isSuccess || !response.data) {
				this.localStorageService.clear();
				return;
			}

			this.localStorageService.setAndDoStringfy('auth', response.data);
			this.router.navigateByUrl('/');
		});

		this.subscribers.push(subscriber);
	}

	ngOnInit(): void { this.initForm(); }

	ngOnDestroy(): void { this.subscribers.forEach(subscriber => subscriber.unsubscribe()); }
}
