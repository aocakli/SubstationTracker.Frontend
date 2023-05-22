import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

@Pipe({ name: 'withApiUrl' })
export class WithApiUrlPipe implements PipeTransform {

	transform(value: string | null): string {
		return `${environment.apiUrl.slice(0, -1)}${value}`;
	}
}
