import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	public addProduct(): void {
		this.router.navigate(['/add-product']);
	}

	public listProduct(): void {
		this.router.navigate(['/list-product']);
	}

	public listSales(): void {
		this.router.navigate(['/sale-history'])
	}
}
