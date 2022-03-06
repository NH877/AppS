import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-product-delete',
	templateUrl: './product-delete.component.html',
	styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

	public productForm: FormGroup;

	constructor(
		private productService: ProductService,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<ProductDeleteComponent>,
    	@Inject(MAT_DIALOG_DATA) public data: IProduct,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void {
		this.productForm = new FormGroup({
			'name': new FormControl({value: this.data.name, disabled: true}),
			'gender': new FormControl({value: this.data.gender, disabled: true}),
            'price': new FormControl({value: this.data.price, disabled: true}),
            'priceList': new FormControl({value: this.data.priceList, disabled: true}),
            'size': new FormControl({value: this.data.size, disabled: true}),
            'category': new FormControl({value: this.data.category, disabled: true}),
		})
	}

	public delete(): void {
		this.productService.getById(this.data.id).get().subscribe(element => {

			let product: IProduct = {
				id: this.data.id,
				name: this.productForm.get('name')?.value,
				gender: this.productForm.get('gender')?.value,
				price: this.productForm.get('price')?.value,
				priceList: this.productForm.get('priceList')?.value,
				size: this.productForm.get('size')?.value,
				category: this.productForm.get('category')?.value,
				firebaseTimestamp: Date.now(),
				firebaseId: element.docs[0].id,
			}

			this.productService.delete(product)
				.then(() => {
					this.snackBar.open("Producto Eliminado", "Cerrar", {
						duration: 3000,
						panelClass: ['orange-snackbar']
					});
				})
				.catch( error => {
					console.log("line 62 - product-add", error);
					this.snackBar.open("Error al intentar eliminar el producto", "Cerrar", {
						duration: 3000,
						panelClass: ['red-snackbar']
					});
				})
				.finally(() => {
					this.dialogRef.close();
				})

		})

	}

}
