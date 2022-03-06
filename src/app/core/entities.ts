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
    category: Category;
}

export interface Category {
    id: number;
    type: Type;
}


/*----------------------------------------------- enums ----------------------------------------------------*/

export enum Gender {
    FEMENINO,
    MASCULINO,
}

export enum Type {
    REMERA,
    PANTALON,
    TOP,
    ROPA_INTERIOR,
    ZAPATILLAS,
}

export enum Size {
    XS,
    S,
    M,
    L,
    XL,
}
