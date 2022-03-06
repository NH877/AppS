import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IProduct } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private db: AngularFirestore) { }

	public getAll(): AngularFirestoreCollection<unknown> {
        return this.db.collection('product', ref => ref.orderBy('firebaseTimestamp','asc'));
    }

	public add(product: IProduct): Promise<unknown> {
		return this.db.collection('product').add(CoreHelper.convertToObject(product));
	}

	public delete(product: IProduct): Promise<void> {
        return this.db.collection('product').doc(product.firebaseId).delete();
    }

    public modify(product: IProduct): Promise<void> {
        return this.db.collection('product').doc(product.firebaseId).update(CoreHelper.convertToObject(product));
    }
}
