import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/owner/home/home.component';
import { ProductAddComponent } from './features/owner/product-manage/product-add/product-add.component';
import { ProductListComponent } from './features/owner/product-manage/product-list/product-list.component';
import { ProductModifyComponent } from './features/owner/product-manage/product-modify/product-modify.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'add-product', component: ProductAddComponent },
	{ path: 'list-product', component: ProductListComponent },
	{ path: 'modify-product', component: ProductModifyComponent },


];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
