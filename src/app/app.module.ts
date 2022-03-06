import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

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

// FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { ProductAddComponent } from './features/owner/product-manage/product-add/product-add.component';
import { HomeComponent } from './features/owner/home/home.component';
import { ProductListComponent } from './features/owner/product-manage/product-list/product-list.component';
import { ProductModifyComponent } from './features/owner/product-manage/product-modify/product-modify.component';
import { ProductDeleteComponent } from './features/owner/product-manage/product-delete/product-delete.component';


@NgModule({
	declarations: [
		AppComponent,
		ProductAddComponent,
		HomeComponent,
		ProductListComponent,
		ProductModifyComponent,
		ProductDeleteComponent
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
		FlexLayoutModule,
		MatDividerModule,
		ReactiveFormsModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatTooltipModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
