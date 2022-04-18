import { Component, Inject, Input, OnInit, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDataFee, IDiscount, IProduct, ISale, Payment, Store } from 'src/app/core/entities';
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
	public nameDiscount: FormControl = new FormControl('');
    public rateDiscount: FormControl = new FormControl('');
	public sizeControl: FormControl = new FormControl('');
	public stockControl: FormControl = new FormControl('');
	public discountTotal: FormControl = new FormControl('');
	public chargeCredit: FormControl = new FormControl('');
	public saleForm: FormGroup;	
	public dataFee: IDataFee;
	public isCash: boolean;
	public isCredit: boolean;
	public totalDiscount: any;
	public dateToday =  new Date()
	public loadedDiscountsOfProduct: IDiscount[] = [];

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
		this.loadedDiscountsOfProduct = this.data.discount;
	}

	public initForm(): void {
		this.saleForm = new FormGroup({
			'name': new FormControl(this.data.name),
			'stock': this.stockControl,
			'feeNumber': new FormControl(''),
			'total': new FormControl(''),
			'size': new FormControl(''),
			'feeValue': new FormControl(''),
			'discount': new FormControl(''),
			'discountTotal': this.discountTotal,
			'chargeCredit': this.chargeCredit,
			'priceList': new FormControl(this.data.listPrice),
		})		
	}

	public handleSizeChange(size: string): void {	
		this.stockOfSize(size);
	}

	public changedSelected(): void {
		this.isCash = false;
		this.isCredit = false;
	}

	public creditCard(): void {

		let discount: number = 0;

		for(let ds of this.saleForm.get('discount')?.value)
			discount += +ds.rate;

		let creditData = this.data.listPrice-((this.data.listPrice * discount)/ 100);
		this.saleForm.get('discountTotal')?.setValue(creditData);

		const dialogRef = this.dialog.open(OptionCreditCardComponent, {
			width: '700px',
			data: creditData,
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
				this.saleForm.get('chargeCredit')?.setValue(this.dataFee.charge);
			}
			else
				this.isCredit = false;		
		})
	}

	public cashPayment(): void {
		let discount: number = 0;

		for(let ds of this.saleForm.get('discount')?.value)
			discount += +ds.rate;

		this.saleForm.get('discountTotal')?.setValue(this.data.salePrice-((this.data.salePrice * discount)/ 100));

		this.isCredit = false;
		this.isCash = true;
		this.saleForm.get('total')?.setValue(this.data.salePrice);
	}

	public stockOfSize(size: string): void {	
		this.saleForm.get('size')?.setValue(size);

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
			date: this.dateToday	
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
		return (this.saleForm.get('stock')?.value == 0 || !this.saleForm.get('discount')?.value) ? true : false; 
	}

	public validateSaleButton(): boolean {
		return (this.isCash || this.isCredit) ? false : true;	
	}

	public cancelSaleAdd(): void {
		this.dialogRef.close();
	}

}

