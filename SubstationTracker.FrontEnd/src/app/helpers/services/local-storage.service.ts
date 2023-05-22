import { Injectable } from '@angular/core';

enum LocalStorageKey {
	Auth = 'auth',
}

type LSKey = `${LocalStorageKey}`;

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	clear(): void { localStorage.clear(); }

	length(): number { return localStorage.length; }

	get(key: LSKey): string | null { return localStorage.getItem(key); }

	getAndParse(key: LSKey): any | null { return JSON.parse(this.get(key) || 'null'); }

	set(key: LSKey, value: string): void { localStorage.setItem(key, value); }

	setAndDoStringfy(key: LSKey, value: any): void { this.set(key, JSON.stringify(value)); }

	remove(key: LSKey): void { localStorage.removeItem(key); }
}
