import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/entities';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import {animate, state, style, transition, trigger} from '@angular/animations';


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
	//public expandedElement: IProduct | null;

	public dataSource = ELEMENT_DATA;
	public columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
	public expandedElement: PeriodicElement | null;
  

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

	// public areThereItemsInTheList(): boolean {
	// 	if (this.loading)
	// 		return false;
	// 	else if (this.productDataSource.data.length == 0) {
	// 		this.emptyList = true;
	// 		return false;
	// 	}
	// 	else {
	// 		this.emptyList = false;
	// 		return true;
	// 	}

	// }

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

	public test(any: any){
		console.log(any)
		if(any == this.expandedElement){
			console.log('Lo es mostro');
			return 'expanded';
		}
		return 'collapsed';
	}

	
}
export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
	description: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
	{
	  position: 1,
	  name: 'Hydrogen',
	  weight: 1.0079,
	  symbol: 'H',
	  description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
		  atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
	},
	{
	  position: 2,
	  name: 'Helium',
	  weight: 4.0026,
	  symbol: 'He',
	  description: `Helium is a chemical element with symbol He and atomic number 2. It is a
		  colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
		  group in the periodic table. Its boiling point is the lowest among all the elements.`,
	},
	{
	  position: 3,
	  name: 'Lithium',
	  weight: 6.941,
	  symbol: 'Li',
	  description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
		  silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
		  lightest solid element.`,
	},
	{
	  position: 4,
	  name: 'Beryllium',
	  weight: 9.0122,
	  symbol: 'Be',
	  description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
		  relatively rare element in the universe, usually occurring as a product of the spallation of
		  larger atomic nuclei that have collided with cosmic rays.`,
	},
	{
	  position: 5,
	  name: 'Boron',
	  weight: 10.811,
	  symbol: 'B',
	  description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
		  by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
		  low-abundance element in the Solar system and in the Earth's crust.`,
	},
	{
	  position: 6,
	  name: 'Carbon',
	  weight: 12.0107,
	  symbol: 'C',
	  description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
		  and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
		  to group 14 of the periodic table.`,
	},
	{
	  position: 7,
	  name: 'Nitrogen',
	  weight: 14.0067,
	  symbol: 'N',
	  description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
		  discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
	},
	{
	  position: 8,
	  name: 'Oxygen',
	  weight: 15.9994,
	  symbol: 'O',
	  description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
		   the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
		   agent that readily forms oxides with most elements as well as with other compounds.`,
	},
	{
	  position: 9,
	  name: 'Fluorine',
	  weight: 18.9984,
	  symbol: 'F',
	  description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
		  lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
		  conditions.`,
	},
	{
	  position: 10,
	  name: 'Neon',
	  weight: 20.1797,
	  symbol: 'Ne',
	  description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
		  Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
		  two-thirds the density of air.`,
	},
  ];