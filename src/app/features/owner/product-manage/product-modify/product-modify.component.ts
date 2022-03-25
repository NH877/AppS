import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IProduct, Size } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-product-modify',
	templateUrl: './product-modify.component.html',
	styleUrls: ['./product-modify.component.scss']
})
export class ProductModifyComponent implements OnInit {

	

	public productForm: FormGroup;

	constructor(
		private productService: ProductService,
		private router: Router,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<ProductModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IProduct,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void {
		this.productForm = new FormGroup({
			'name': new FormControl(this.data.name, [Validators.required, Validators.maxLength(25), Validators.minLength(4)]),
			'cost': new FormControl(this.data.cost, [Validators.required]),
			'salePrice': new FormControl(this.data.salePrice),
			'listPrice': new FormControl(this.data.listPrice, [Validators.required]),
			'stockXS': new FormControl(0),
			'stockS': new FormControl(0),
			'stockM': new FormControl(0),
			'stockL': new FormControl(0),
			'stockXL': new FormControl(0),
			'stockXXL': new FormControl(0),

		})
	
		this.data.stockSize.find(x=> x.size == 'XS' ? this.productForm.get('stockXS')?.setValue(x.stock): null);
		this.data.stockSize.find(x=> x.size == 'S' ? this.productForm.get('stockS')?.setValue(x.stock): null);
		this.data.stockSize.find(x=> x.size == 'M' ? this.productForm.get('stockM')?.setValue(x.stock): null);
		this.data.stockSize.find(x=> x.size == 'L' ? this.productForm.get('stockL')?.setValue(x.stock): null);
		this.data.stockSize.find(x=> x.size == 'XL' ? this.productForm.get('stockXL')?.setValue(x.stock): null);
		this.data.stockSize.find(x=> x.size == 'XXL' ? this.productForm.get('stockXXL')?.setValue(x.stock): null);
	}

	
			
	public modifyProduct(): void {
		this.productService.getById(this.data.id).get().subscribe(element => {

			let product: IProduct = {
				id: this.data.id,
				name: this.productForm.get('name')?.value,
				cost: this.productForm.get('cost')?.value,
				salePrice: this.productForm.get('salePrice')?.value,
				listPrice: this.productForm.get('listPrice')?.value,
				stockSize: this.productForm.get('stockSize')?.value,
				img: this.productForm.get('img')?.value,
				firebaseTimestamp: Date.now(),
				firebaseId: element.docs[0].id,
				disabled: false,
			}
			
			this.productService.modify(product)
				.then(() => {
					this.snackBar.open("Producto modificado", "Cerrar", {
						duration: 3000,
						panelClass: ['blue-snackbar']
					});
					
				})
				.catch( error => {
					console.log("line 65 - product-modify", error);
					this.snackBar.open("Error al intentar modificar el producto", "Cerrar", {
						duration: 3000,
						panelClass: ['red-snackbar']
					});
				});

		})
		
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public list(): void {
		
	}

}