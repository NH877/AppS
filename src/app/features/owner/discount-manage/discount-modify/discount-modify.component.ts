import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

    constructor(private dcService: DiscountService, private snackBar: MatSnackBar, private pService: ProductService,@Inject(MAT_DIALOG_DATA) public data: IDiscount ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.discount = this.data;
        this.initForm();
    }

    public initForm(): void {
        this.nameControl.setValue(this.discount.name);
        this.rateControl.setValue(this.discount.rate);
        this.discountForm = new FormGroup({
            'name': this.nameControl,
            'rate': this.rateControl,
        })
        this.getListProduct();
    }

    private getListProduct(): void {
        this.pService.getAll().valueChanges().subscribe(products => {
            products.forEach(pr => {
                let product = pr as IProduct;
                if(product.discount.length){
                    product.discount.forEach(dc => {
                        let discount = dc as IDiscount
                        if (discount.id == this.discount.id)
                            this.selectedProducts.push(product);
                    })
                }
            });
			this.isLoading = false;
		})
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
                    this.addNewDiscountToProducts(this.discount)
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
            console.log(discount)
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
