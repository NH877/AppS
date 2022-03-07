import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-product-modify',
	templateUrl: './product-modify.component.html',
	styleUrls: ['./product-modify.component.scss']
})
export class ProductModifyComponent implements OnInit {

	@Input() productForModify: IProduct;
	@Output() modifiedProduct = new EventEmitter<IProduct>();

	public productForm: FormGroup;

	constructor(
		private productService: ProductService,
		private router: Router,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void {
		/**this.productForm = new FormGroup({
			'name': new FormControl(this.productForModify.name, [Validators.required, Validators.maxLength(25), Validators.minLength(4)]),
			'gender': new FormControl(this.productForModify.gender, [Validators.required]),
			'price': new FormControl(this.productForModify.price, [Validators.required]),
			'priceList': new FormControl(this.productForModify.priceList, [Validators.required]),
			'size': new FormControl(this.productForModify.size, [Validators.required]),
			'category': new FormControl(this.productForModify.category, [Validators.required]),
		})*/
	}

	public modifyProduct(): void {

		/*this.productService.getById(this.productForModify.id).get().subscribe(element => {

			let product: IProduct = {
				id: this.productForModify.id,
				name: this.productForm.get('name')?.value,
				gender: this.productForm.get('gender')?.value,
				price: this.productForm.get('price')?.value,
				priceList: this.productForm.get('priceList')?.value,
				size: this.productForm.get('size')?.value,
				category: this.productForm.get('category')?.value,
				firebaseTimestamp: Date.now(),
				firebaseId: element.docs[0].id,
			}

			this.productService.modify(product)
				.then(() => {
					this.snackBar.open("Producto modificado", "Cerrar", {
						duration: 3000,
						panelClass: ['blue-snackbar']
					});
					this.modifiedProduct.emit(product);
				})
				.catch( error => {
					console.log("line 66 - product-modify", error);
					this.snackBar.open("Error al intentar modificar el producto", "Cerrar", {
						duration: 3000,
						panelClass: ['red-snackbar']
					});
				});

		})
		*/
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public list(): void {
		this.modifiedProduct.emit(this.productForModify);
	}

}
