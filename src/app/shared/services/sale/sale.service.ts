import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ISale } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';

@Injectable({
	providedIn: 'root'
})
export class SaleService {

	constructor(private db: AngularFirestore) { }

	public add(sale: ISale): Promise<unknown> {
		return this.db.collection('sale').add(CoreHelper.convertToObject(sale));
	}

	public getAll(): AngularFirestoreCollection<unknown> {
		return this.db.collection('sale', ref => ref.orderBy('firebaseTimestamp', 'asc'));
	}



}
