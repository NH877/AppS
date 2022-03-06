import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductAddComponent } from '../product-add/product-add.component';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
 
	public productDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
	public displayedColumns: string[] = ['name', 'price', 'priceList', 'gender', 'action'];

	public productForModify: IProduct;
	
	public modifyProduct: boolean = false;

	public loading: boolean = true;

	constructor(
		private productService: ProductService,
		private router: Router,
		public dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.getListProduct();
	}

	private getListProduct(): void {
		this.productService.getAll().valueChanges().subscribe(products => {
			this.productDataSource.data = products;
			this.loading = false;
		})
	}

	public modify(product: any): void {
		this.productForModify = (product as IProduct);
		this.modifyProduct = true;
	}

	public delete(): void {
		this.router.navigate(['/modify-product']);
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public modifiedProduct(event: IProduct): void {
		this.productDataSource.data.find(product => product.id == event.id ? product = event: null);
		this.modifyProduct = false;
	}

}
