import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IProduct, Size, StockSize } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-product-add',
	templateUrl: './product-add.component.html',
	styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

	public productForm: FormGroup;
	private stockSizeList: StockSize[] = [];

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
			'name': new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]),
			'cost': new FormControl(null, [Validators.required]),
			'salePrice': new FormControl(null, [Validators.required]),
			'listPrice': new FormControl(null, [Validators.required]),
			'stockXS': new FormControl(0),
			'stockS': new FormControl(0),
			'stockM': new FormControl(0),
			'stockL': new FormControl(0),
			'stockXL': new FormControl(0),
			'stockXXL': new FormControl(0),

		})
	}

	public addProduct(): void {

		let newStockSizeXS: StockSize = {
			size: Size.XS,
			stock: this.productForm.get('stockXS')?.value
		}

		this.stockSizeList.push(newStockSizeXS);

		let newStockSizeS: StockSize = {
			size: Size.S,
			stock: this.productForm.get('stockS')?.value
		}

		this.stockSizeList.push(newStockSizeS);

		let newStockSizeM: StockSize = {
			size: Size.M,
			stock: this.productForm.get('stockM')?.value
		}

		this.stockSizeList.push(newStockSizeM);

		let newStockSizeL: StockSize = {
			size: Size.L,
			stock: this.productForm.get('stockL')?.value
		}

		this.stockSizeList.push(newStockSizeL);

		let newStockSizeXL: StockSize = {
			size: Size.XL,
			stock: this.productForm.get('stockXL')?.value
		}

		this.stockSizeList.push(newStockSizeXL);

		let newStockSizeXXL: StockSize = {
			size: Size.XXL,
			stock: this.productForm.get('stockXXL')?.value
		}

		this.stockSizeList.push(newStockSizeXXL);

		let product: IProduct = {
			id: CoreHelper.generateIdDate(),
			name: this.productForm.get('name')?.value,
			cost: this.productForm.get('cost')?.value,
			salePrice: this.productForm.get('salePrice')?.value,
			listPrice: this.productForm.get('listPrice')?.value,
			stockSize: this.stockSizeList,
			img: this.productForm.get('img')?.value,
			firebaseTimestamp: Date.now(),
			disabled: false,
		}

		this.productService.add(product)
			.then(() => {
				this.snackBar.open("Producto agregado", "Cerrar", {
					duration: 3000,
					panelClass: ['green-snackbar']
				});

				this.router.navigate(['/list-product']);
			})

			.catch(error => {
				console.log("line 112 - product-add", error);
				this.snackBar.open("Error al intentar agregar el producto", "Cerrar", {
					duration: 3000,
					panelClass: ['red-snackbar']
				});
			});
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public list(): void {
		this.router.navigate(['/list-product']);
	}

}