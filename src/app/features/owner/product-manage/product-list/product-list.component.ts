import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	animations: [
    	trigger('detailExpand', [
      	state('collapsed', style({height: '0px', minHeight: '0'})),
      	state('expanded', style({height: '*'})),
      	transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductListComponent implements OnInit {

	public productDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
	public displayedColumns: string[] = ['name', 'cost', 'listPrice', 'salePrice', 'action'];
	public expandedElement: IProduct | null;
  
	public productForModify: IProduct;
	public modifyProduct: boolean = false;

	public emptyList: boolean = true;
	public loading: boolean = true;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

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
			this.productDataSource.paginator = this.paginator;
			this.productDataSource.sort = this.sort;
			this.loading = false;
		})
	}

	public modify(product: any): void {
		this.productForModify = (product as IProduct);
		this.modifyProduct = true;
	}

	public delete(product: any): void {
		const dialogRef = this.dialog.open(ProductDeleteComponent, {
			width: '700px',
			data: product as IProduct,
			autoFocus: false,
		});
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public add(): void {
		this.router.navigate(['/add-product']);
	}

	public modifiedProduct(event: IProduct): void {
		this.productDataSource.data.find(product => product.id == event.id ? product = event : null);
		this.modifyProduct = false;
	}

	public applyFilter(event: Event): void {
		
		const filterValue = (event.target as HTMLInputElement).value;
		this.productDataSource.filter = filterValue.trim().toLowerCase();

		if (this.productDataSource.paginator) 
			this.productDataSource.paginator.firstPage();
		
	}

}