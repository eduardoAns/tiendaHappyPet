import { ISize } from './';

export interface ICartProduct {
    id?: number;
    idOrden?:number;
    idProducto?:number;
    image: string;
    price: number;
    size?: string;
    slug?: string;
    title: string;
    gender: string;
    // gender: 'men'|'women'|'unisex';
    quantity: number;
    inStock?: number;
}

export interface ICartProductPrueba {
    id: number;
    image: string;
    price: number;
    size?: string;
    title: string;
    gender: string;
    quantity: number;
}
