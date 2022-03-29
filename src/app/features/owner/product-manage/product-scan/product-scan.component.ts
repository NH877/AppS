import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SaleAddComponent } from '../../sale-manage/sale-add/sale-add.component';

@Component({
	selector: 'app-product-scan',
	templateUrl: './product-scan.component.html',
	styleUrls: ['./product-scan.component.scss']
})
export class ProductScanComponent implements OnInit {

	public scanForm: FormGroup;
	public idControl: FormControl = new FormControl('', [Validators.required]);
	public productSelected: IProduct;

	constructor(
		public dialogRef: MatDialogRef<ProductScanComponent>,
		public productService: ProductService,
		public dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void{
		this.scanForm = new FormGroup({
			'id': this.idControl,
		})
	}

	public selectProduct(): void { 

		this.productService.getById(this.scanForm.get('id')?.value).get().subscribe(element => {

			this.productSelected = element.docs[0].data() as IProduct ;
			this.productSelected.firebaseId = element.docs[0].id
			
			this.dialog.open(SaleAddComponent, {
				width: 'auto',
				data: this.productSelected,
				autoFocus: false,
			});
		});
	}

}
