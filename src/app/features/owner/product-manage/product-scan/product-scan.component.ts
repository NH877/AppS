import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-product-scan',
	templateUrl: './product-scan.component.html',
	styleUrls: ['./product-scan.component.scss']
})
export class ProductScanComponent implements OnInit {

	public scanForm: FormGroup;
	public idControl: FormControl = new FormControl('', [Validators.required]);

	constructor(
		public dialogRef: MatDialogRef<ProductScanComponent>
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	public initForm(): void{
		this.scanForm = new FormGroup({
			'id': this.idControl,
		})
	}

}
