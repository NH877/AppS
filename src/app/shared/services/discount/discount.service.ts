import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IDiscount } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';

@Injectable({
    providedIn: 'root'
})
export class DiscountService {

    constructor(private db: AngularFirestore) { }

    public add(discount: IDiscount): Promise<unknown> {
        return this.db.collection('discount').add(CoreHelper.convertToObject(discount));
    }

    public getAll(): AngularFirestoreCollection<unknown> {
        return this.db.collection('discount', ref => ref.orderBy('firebaseTimestamp', 'asc'));
    }

    public getById(id: string): AngularFirestoreCollection<unknown> {
        return this.db.collection('discount', ref => ref.where('id','==',id));
	}


    public delete(dc: any): Promise<void> {
        console.log(dc)
        return this.db.collection('discount').doc(dc.firebaseId).delete();
    }
}