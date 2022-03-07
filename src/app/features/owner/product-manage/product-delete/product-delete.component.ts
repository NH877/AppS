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
			'cost': new FormControl({value: this.data.cost, disabled: true}),
            'salePrice': new FormControl({value: this.data.salePrice, disabled: true}),
            'listPrice': new FormControl({value: this.data.listPrice, disabled: true}),
            'stockSize': new FormControl({value: this.data.stockSize, disabled: true}),
            
		})
	}

	public delete(): void {
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
