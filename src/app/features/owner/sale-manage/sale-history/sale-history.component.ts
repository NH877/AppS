import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ISale } from 'src/app/core/entities';
import { SaleHistoryService } from 'src/app/shared/services/sale-history/sale-history.service';

@Component({
	selector: 'app-sale-history',
	templateUrl: './sale-history.component.html',
	styleUrls: ['./sale-history.component.scss']
})
export class SaleHistoryComponent implements OnInit {

	public saleDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
	public displayedColumns: string[] = ['name', 'cost', 'listPrice', 'salePrice', 'size', 'local'];

	public productSale: ISale;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private saleHistoryService: SaleHistoryService,
		private router: Router,
		public dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.getSaleList ()
	}

	private getSaleList (): void {
		this.saleHistoryService.getAll().valueChanges().subscribe(sales => {
			this.saleDataSource.data = sales;
			this.saleDataSource.paginator = this.paginator;
			this.saleDataSource.sort = this.sort;
		})
	}

	public home(): void {
		this.router.navigate(['']);
	}

	public applyFilter(event: Event): void {
		
		const filterValue = (event.target as HTMLInputElement).value;
		this.saleDataSource.filter = filterValue.trim().toLowerCase();

		if (this.saleDataSource.paginator) 
			this.saleDataSource.paginator.firstPage();
		
	}

}
