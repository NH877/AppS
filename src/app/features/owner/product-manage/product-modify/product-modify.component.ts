import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct, } from 'src/app/core/entities';

@Component({
	selector: 'app-product-modify',
	templateUrl: './product-modify.component.html',
	styleUrls: ['./product-modify.component.scss']
})
export class ProductModifyComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProductModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IProduct,
	) { }

	ngOnInit(): void {
	}

	public closeDialog($event: any): void {
		this.dialogRef.close();
	}
}