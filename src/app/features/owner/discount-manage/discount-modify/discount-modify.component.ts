import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDiscount, IProduct } from 'src/app/core/entities';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
    selector: 'app-discount-modify',
    templateUrl: './discount-modify.component.html',
    styleUrls: ['./discount-modify.component.scss']
})
export class DiscountModifyComponent implements OnInit {

    public discountForm: FormGroup;
    public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]);
    public rateControl: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);

    public selectedProducts: IProduct[] = [];
    public discount: IDiscount;
    public isLoading: boolean;

    constructor(private dcService: DiscountService, private snackBar: MatSnackBar, private pService: ProductService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.initForm();
    }

    public initForm(): void {
        this.discountForm = new FormGroup({
            'name': this.nameControl,
            'rate': this.rateControl,
        })
        this.discountForm.controls['name'].setValue(this.discount.name);
        this.discountForm.controls['rate'].setValue(this.discount.rate);
        this.getListProduct();
    }

    private async getListProduct(): Promise<void> {
        /*
        await this.pService.getAll_sync().then(responce => {
            responce.forEach(pr => {
                pr.discount.forEach(disc => {
                    if (disc.id == this.discount.id)
                        this.selectedProducts.push(pr);
                })
            });
        })
            .finally(() => {
                this.isLoading = false;
            })
            */
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
        })
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
