import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct, ISale, Store } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-sale-add',
	templateUrl: './sale-add.component.html',
	styleUrls: ['./sale-add.component.scss']
})
export class SaleAddComponent implements OnInit {

	public saleForm :FormGroup;

	constructor(
		private productService: ProductService,
		public dialogRef: MatDialogRef<SaleAddComponent>,
		
		) { }

	ngOnInit(): void {

		this.initForm();

	}

	public initForm(): void{
		this.saleForm = new FormGroup({
			'name': new FormControl(''),
			'cost': new FormControl(''),
			'salePrice': new FormControl(''),
			'listPrice': new FormControl(''),
			'stockSize': new FormControl(''),
			'id': new FormControl(''),
			'local': new FormControl(''),
			'size': new FormControl('')
		})		
	}

	public selectSale(): void{
		this.productService.getById(this.saleForm.get('id')?.value).get().subscribe(element => {
		})
	}

	public getSaleValues(): string[]
	{
		return Object.values(typeof(Store));     
	}
	
}

