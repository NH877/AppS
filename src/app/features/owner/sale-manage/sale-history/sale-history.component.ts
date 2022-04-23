import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ISale } from 'src/app/core/entities';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
	selector: 'app-sale-history',
	templateUrl: './sale-history.component.html',
	styleUrls: ['./sale-history.component.scss'],
	animations: [
    	trigger('detailExpand', [
      	state('collapsed', style({height: '0px', minHeight: '0'})),
      	state('expanded', style({height: '*'})),
      	transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    	]),
	],
})
export class SaleHistoryComponent implements OnInit {

	public saleDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
	public displayedColumns: string[] = ['date' , 'nameOfProfuct', 'size', 'payment', 'totalPriceSale', 'action'];
	public expandedElement: ISale | null;
	public expandedDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
	public expandedColumns: string[] = ['discount' , 'rate'];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private saleService: SaleService,
		private router: Router,
		public dialog: MatDialog,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.getSaleList()
	}

	public test(element: any): boolean {
		
		this.expandedElement = this.expandedElement === element ? null : element;
		console.log(element);
		console.log(this.expandedDataSource.data);
			let test: any[] = [
				{discount: 'discount', rate: element.id},
				{discount: 'rate', rate: element.discount[0].id}
			]
			this.expandedDataSource.data = test; 
		return true;
		
	}
	public test2(element: any): void {
		
		
		
		console.log(element);
	
		
	}

	private getSaleList(): void {
		this.saleService.getAll().valueChanges().subscribe(sales => {
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

		if (this.saleDataSource.paginator ) {
			this.saleDataSource.paginator.firstPage();	
		}
	}

	public deleteHistory(sale : ISale): void {
		
        this.saleService.getById(sale.id).get().subscribe(element => {
            sale.firebaseId = element.docs[0].id

            this.saleService.delete(sale)
                .then(() => {
                    this.snackBar.open("Descuento eliminado", "Cerrar", {
                        duration: 3000,
                        panelClass: ['green-snackbar']
                    });
                })
                .catch(() => {
                    this.snackBar.open("Error al intentar eliminar el descuento", "Cerrar", {
                        duration: 3000,
                        panelClass: ['red-snackbar']
                    });
                })
        })
    }
}
