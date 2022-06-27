import { ISize, IUser } from './';

export interface IOrder {

    id? : number;
    user?: IUser | number;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult?: string;

    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;

    isPaid  : string;
    paidAt? : string;
    idPaypal:string;
}


export interface IOrderItem {
    idOrden?:number;
    id?:number;
    idproducto: number;
    title    : string;
    size     : string;
    quantity : number;
    image    : string;
    price    : number;
    gender   : string;
    inStock? :number;

}


export interface ShippingAddress {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    city     : string;
    phone    : string;
}