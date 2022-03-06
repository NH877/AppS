export interface IFirebaseObject {
    firebaseId?: string;
    firebaseTimestamp?: number;
}

/*----------------------------------------------- interfaces ----------------------------------------------------*/


export interface IProduct extends IFirebaseObject {
    id: string;
    name: string;
    gender: Gender;
    price: number;
    priceList: number;
    size: Size;
    category: ICategory;
}

export interface ICategory {
    id: number;
    type: string;
}

export interface IClothingStore {
    id: number;
    name: string;
    address: string;
}


/*----------------------------------------------- enums ----------------------------------------------------*/

export enum Gender {
    FEMENINO,
    MASCULINO,
}

export enum Size {
    XS,
    S,
    M,
    L,
    XL,
}
