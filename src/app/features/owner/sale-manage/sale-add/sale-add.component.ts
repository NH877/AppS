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

	public saleForm: FormGroup;
	public productSelected: boolean= false;
	public barCode: any;
	data: any;

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

	/*public selectSale(): void{ 
		this.saleForm.get('id')?.value
		this.productService.getById(this.saleForm.get('id')?.value).valueChanges().subscribe(element => {
			let product = element as IProduct;
			this.saleForm.get('name')?.setValue(product.name);
			this.saleForm.get('salePrice')?.setValue(product.salePrice);
			this.saleForm.get('listPrice')?.setValue(product.listPrice);
			this.saleForm.get('cost')?.setValue(product.cost);

			let producData: any= {
				id: this.data.id,
				name: this.saleForm.get('name').setValue(element.name),
				cost: this.saleForm.get('cost')?.value,
				salePrice: this.saleForm.get('salePrice')?.value,
				listPrice: this.saleForm.get('listPrice')?.value,
				stockSize: this.saleForm.get('stockSize')?.value,
				img: this.saleForm.get('img')?.value,
				firebaseTimestamp: Date.now(),
				firebaseId: element.docs[0].id,
				disabled: false,*/
			
			/*this.form.get('nombre').setValue(element.name);
		})
	}
	*/
	
}

