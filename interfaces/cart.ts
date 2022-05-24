import { ISize } from './';

export interface ICartProduct {
    id: string;
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'unisex';
    quantity: number;
}
