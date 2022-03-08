import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
	providedIn: 'root'
})
export class SaleHistoryService {

	constructor(private db: AngularFirestore) { }

	public getAll(): AngularFirestoreCollection<unknown> {
		return this.db.collection('saleHistory', ref => ref.orderBy('firebaseTimestamp', 'asc'));
	}

}
