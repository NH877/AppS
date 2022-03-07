export interface IFirebaseObject {
    firebaseId?: string;
    firebaseTimestamp?: number;
}

/*----------------------------------------------- interfaces ----------------------------------------------------*/


export interface IProduct extends IFirebaseObject {
    id: string;
    name: string;
    cost: number;
    salePrice: number;
    listPrice: number;
    stockSize: StockSize[];
    img: string[];
    local: Store;
}
export interface StockSize {
    size: Size;
    stock: number;
}

/*----------------------------------------------- enums ----------------------------------------------------*/

export enum Store {
    STORE_A,
    STORE_B,
    STORE_C
}

export enum Size {
    XS,
    S,
    M,
    L,
    XL,
    XXL
}
