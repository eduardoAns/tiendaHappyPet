import { IType } from "./products";

export interface IProductprueba {
    id?: number;
    description: string;
    images: Iimage[];
    inStock: number;
    price: number;
    sizes: string;
    tags: string;
    title: string;
    type: string;
    gender: string;
    date:string;
    status:string;
}

export interface Iimage {
    public_id?:string;
    idProducto?:number;
    src:string
}

