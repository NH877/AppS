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
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]);
	public costControl: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);
	public salePriceControl: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);
	public listPriceControl: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);
	public stockXSControl: FormControl = new FormControl(0, [Validators.min(0)]);
	public stockSControl: FormControl = new FormControl(0, [Validators.min(0)]);
	public stockMControl: FormControl = new FormControl(0, [Validators.min(0)]);
	public stockLControl: FormControl = new FormControl(0, [Validators.min(0)]);	
	public stockXLControl: FormControl = new FormControl(0, [Validators.min(0)]);
	public stockXXLControl: FormControl = new FormControl(0, [Validators.min(0)]);
	

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
			'name': this.nameControl,
			'cost': this.costControl,
			'salePrice': this.salePriceControl,
			'listPrice': this.listPriceControl,
			'stockXS': this.stockXSControl,
			'stockS': this.stockSControl,
			'stockM': this.stockMControl,
			'stockL': this.stockLControl,
			'stockXL': this.stockXLControl,
			'stockXXL': this.stockXXLControl,
		})
	}
	
	public addStock(size: string): void {
		
		let stock: number;

		switch(size)
		{
			case 'XS':
				stock = this.productForm.get('stockXS')?.value;
				stock++;
				this.productForm.get('stockXS')?.setValue(stock);
				break;
			case 'S':
				stock = this.productForm.get('stockS')?.value;
				stock++;
				this.productForm.get('stockS')?.setValue(stock);
				break;
			case 'M':
				stock = this.productForm.get('stockM')?.value;
				stock++;
				this.productForm.get('stockM')?.setValue(stock);
				break;
			case 'L':
				stock = this.productForm.get('stockL')?.value;
				stock++;
				this.productForm.get('stockL')?.setValue(stock);
				break;
			case 'XL':
				stock = this.productForm.get('stockXL')?.value;
				stock++;
				this.productForm.get('stockXL')?.setValue(stock);
				break;
			case 'XXL':
				stock = this.productForm.get('stockXXL')?.value;
				stock++;
				this.productForm.get('stockXXL')?.setValue(stock);
				break;
		}
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

	public resetForm(): void{
		this.productForm.reset();
	}
}