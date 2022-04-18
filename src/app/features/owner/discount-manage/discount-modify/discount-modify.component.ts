import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
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
    public selectedProductsOriginals: IProduct[] = [];
    public oldProducts: any = null;
    public discount: IDiscount;
    public isLoading: boolean;

    constructor(
        private dcService: DiscountService, 
        private snackBar: MatSnackBar, 
        private pService: ProductService, 
        @Inject(MAT_DIALOG_DATA) public data: IDiscount, 
        public dialogRef: MatDialogRef<DiscountModifyComponent>
        ) { }


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
                if (product.discount.length) {
                    product.discount.forEach(dc => {
                        let discount = dc as IDiscount
                        if (discount.id == this.discount.id)
                        {
                            this.selectedProducts.push(product);
                            this.selectedProductsOriginals.push(product);
                        }
                    })
                }
            });
            if (this.oldProducts == null) {
                this.saveOldProducts();
            }
            this.isLoading = false;
        })
    }

    public saveOldProducts() {
        this.oldProducts = [] as IProduct[]
        this.selectedProducts.forEach(element => {
            if (!this.oldProducts.includes(element)) {
                this.oldProducts.push(element)
            }
        });
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
                    this.manageDiscountsInProducts(this.discount)
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
  
    public manageDiscountsInProducts(discount: IDiscount): void {
        
        for(let product of this.selectedProducts)
        {
            if(!this.selectedProductsOriginals.find(productOriginal => productOriginal.id == product.id))
            {
                this.addDiscountToProduct(product, discount);
            }
        }

        for(let productOriginal of this.selectedProductsOriginals)
        {
            if(!this.selectedProducts.find(product => product.id == productOriginal.id))
            {
                this.removeDiscountToProduct(productOriginal, discount);
            }
        }
    }

    public addDiscountToProduct(product: IProduct, discount: IDiscount): void{

        product.discount.push(discount);

        this.pService.modify(product)
            .then()
            .catch(error => {
                this.snackBar.open("Error al intentar agregar el descuento al producto", "Cerrar", {
                    duration: 3000,
                    panelClass: ['red-snackbar']
                });
            });
        

    }

    public removeDiscountToProduct(product: IProduct, discount: IDiscount) {
        var i = product.discount.indexOf(discount);
        product.discount.splice( i, 1 );

        this.pService.modify(product)
            .then()
            .catch(error => {
                this.snackBar.open("Error al intentar sacar el descuento del producto", "Cerrar", {
                    duration: 3000,
                    panelClass: ['red-snackbar']
                });
            });
    }

    public handleResponce(selectedProducts: IProduct[]) {
        this.selectedProducts = selectedProducts;
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

            if(this.selectedProductsOriginals.length != this.selectedProducts.length)
                return false;
            else 
            {
                this.selectedProductsOriginals.sort();
                this.selectedProducts.sort();
                for(let i=0; i<this.selectedProductsOriginals.length; i++)
                {
                    if(this.selectedProductsOriginals[i].id != this.selectedProducts[i].id)
                        return false;
                }
            }
		}
		return true;
	}
  
}
