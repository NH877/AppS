import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
 
	public productDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
	public displayedColumns: string[] = ['name', 'price', 'priceList', 'gender', 'action'];

	public loading: boolean = true;

	constructor(
		private productService: ProductService,
		private router: Router,
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

	public home(): void {
		this.router.navigate(['']);
	}

}
