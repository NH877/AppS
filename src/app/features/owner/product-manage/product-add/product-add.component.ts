import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IDiscount, IProduct, Size, StockSize } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { DiscountSelectorComponent } from '../../discount-manage/discount-selector/discount-selector.component';

@Component({
	selector: 'app-product-data',
	templateUrl: './product-add.component.html',
	styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
	@ViewChild('child') discountChild: DiscountSelectorComponent;
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
	private file: File;
	public imageURL: string;
	public loading: boolean = false;
	public loadedDiscountsOfProduct: IDiscount[] = [];
	public discountSelected: IDiscount[] = [];

	public originalProduct: IProduct;
	@Input() productDataForModify: IProduct;
	@Input() productDataForDelete: IProduct;
	@Output() closeDialogEvent = new EventEmitter<boolean>();

	constructor(
		private productService: ProductService,
		private router: Router,
		private snackBar: MatSnackBar,
		private discountService: DiscountService,
	) { }

	ngOnInit(): void {

		this.initForm();

		if (this.productDataForModify != undefined)
			this.initFormForModify();
		else if (this.productDataForDelete != this.productDataForModify)
			this.initFormForDelete();

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

	public initFormForModify(): void {

		this.originalProduct = this.productDataForModify;
		this.imageURL = this.originalProduct.img;
		this.loadedDiscountsOfProduct = this.productDataForModify.discount;

		if (this.productDataForModify.name)
			this.productForm.get('name')?.setValue(this.productDataForModify.name);
		if (this.productDataForModify.cost)
			this.productForm.get('cost')?.setValue(this.productDataForModify.cost);
		if (this.productDataForModify.salePrice)
			this.productForm.get('salePrice')?.setValue(this.productDataForModify.salePrice);
		if (this.productDataForModify.listPrice)
			this.productForm.get('listPrice')?.setValue(this.productDataForModify.listPrice);

		this.productDataForModify.stockSize.find(x => x.size == 'XS' ? this.productForm.get('stockXS')?.setValue(x.stock) : null);
		this.productDataForModify.stockSize.find(x => x.size == 'S' ? this.productForm.get('stockS')?.setValue(x.stock) : null);
		this.productDataForModify.stockSize.find(x => x.size == 'M' ? this.productForm.get('stockM')?.setValue(x.stock) : null);
		this.productDataForModify.stockSize.find(x => x.size == 'L' ? this.productForm.get('stockL')?.setValue(x.stock) : null);
		this.productDataForModify.stockSize.find(x => x.size == 'XL' ? this.productForm.get('stockXL')?.setValue(x.stock) : null);
		this.productDataForModify.stockSize.find(x => x.size == 'XXL' ? this.productForm.get('stockXXL')?.setValue(x.stock) : null);
	}

	public initFormForDelete(): void {

		this.originalProduct = this.productDataForDelete;
		this.imageURL = this.originalProduct.img;

		if (this.productDataForDelete.name)
			this.productForm.get('name')?.setValue(this.productDataForDelete.name);
		if (this.productDataForDelete.cost)
			this.productForm.get('cost')?.setValue(this.productDataForDelete.cost);
		if (this.productDataForDelete.salePrice)
			this.productForm.get('salePrice')?.setValue(this.productDataForDelete.salePrice);
		if (this.productDataForDelete.listPrice)
			this.productForm.get('listPrice')?.setValue(this.productDataForDelete.listPrice);

		this.productDataForDelete.stockSize.find(x => x.size == 'XS' ? this.productForm.get('stockXS')?.setValue(x.stock) : null);
		this.productDataForDelete.stockSize.find(x => x.size == 'S' ? this.productForm.get('stockS')?.setValue(x.stock) : null);
		this.productDataForDelete.stockSize.find(x => x.size == 'M' ? this.productForm.get('stockM')?.setValue(x.stock) : null);
		this.productDataForDelete.stockSize.find(x => x.size == 'L' ? this.productForm.get('stockL')?.setValue(x.stock) : null);
		this.productDataForDelete.stockSize.find(x => x.size == 'XL' ? this.productForm.get('stockXL')?.setValue(x.stock) : null);
		this.productDataForDelete.stockSize.find(x => x.size == 'XXL' ? this.productForm.get('stockXXL')?.setValue(x.stock) : null);

		this.productForm.get('name')?.disable();
		this.productForm.get('cost')?.disable();
		this.productForm.get('salePrice')?.disable();
		this.productForm.get('listPrice')?.disable();
		this.productForm.get('stockXS')?.disable();
		this.productForm.get('stockS')?.disable();
		this.productForm.get('stockM')?.disable();
		this.productForm.get('stockL')?.disable();
		this.productForm.get('stockXL')?.disable();
		this.productForm.get('stockXXL')?.disable();
	}

	public isAddProduct(): boolean {
		if (this.productDataForModify || this.productDataForDelete) {
			return false;
		}
		return true;
	}

	public onFileSelected(event: any): void {
		this.file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = () =>
			this.imageURL = reader.result as string;

		reader.readAsDataURL(this.file)
	}

	public addStock(size: string): void {

		if (!this.productDataForDelete) {
			let stock: number;

			switch (size) {
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
	}

	public pushStockSizeList(): void {

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
	}

	public async addProduct(): Promise<void> {
		this.loading = true;
		this.pushStockSizeList();

		let idProduct = CoreHelper.generateIdDate();

		let name: string = "img-" + idProduct;
		this.productForm.get('img')?.setValue(name);
		
		if(this.discountSelected.find(discount => discount.rate == 0) == undefined)
		{
			let discount = await this.discountService.getByRate('0');
			this.discountSelected.push(discount);
		}

		if (this.file) {
			this.productService.addFileStorage(this.file, name)
				.then(() => {
					this.productService.getFileStorage(name).then(element => {

						let product: IProduct = {
							id: idProduct,
							name: this.productForm.get('name')?.value,
							cost: this.productForm.get('cost')?.value,
							salePrice: this.productForm.get('salePrice')?.value,
							listPrice: this.productForm.get('listPrice')?.value,
							stockSize: this.stockSizeList,
							img: element,
							firebaseTimestamp: Date.now(),
							disabled: false,
							discount: this.discountSelected,
						}
						this.addProductToFirebase(product);
					})
				})
				.catch(error => {
					this.snackBar.open("Error al intentar cargar la imagen del producto", "Cerrar", {
						duration: 3000,
						panelClass: ['red-snackbar']
					});
				});
		}
		else {
			let product: IProduct = {
				id: idProduct,
				name: this.productForm.get('name')?.value,
				cost: this.productForm.get('cost')?.value,
				salePrice: this.productForm.get('salePrice')?.value,
				listPrice: this.productForm.get('listPrice')?.value,
				stockSize: this.stockSizeList,
				img: "assets/img-test.jpg",
				firebaseTimestamp: Date.now(),
				disabled: false,
				discount: this.discountSelected,
			}
			this.addProductToFirebase(product);
		}

	}

	private addProductToFirebase(product: IProduct): void {
		this.productService.add(product)
			.then(() => {
				this.loading = false;
				this.snackBar.open("Producto agregado", "Cerrar", {
					duration: 3000,
					panelClass: ['green-snackbar']
				});
				this.productService.getById(product.id).get().subscribe(element => {
					product.firebaseId = element.docs[0].id;
					this.productService.modify(product)
						.then()
						.catch(error => {
							this.snackBar.open("Contactar con soporte", "Cerrar", {
								duration: 3000,
								panelClass: ['blue-snackbar']
							})
						});
				})
			})
			.catch(error => {
				this.snackBar.open("Error al intentar agregar el producto", "Cerrar", {
					duration: 3000,
					panelClass: ['red-snackbar']
				});
			})
			.finally(() => {
				this.router.navigate(['/list-product']);
			})
	}

	public validateModifyButton(): boolean {

		if (this.productForm.valid) {
			if (this.productForm.get('name')?.value != this.originalProduct.name)
				return false;

			if (this.productForm.get('cost')?.value != this.originalProduct.cost)
				return false;

			if (this.productForm.get('salePrice')?.value != this.originalProduct.salePrice)
				return false;

			if (this.productForm.get('listPrice')?.value != this.originalProduct.listPrice)
				return false;

			if (this.imageURL != this.originalProduct.img)
				return false;
		
			if (this.discountSelected)
			{
				if(this.discountSelected != this.originalProduct.discount)
					return false;
			}
				
			for (let i = 0; i < this.originalProduct.stockSize.length; i++) {
				switch (this.originalProduct.stockSize[i].size) {
					case 'XS':
						if (this.productForm.get('stockXS')?.value != this.originalProduct.stockSize[i].stock)
							return false;
						break;
					case 'S':
						if (this.productForm.get('stockS')?.value != this.originalProduct.stockSize[i].stock)
							return false;
						break;
					case 'M':
						if (this.productForm.get('stockM')?.value != this.originalProduct.stockSize[i].stock)
							return false;
						break;
					case 'L':
						if (this.productForm.get('stockL')?.value != this.originalProduct.stockSize[i].stock)
							return false;
						break;
					case 'XL':
						if (this.productForm.get('stockXL')?.value != this.originalProduct.stockSize[i].stock)
							return false;
						break;
					case 'XXL':
						if (this.productForm.get('stockXXL')?.value != this.originalProduct.stockSize[i].stock)
							return false;
						break;
				}
			}
		}

		return true;
	}

	public modifyProduct(): void {
		this.loading = true;
		this.productService.getById(this.productDataForModify.id).get().subscribe(element => {
			this.pushStockSizeList();
			if (this.imageURL != this.productDataForModify.img) {
				let name = "img-" + this.productDataForModify.id;
				this.deleteFile(name);
				this.productService.addFileStorage(this.file, name)
					.then(() => {
						this.productService.getFileStorage(name).then(file => {

							let product: IProduct = {
								id: this.productDataForModify.id,
								name: this.productForm.get('name')?.value,
								cost: this.productForm.get('cost')?.value,
								salePrice: this.productForm.get('salePrice')?.value,
								listPrice: this.productForm.get('listPrice')?.value,
								stockSize: this.stockSizeList,
								discount: this.discountSelected,
								img: file,
								firebaseTimestamp: Date.now(),
								firebaseId: element.docs[0].id,
								disabled: false,
							}
							this.modifyProductToFirebase(product);
						})
					})
					.catch(error => {
						this.snackBar.open("Error al intentar cargar la imagen del producto", "Cerrar", {
							duration: 3000,
							panelClass: ['red-snackbar']
						});
					});
			}
			else {

				let product: IProduct = {
					id: this.productDataForModify.id,
					name: this.productForm.get('name')?.value,
					cost: this.productForm.get('cost')?.value,
					salePrice: this.productForm.get('salePrice')?.value,
					listPrice: this.productForm.get('listPrice')?.value,
					stockSize: this.stockSizeList,
					discount: this.discountSelected,
					img: this.imageURL,
					firebaseTimestamp: Date.now(),
					firebaseId: element.docs[0].id,
					disabled: false,
				}
				this.modifyProductToFirebase(product);
			}
		})
	}

	private modifyProductToFirebase(product: IProduct): void {
		this.productService.modify(product)
			.then(() => {
				this.snackBar.open("Producto modificado", "Cerrar", {
					duration: 3000,
					panelClass: ['blue-snackbar']
				});
			})
			.catch(error => {
				this.snackBar.open("Error al intentar modificar el producto", "Cerrar", {
					duration: 3000,
					panelClass: ['red-snackbar']
				});
			})
			.finally(() => {
				this.closeDialogEvent.emit(true);
			});
	}

	public delete(): void {
		this.loading = true;
		this.productService.getById(this.productDataForDelete.id).get().subscribe(element => {

			let product: IProduct = {
				id: this.productDataForDelete.id,
				name: this.productForm.get('name')?.value,
				cost: this.productForm.get('cost')?.value,
				salePrice: this.productForm.get('salePrice')?.value,
				listPrice: this.productForm.get('listPrice')?.value,
				stockSize: this.productForm.get('stockSize')?.value,
				img: this.productForm.get('img')?.value,
				firebaseTimestamp: Date.now(),
				firebaseId: element.docs[0].id,
				disabled: false,
				discount: []
			}

			this.productService.delete(product)
				.then(() => {
					if(product.img)
						this.deleteFile("img-" + this.productDataForDelete.id);
					this.loading = false;
					this.snackBar.open("Producto Eliminado", "Cerrar", {
						duration: 3000,
						panelClass: ['orange-snackbar']
					});
				})
				.catch(error => {
					this.snackBar.open("Error al intentar eliminar el producto", "Cerrar", {
						duration: 3000,
						panelClass: ['red-snackbar']
					});
				})
				.finally(() => {
					this.closeDialogEvent.emit(true);
				})
		})
	}

	public deleteFile(path: string): void {
		console.log('Yama mas kpito')
		this.productService.deleteFileStorage(path);
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public cancelModify(): void {
		this.closeDialogEvent.emit(false);
	}

	public list(): void {
		this.router.navigate(['/list-product']);
	}

	public resetForm(): void {
		this.productForm.reset();
		this.discountChild.reset();
	}

	public handleDiscountReceived(discount: IDiscount[]): void {
		this.discountSelected = discount;
	}
}