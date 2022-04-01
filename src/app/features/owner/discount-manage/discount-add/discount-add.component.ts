import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDiscount } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
    selector: 'app-discount-add',
    templateUrl: './discount-add.component.html',
    styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit {

    public discountForm: FormGroup;
    public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]);
    public rateControl: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);

    constructor(private dcService: DiscountService,private snackBar: MatSnackBar) { }

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
        let product: IDiscount = {
			id: CoreHelper.generateIdDate(),
            name: this.discountForm.get('name')?.value,
            rate: this.discountForm.get('rate')?.value,
            firebaseTimestamp: Date.now()
        }

		this.dcService.add(product)
		.then(() => {
			this.snackBar.open("Descuento agregado", "Cerrar", {
				duration: 3000,
				panelClass: ['green-snackbar']
			});
		})
		.catch(() => {
			this.snackBar.open("Error al intentar agregar el descuento", "Cerrar", {
				duration: 3000,
				panelClass: ['red-snackbar']
			});
		})
	}
}
