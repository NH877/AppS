import { firstValueFrom, Observable } from "rxjs";

export class FirebaseHelper {

    public static async mapSingleObjectToPromise(querySnapshot: Observable<any>): Promise<any> {
        let query = await firstValueFrom(querySnapshot);
        let firebaseObj = query.docs[0].data();
        firebaseObj.firebaseId = query.docs[0].id;
        return firebaseObj;
    }

    public static async mapArrayToPromise(querySnapshot: Observable<any>): Promise<any[]> {
        let query = await firstValueFrom(querySnapshot);
        let firebaseObjects = [];
        for(let queryObj of query.docs)
        {
            let firebaseObj = queryObj.data();
            firebaseObj.id = queryObj.id;
            firebaseObjects.push(firebaseObj);
        }
        return firebaseObjects;
    }
}