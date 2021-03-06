export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ISize[];
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    gender: 'men'|'women'|'unisex'
}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'estandar';
export type IType = 'shirts'|'pants'|'hoodies'|'hats'|'juguete'|'accesorio'|'cosmetico';

