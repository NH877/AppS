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
import { SaleAddComponent } from '../../sale-manage/sale-add/sale-add.component';
import { ProductModifyComponent } from '../product-modify/product-modify.component';
import { ProductScanComponent } from '../product-scan/product-scan.component';


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
	public displayedColumnsMobile: string[] = ['name'];

	public expandedElement: IProduct | null;
  
	public productForModify: IProduct;
	public modifyProduct: boolean = false;

	public emptyList: boolean = true;
	public loading: boolean = true;

	public stockXS: number=0;
	public stockS: number=0;
	public stockM: number=0;
	public stockL: number=0;
	public stockXL: number=0;
	public stockXXL: number=0;

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

	public resetStock(product: IProduct): void{
		this.stockXS= this.stockOfSize('XS', product);
		this.stockS= this.stockOfSize('S', product);
		this.stockM= this.stockOfSize('M', product);
		this.stockL= this.stockOfSize('L', product);
		this.stockXL= this.stockOfSize('XL', product);
		this.stockXXL= this.stockOfSize('XXL', product);
	}

	public stockOfSize(size: string, product: IProduct): number {

		let productFound = product.stockSize.find(x => x.size == size);

		if(productFound) 
			return productFound.stock;
		else	
			return 0;

	}

	public modify(product: any): void {
		this.dialog.open(ProductModifyComponent, {
			width: 'auto',
			height: '99%',
			data: product as IProduct,
			autoFocus: false,
		});
	}

	public delete(product: any): void {
		this.dialog.open(ProductDeleteComponent, {
			width: 'auto',
			data: product as IProduct,
			autoFocus: false,
		});
	}

	public addSale(): void {
		this.dialog.open(SaleAddComponent, {
			width: '900px',
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

	public scanProduct(){
		this.dialog.open(ProductScanComponent, {
			width: '900px',   
			autoFocus: false,
		});

	}

	public sell(product: any): void{

		this.dialog.open(SaleAddComponent, {
			width: 'auto',
			data: product as IProduct,
			autoFocus: false,
		});
		
	}

}