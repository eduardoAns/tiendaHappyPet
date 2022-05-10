interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'estandar';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats'|'juguete'|'accesorio'|'cosmetico';

interface SeedData {
    products: SeedProduct[],
}


export const initialData: SeedData = {
    products: [
        {
            description: "Jueguete para morder en forma de hueso.",
            images: [
                'huesocore.jpg',
                'huesocore_2.jpg',
            ],
            inStock: 10,
            price: 8500,
            sizes: ['XS','S'],
            slug: "pdt-jgt-00001",
            type: 'juguete',
            tags: ['hueso'],
            title: "Hueso Corestrength",
            gender: 'unisex'
        },
        {
            description: "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
            images: [
                'bufanda_naranja.jpg',
                'bufanda_naranja_2.jpg',
            ],
            inStock: 0,
            price: 9900,
            sizes: ['M','L','XL','XL','XXL'],
            slug: "men_cybertruck_owl_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Bufanda Tubo Naranja",
            gender: 'men'
        },
    
        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images: [
                'cama_rectangular.jpg',
                'cama_rectangular_2.jpg',
            ],
            inStock: 50,
            price: 39990,
            sizes: ['XS','S','M','L'],
            slug: "men_turbine_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Cama Autotérmica",
            gender: 'men'
        },
        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images: [
                'parka_winter_aqua.jpg',
                'parka_winter_aqua_2.jpg',
            ],
            inStock: 50,
            price: 14990,
            sizes: ['M','L','XL','XL','XXL'],
            slug: "men_turbine_short_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Parka Winter Aqua",
            gender: 'men'
        },
        {
            description: "Juguete para buscar y recoger de forma activa y saludable.",
            images: [
                'airdogballamerican.jpg',
                'airdogballamerican_2.jpg',
            ],
            inStock: 5,
            price: 5500,
            sizes: ['XS','S','M','XL','XXL'],
            slug: "pdt-jgt-00002",
            type: 'juguete',
            tags: ['pelotas'],
            title: "Pelota Squeaker Football",
            gender: 'unisex'
        },
        {
            description: "Dispensador de Agua, hecho de plástico de alta calidad, es un dispensador de agua moderno y de primera calidad que proporciona a su gato, perro o animal pequeño agua fresca cuando tiene sed.",
            images: [
                '100042307_alt_2000.jpg',
                '100042307_alt.jpg'
            ],
            inStock: 10,
            price: 6000,
            sizes: ['S','M','L'],
            slug: "mpdt-jgt-00003",
            type: 'accesorio',
            tags: ['dispensadores'],
            title: "Dispensador de Agua Savic",
            gender: 'unisex'
        },
        {
            description: "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
            images: [
                'cocodrilo.jpg',
                '1cocodrilo_2.jpg',
            ],
            inStock: 15,
            price: 8900,
            sizes: ['S','M','L','XL'],
            slug: "men_solar_roof_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Peluche Ecológico Cocodrilo",
            gender: 'men'
        },
        {
            description: "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
            images: [
                'platoblanco.jpg',
                'platoblanco_2.jpg',
            ],
            inStock: 17,
            price: 5990,
            sizes: ['XS','S','XL','XXL'],
            slug: "men_let_the_sun_shine_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Plato de Bambú Pets",
            gender: 'men'
        },
        {
            description: "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
            images: [
                'poleron_rojo.jpg',
                '8poleron_rojo_2.jpg',
            ],
            inStock: 12,
            price: 15990,
            sizes: ['XS','S','M'],
            slug: "men_3d_large_wordmark_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Polerón Urban Hoodie Red",
            gender: 'men'
        },
        {
            description: "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
            images: [
                'dogit_comedero.jpg',
                'dogit_comedero_2.jpg',
            ],
            inStock: 5,
            price: 10990,
            sizes: ['XS','S'],
            slug: "men_3d_t_logo_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Dispensador de Alimento Dogit",
            gender: 'men'
        },
    ]
}