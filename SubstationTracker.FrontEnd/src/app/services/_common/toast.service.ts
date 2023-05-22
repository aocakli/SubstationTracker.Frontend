import { Injectable } from '@angular/core';

declare const alertify: any;

@Injectable({ providedIn: 'root' })
export class ToastService {
	private initMessage(type: string, detail: string) {
		alertify.set('notifier', 'delay', 3);
		alertify.set('notifier', 'position', "bottom-right");
		const alertMessage = alertify[type](detail);
		alertMessage.dismissOthers();
	}

	success(message: string) {
		return this.initMessage('success', message);
	}

	error(message: string) {
		return this.initMessage('error', message);
	}

	warning(message: string) {
		return this.initMessage('warning', message);
	}

	notify(message: string) {
		return this.initMessage('notify', message);
	}

	message(message: string) {
		return this.initMessage('message', message);
	}
}
