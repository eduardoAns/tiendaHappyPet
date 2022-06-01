import { IType } from "./products";

export interface IProductprueba {
    id: number;
    description: string;
    images: Iimage[];
    inStock: number;
    price: number;
    sizes: string;
    tags: string;
    title: string;
    type: string;
    gender: string;
    date:string
}

export interface Iimage {
    id:number;
    src:string
}

