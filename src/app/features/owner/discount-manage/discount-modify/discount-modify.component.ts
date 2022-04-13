import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDiscount } from 'src/app/core/entities';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
    selector: 'app-discount-modify',
    templateUrl: './discount-modify.component.html',
    styleUrls: ['./discount-modify.component.scss']
})
export class DiscountModifyComponent implements OnInit {

    public discountForm: FormGroup;
    public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]);
    public rateControl: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);

    public discount: IDiscount;

    constructor(private dcService: DiscountService,
        private snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<DiscountModifyComponent>) { }

    ngOnInit(): void {
        this.initForm();
    }

    public initForm(): void {
        this.discountForm = new FormGroup({
            'name': this.nameControl,
            'rate': this.rateControl,
        })
        this.discountForm.controls['name'].setValue(this.discount.name);       
        this.discountForm.controls['rate'].setValue(this.discount.rate);
    }

    public modifyDiscount(): void {
        this.discount.name = this.discountForm.controls['name'].value;
        this.discount.rate = this.discountForm.controls['rate'].value;
        this.dcService.getById(this.discount.id).get().subscribe(element => {
            this.discount.firebaseId = element.docs[0].id
            this.dcService.modify(this.discount)
                .then(() => {
                    this.snackBar.open("Descuento modificado con éxito", "Cerrar", {
                        duration: 3000,
                        panelClass: ['green-snackbar']
                    });
                })
                .catch(() => {
                    this.snackBar.open("Error al intentar modificar el descuento", "Cerrar", {
                        duration: 3000,
                        panelClass: ['red-snackbar']
                    });
                })
                .finally(() => {
                    this.dialogRef.close();
                })
        })
    }

    public cancelDiscount(): void {
		this.dialogRef.close();
	}

    public validateModifyButton(): boolean {
		if (this.discountForm.valid) {
			if (this.discountForm.get('name')?.value != this.discount.name)
				return false;

            if (this.discountForm.get('rate')?.value != this.discount.rate)
                return false;
		}
		return true;
	}
}
