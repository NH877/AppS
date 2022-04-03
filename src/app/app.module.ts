import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Materials
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';


// Components
import { ProductAddComponent } from './features/owner/product-manage/product-add/product-add.component';
import { HomeComponent } from './features/owner/home/home.component';
import { ProductListComponent } from './features/owner/product-manage/product-list/product-list.component';
import { ProductModifyComponent } from './features/owner/product-manage/product-modify/product-modify.component';
import { ProductDeleteComponent } from './features/owner/product-manage/product-delete/product-delete.component';
import { SaleHistoryComponent } from './features/owner/sale-manage/sale-history/sale-history.component';
import { SaleAddComponent } from './features/owner/sale-manage/sale-add/sale-add.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductScanComponent } from './features/owner/product-manage/product-scan/product-scan.component';
import { OptionCreditCardComponent } from './features/owner/sale-manage/option-credit-card/option-credit-card.component';
import { DiscountListComponent } from './features/owner/discount-manage/discount-list/discount-list.component';
import { DiscountAddComponent } from './features/owner/discount-manage/discount-add/discount-add.component';
import { DiscountModifyComponent } from './features/owner/discount-manage/discount-modify/discount-modify.component';
import { DiscountSelectorComponent } from './features/owner/discount-manage/discount-selector/discount-selector.component';


@NgModule({
	declarations: [
		AppComponent,
		ProductAddComponent,
		HomeComponent,
		ProductListComponent,
		ProductModifyComponent,
		ProductDeleteComponent,
		SaleHistoryComponent,
		SaleAddComponent,
		NavbarComponent,
		FooterComponent,
		ProductScanComponent,
		OptionCreditCardComponent,
		DiscountListComponent,
		DiscountAddComponent,
		DiscountModifyComponent,
  DiscountSelectorComponent,
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireFunctionsModule,
		AngularFirestoreModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,
		ReactiveFormsModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatTooltipModule,
		MatSortModule,
		MatSnackBarModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatToolbarModule,
		MatMenuModule,
		MatSelectModule,
		MatRadioModule,
		FormsModule,
		MatListModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }