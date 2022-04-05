import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDataFee, IProduct, ISale, Payment, Store } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import { OptionCreditCardComponent } from '../option-credit-card/option-credit-card.component';

@Component({
	selector: 'app-sale-add',
	templateUrl: './sale-add.component.html',
	styleUrls: ['./sale-add.component.scss']
})
export class SaleAddComponent implements OnInit {
	public sizeControl: FormControl = new FormControl('');
	public stockControl: FormControl = new FormControl('');
	public saleForm: FormGroup;	
	public dataFee: IDataFee;
	public isCash: boolean;
	public isCredit: boolean;

	constructor(
		private productService: ProductService,
		public dialogRef: MatDialogRef<SaleAddComponent>,
		public saleService: SaleService,
		private snackBar: MatSnackBar,
		public dialog: MatDialog,
    	@Inject(MAT_DIALOG_DATA) public data: IProduct,
		) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void {
		this.saleForm = new FormGroup({
			'name': new FormControl(this.data.name),
			'cost': new FormControl(this.data.cost),
			'salePrice': new FormControl(this.data.salePrice),
			'listPrice': new FormControl(this.data.listPrice),
			'stock': this.stockControl,
			'id': new FormControl(this.data.id),
			'size': this.sizeControl,
			'feeNumber': new FormControl(''),
			'total': new FormControl(''),
			'feeValue': new FormControl(''),
		})		
	}

	public stockOfSize(size: string): void {	

		let productFound = this.data.stockSize.find(x => x.size == size);
		
		if(productFound) 
			this.saleForm.get('stock')?.setValue(productFound.stock);
		else	
			this.saleForm.get('stock')?.setValue('0');		
	}

	public sale(): void {

		this.data.stockSize.find(x => x.size == this.saleForm.get('size')?.value ? x.stock-- : null);
		
		let sale: ISale = {
			id: CoreHelper.generateIdDate(),
			product: this.data,
			local: Store.STORE_A,
			firebaseTimestamp: Date.now(),
			discount: 0,
			rate: this.isCredit ? this.dataFee.rate : 0,
			totalPriceSale: this.isCredit ? this.dataFee.total : this.data.salePrice,
			payment: this.isCash ? Payment.Cash : Payment.Credit_Card,
		}

		this.productService.modify(this.data)
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

	public creditCard(): void {
		const dialogRef = this.dialog.open(OptionCreditCardComponent, {
			width: '700px',
			data: this.data.listPrice,
			autoFocus: false,
		});
		dialogRef.afterClosed().subscribe(result =>{
			if (result) {
				this.isCredit = true;
				this.isCash = false;
				this.dataFee = result.data;
				this.saleForm.get('feeNumber')?.setValue(this.dataFee.feeNumber);
				this.saleForm.get('total')?.setValue(this.dataFee.total);
				this.saleForm.get('feeValue')?.setValue(this.dataFee.feeValue);
			}
			else
				this.isCredit = false;		
		})
	}

	public cashPayment(): void {
		this.isCredit = false;
		this.isCash = true;	
	}

	public validateSaleButton(): boolean{
		return (this.isCash || this.isCredit) ? false : true;	
	}
}

