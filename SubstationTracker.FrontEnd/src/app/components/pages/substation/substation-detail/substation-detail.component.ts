import { Component } from '@angular/core';
import { SubstationListDto } from '@contracts/substations/dtos/substations-list.dto';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-substation-detail',
	templateUrl: './substation-detail.component.html',
	styleUrls: ['./substation-detail.component.scss']
})
export class SubstationDetailComponent {
	substation: SubstationListDto;
	constructor(private dynamicDialogConfig: DynamicDialogConfig) { this.substation = this.dynamicDialogConfig.data; }
}
