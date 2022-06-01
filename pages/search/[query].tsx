import type { NextPage, GetServerSideProps } from 'next';
import { Typography,Box } from '@mui/material';
import { initialData } from '../../database/products';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

// import { dbProducts } from '../../database';
import { IProduct, IProductprueba } from '../../interfaces';
import { happyPetApi } from '../../api';


interface Props {
    products: IProductprueba[];
    foundProducts: boolean;
    query: string;
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


  return (
    <ShopLayout title={'HappyPet - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Buscar productos</Typography>

        {
            foundProducts 
                ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Término: { query }</Typography>
                : (
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún produto</Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{ query }</Typography>
                    </Box>
                )
        }

        

        
        <ProductList products={ products } />
        
    </ShopLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    let { query = '' } = params as { query: string };
    query = query.charAt(0).toUpperCase() + query.slice(1)

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let {data} = await happyPetApi.get(`/producto/nombre/${query}`);
    let products = data
    // let products = initialData.products
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if ( !foundProducts ) {
        const {data} = await happyPetApi.get(`/producto`);
        products = data
        // products = await dbProducts.getProductsByTerm('shirt');
        // products = initialData.products;
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


export default SearchPage
