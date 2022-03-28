import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct, ISale, StockSize, Store } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SaleService } from 'src/app/shared/services/sale/sale.service';

@Component({
	selector: 'app-sale-add',
	templateUrl: './sale-add.component.html',
	styleUrls: ['./sale-add.component.scss']
})
export class SaleAddComponent implements OnInit {

	public saleForm: FormGroup;
	public productSelected: IProduct;
	public stockSize: StockSize;	

	constructor(
		private productService: ProductService,
		public dialogRef: MatDialogRef<SaleAddComponent>,
		public saleService: SaleService,
		private snackBar: MatSnackBar,
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
			'stock': new FormControl(''),
			'id': new FormControl(''),
			'size': new FormControl('')
		})		
	}

	public selectProduct(id: string): void { 

		this.productService.getById(id).get().subscribe(element => {
			
			this.productSelected = element.docs[0].data() as IProduct ;
			this.productSelected.firebaseId = element.docs[0].id
			this.saleForm.get('id')?.setValue(this.productSelected.id);
			this.saleForm.get('name')?.setValue(this.productSelected.name);
			this.saleForm.get('salePrice')?.setValue(this.productSelected.salePrice);
			this.saleForm.get('listPrice')?.setValue(this.productSelected.listPrice);
			this.saleForm.get('cost')?.setValue(this.productSelected.cost);

			this.stockOfSize(this.saleForm.get('size')?.value);
		});

	}

	public stockOfSize(size: string): void {

		this.saleForm.get('size')?.setValue(size);

		let productFound = this.productSelected.stockSize.find(x => x.size == size);

		if(productFound) 
			this.saleForm.get('stock')?.setValue(productFound.stock);
		else	
			this.saleForm.get('stock')?.setValue('0');

	}

	public sale(): void {

		this.productSelected.stockSize.find(x => x.size == this.saleForm.get('size')?.value ? x.stock-- : null);

		let sale: ISale = {
			id: CoreHelper.generateIdDate(),
			product: this.productSelected,
			local: Store.STORE_A,
			firebaseTimestamp: Date.now(),
		}

		this.productService.modify(this.productSelected)
			.then(() => {

				this.saleService.add(sale)
				.then(() => {
	
					this.snackBar.open("Se realizo la venta con con exito", "Cerrar", {
						duration: 2000,
						panelClass: ['green-snackbar']
					});
	
				})
			})
			.catch(error => {
				console.log("line 99 - sale-add", error);

				this.snackBar.open("Error al intentar vender el producto", "Cerrar", {
					duration: 3000,
					panelClass: ['red-snackbar']
				});
			})
			.finally(() => {
				this.dialogRef.close();
			});
	}
	
	public saleProductValid(): boolean {
		return this.saleForm.get('stock')?.value == 0 ? true : false; 
	}
}

