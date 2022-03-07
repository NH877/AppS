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
		this.productForm = new FormGroup({
			'name': new FormControl(this.productForModify.name, [Validators.required, Validators.maxLength(25), Validators.minLength(4)]),
			'cost': new FormControl(this.productForModify.cost, [Validators.required]),
			'salePrice': new FormControl(this.productForModify.salePrice),
			'listPrice': new FormControl(this.productForModify.listPrice, [Validators.required]),
			'stockSize': new FormControl(this.productForModify.stockSize, [Validators.required]),
		})
	}
			
	public modifyProduct(): void {
		this.productService.getById(this.productForModify.id).get().subscribe(element => {

			let product: IProduct = {
				id: this.productForModify.id,
				name: this.productForm.get('name')?.value,
				cost: this.productForm.get('cost')?.value,
				salePrice: this.productForm.get('salePrice')?.value,
				listPrice: this.productForm.get('listPrice')?.value,
				stockSize: this.productForm.get('stockSize')?.value,
				img: this.productForm.get('img')?.value,
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
					console.log("line 63 - product-modify", error);
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
		this.modifiedProduct.emit(this.productForModify);
	}

}