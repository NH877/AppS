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
    img: string;
    disabled: boolean;
    discount: IDiscount[];
}

export interface ISale extends IFirebaseObject {
    id: string;
    product: IProduct;
    nameOfProfuct: string;
    discount: IDiscount[];
    rate: number;
    totalPriceSale: number;
    payment: Payment;
    dataFee?: IDataFee;
    date: Date;
    size: Size;
}

export interface IDiscount extends IFirebaseObject {
    id: string;
    name: string;
    rate: number;
    firebaseTimestamp: number;
}

export interface StockSize {
    size: Size;
    stock: number;
}

export interface IDataFee {
    feeNumber: number;
    total: number;
    feeValue: number;
    rate: number;
    charge: number;
}
/*----------------------------------------------- enums ----------------------------------------------------*/

export enum Size {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL'
}

export enum Payment{
    Cash = 'Efectivo',
    Credit_Card = 'Tarjeta de Credito'
}
