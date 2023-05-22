import { Component } from '@angular/core';
import { ProductSingleDto } from '@contracts/products/dtos/product-single.dto';
import { DateFormatEnum } from '@helpers/enums/date-format.enum';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
	product: ProductSingleDto;
	dateFormatEnum = DateFormatEnum;

	constructor(private dynamicDialogConfig: DynamicDialogConfig) { this.product = this.dynamicDialogConfig.data; }

	getIndexForRead(index: number) {
		const newIndex = ++index;
		return newIndex
	}
}
