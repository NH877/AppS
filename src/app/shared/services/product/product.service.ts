import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { FirebaseHelper } from 'src/app/core/helpers/firebase-helper';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private db: AngularFirestore) { }

	public getAll(): AngularFirestoreCollection<unknown> {
        return this.db.collection('product', ref => ref.orderBy('firebaseTimestamp','asc'));
    }

    public getAll_sync(): Promise<IProduct[]> {
        let querySnapshot = this.db.collection('product', ref => ref.orderBy('firebaseTimestamp','asc')).get();
        return FirebaseHelper.mapArrayToPromise(querySnapshot) as Promise<IProduct[]>;
    }

    public getById(id: string): AngularFirestoreCollection<unknown> {
        return this.db.collection('product', ref => ref.where('id','==',id))
	}

    public async getById_sync(id: string): Promise<IProduct> {
        let querySnapshot = this.db.collection('product', ref => ref.where('id','==', id)).get();
        return FirebaseHelper.mapSingleObjectToPromise(querySnapshot) as Promise<IProduct>;
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
