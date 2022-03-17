import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IProduct, Size } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-product-add',
	templateUrl: './product-add.component.html',
	styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

	public productForm: FormGroup;

	public srcResult: string;

	public attachedImages: File[] = [];

	public displayUrlImage: any[] = [];



	constructor(
		private productService: ProductService,
		private router: Router,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void {
		this.productForm = new FormGroup({
			'name': new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]),
			'cost': new FormControl(null, [Validators.required]),
			'salePrice': new FormControl(null, [Validators.required]),
			'listPrice': new FormControl(null, [Validators.required]),
			'stockSize': new FormControl(null, [Validators.required]),
		})
	}

	public addProduct(): void {
		let product: IProduct = {
			id: CoreHelper.generateIdDate(),
			name: this.productForm.get('name')?.value,
			cost: this.productForm.get('cost')?.value,
			salePrice: this.productForm.get('salePrice')?.value,
			listPrice: this.productForm.get('listPrice')?.value,
			stockSize: this.productForm.get('stockSize')?.value,
			img: this.productForm.get('img')?.value,
			firebaseTimestamp: Date.now(),
			disabled: false,
		}

		this.productService.add(product)
			.then(() => {
				this.snackBar.open("Producto agregado", "Cerrar", {
					duration: 3000,
					panelClass: ['green-snackbar']
				});

				this.router.navigate(['/list-product']);
			})

			.catch(error => {
				console.log("line 74 - product-add", error);
				this.snackBar.open("Error al intentar agregar el producto", "Cerrar", {
					duration: 3000,
					panelClass: ['red-snackbar']
				});
			});
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public list(): void {
		this.router.navigate(['/list-product']);
	}

	

	public onFileSelected(event: any): void {
        
				
		for (let file of event.target.files) {
            const reader = new FileReader();
			reader.onloadend = (event) => {
				if(event.target != null)
                this.displayUrlImage.push(event.target.result);
            }
            reader.readAsDataURL(file);
            this.attachedImages.push(file);
		}
        
        (<HTMLInputElement>document.getElementById('inputFile')).value = '';
    }

}