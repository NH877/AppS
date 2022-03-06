import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/owner/home/home.component';
import { ProductAddComponent } from './features/owner/product-manage/product-add/product-add.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'add-product', component: ProductAddComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
