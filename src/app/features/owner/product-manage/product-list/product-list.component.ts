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
import { OptionCreditCardComponent } from '../../sale-manage/option-credit-card/option-credit-card.component';


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

	public stock: number=0;

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

	public stockOfSize(size: string, product: IProduct): void {

		let productFound = product.stockSize.find(x => x.size == size);

		if(productFound) 
			this.stock= productFound.stock;
		else	
			this.stock=0;

	}

	public modify(product: any): void {
		this.dialog.open(ProductModifyComponent, {
			width: 'auto',
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
		const dialogRef = this.dialog.open(SaleAddComponent, {
			width: '900px',  /* ESTO DEFINE LO ANCHO QUE VA SER EL MAT-DIALOG*/ 
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

	public scanProduct(){const dialogRef = this.dialog.open(ProductScanComponent, {
		width: '900px',  /* ESTO DEFINE LO ANCHO QUE VA SER EL MAT-DIALOG*/ 
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

	public creditCard(): void{
		const dialogRef = this.dialog.open(OptionCreditCardComponent, {
			width: '700px',  /* ESTO DEFINE LO ANCHO QUE VA SER EL MAT-DIALOG*/ 
			data: 10000 as number,
			autoFocus: false,
		});
	}

}