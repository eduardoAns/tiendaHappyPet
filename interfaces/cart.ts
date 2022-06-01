import { ISize } from './';

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: string;
    slug?: string;
    title: string;
    gender: string;
    // gender: 'men'|'women'|'unisex';
    quantity: number;
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
