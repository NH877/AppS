import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDiscount, IProduct } from 'src/app/core/entities';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { DiscountAddComponent } from '../discount-add/discount-add.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DiscountModifyComponent } from '../discount-modify/discount-modify.component';

@Component({
    selector: 'app-discount-list',
    templateUrl: './discount-list.component.html',
    styleUrls: ['./discount-list.component.scss'],
    animations: [
    	trigger('detailExpand', [
      	state('collapsed', style({height: '0px', minHeight: '0'})),
      	state('expanded', style({height: '*'})),
      	transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    ],
})
export class DiscountListComponent implements OnInit {
    public dcDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    public displayedColumns: string[] = ['name', 'rate', 'action'];
	public displayedColumnsMobile: string[] = ['name', 'rate'];

	public expandedElement: IDiscount | null;

    private products: IProduct[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private dcService: DiscountService, 
        public dialog: MatDialog, 
        private snackBar: MatSnackBar,
        public pService: ProductService
        ) { }

    ngOnInit(): void {
        this.getDiscountList();
    }

    private getDiscountList(): void {
        this.dcService.getAll().valueChanges().subscribe(dc => {
            this.dcDataSource.data = dc;
            this.dcDataSource.paginator = this.paginator;
            this.dcDataSource.sort = this.sort;
        })
    }

    public delete(discount: IDiscount): void {
        this.dcService.getById(discount.id).get().subscribe(element => {
            discount.firebaseId = element.docs[0].id
            this.dcService.delete(discount) 
                .then(() => {

                    this.removeDiscountToProduct(discount)

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
    
    private removeDiscountToProduct(discountForDelete: IDiscount): void {

        this.pService.getAll_sync().then(responce => {

            let allProducts = responce as IProduct[];

            for(let product of allProducts) 
            {
                if(product.discount.find(discount => discount.id == discountForDelete.id))
                    this.products.push(product);
            }
            
            for(let productWithDiscount of this.products)
            {
                var i = productWithDiscount.discount.indexOf(discountForDelete);
                productWithDiscount.discount.splice( i, 1 );

                this.pService.modify(productWithDiscount)
                .then()
                .catch(error => {
                    this.snackBar.open("Error al intentar sacar el descuento del producto", "Cerrar", {
                        duration: 3000,
                        panelClass: ['red-snackbar']
                    });
                });
            }
          
        })
    }

    public addDiscount(): void {
        this.dialog.open(DiscountAddComponent, {
            width: '900px',
            autoFocus: false,
        });
    }

    public modifyDiscount(discount: IDiscount): void {
        console.log(discount)
        this.dialog.open(DiscountModifyComponent, {
            width: '900px',
            data: discount,
            autoFocus: false,
        });
    }

    public applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dcDataSource.filter = filterValue.trim().toLowerCase();

        if (this.dcDataSource.paginator) {
            this.dcDataSource.paginator.firstPage();
        }
    }
}
