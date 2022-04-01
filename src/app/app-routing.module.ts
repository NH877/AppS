import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountListComponent } from './features/owner/discount-manage/discount-list/discount-list.component';
import { HomeComponent } from './features/owner/home/home.component';
import { ProductAddComponent } from './features/owner/product-manage/product-add/product-add.component';
import { ProductListComponent } from './features/owner/product-manage/product-list/product-list.component';
import { SaleHistoryComponent } from './features/owner/sale-manage/sale-history/sale-history.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'add-product', component: ProductAddComponent },
	{ path: 'list-product', component: ProductListComponent },
	{ path: 'sale-history', component: SaleHistoryComponent	},
	{ path: 'list-discount', component: DiscountListComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
