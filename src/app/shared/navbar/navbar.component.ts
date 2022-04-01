import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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

	public listDiscount(): void {
		this.router.navigate(['/list-discount'])
	}
}
