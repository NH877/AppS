import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDiscount, IProduct } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-discount-add',
	templateUrl: './discount-add.component.html',
	styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit {

	public discountForm: FormGroup;
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]);
	public rateControl: FormControl = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(99)]);
	public selectedProducts: IProduct[];

	constructor(
		private dcService: DiscountService, 
		private snackBar: MatSnackBar, 
		private pService: ProductService, 
		public dialogRef: MatDialogRef<DiscountAddComponent>
		) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void {
		this.discountForm = new FormGroup({
			'name': this.nameControl,
			'rate': this.rateControl,
		})
	}

	public addDiscount(): void {
		let discount: IDiscount = {
			id: CoreHelper.generateIdDate(),
			name: this.discountForm.get('name')?.value,
			rate: this.discountForm.get('rate')?.value,
			firebaseTimestamp: Date.now()
		}

		this.dcService.add(discount)
			.then(() => {
				this.snackBar.open("Descuento agregado", "Cerrar", {
					duration: 3000,
					panelClass: ['green-snackbar']
				});
				this.addNewDiscountToProducts(discount);
			})
			.catch(() => {
				this.snackBar.open("Error al intentar agregar el descuento", "Cerrar", {
					duration: 3000,
					panelClass: ['red-snackbar']
				});
			})
	}
	  
	public cancelDiscount(): void {
		this.dialogRef.close();
	}

	public addNewDiscountToProducts(discount: IDiscount): void {
		let failEdits = 0;
		this.selectedProducts.forEach(product => {
			product.discount.push(discount);
			this.pService.modify(product).catch(error => {
				failEdits++;
			})
				.finally(() => {
					if (failEdits > 0) {
						let message = "Error al intentar asignar el descuento en " + failEdits + " productos"
						this.snackBar.open(message, "Cerrar", {
							duration: 100000,
							panelClass: ['red-snackbar']
						});
					}
				})
		});
	}

	public handleResponce(selectedProducts: IProduct[]) {
		this.selectedProducts = selectedProducts;
	}
}
