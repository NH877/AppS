import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/core/entities';

@Component({
	selector: 'app-product-delete',
	templateUrl: './product-delete.component.html',
	styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProductDeleteComponent>,
    	@Inject(MAT_DIALOG_DATA) public data: IProduct,
	) { }

	ngOnInit(): void {
	}

	public closeDialog($event: any): void {
		this.dialogRef.close();
	}

}
