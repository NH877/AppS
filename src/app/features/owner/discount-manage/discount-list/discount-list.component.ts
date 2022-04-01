import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDiscount } from 'src/app/core/entities';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { DiscountAddComponent } from '../discount-add/discount-add.component';

@Component({
    selector: 'app-discount-list',
    templateUrl: './discount-list.component.html',
    styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {
    public dcDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    public displayedColumns: string[] = ['name', 'rate', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dcService: DiscountService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.getDiscountList()
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

    public addSale(): void {
        const dialogRef = this.dialog.open(DiscountAddComponent, {
            width: '900px',  /* ESTO DEFINE LO ANCHO QUE VA SER EL MAT-DIALOG*/
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
