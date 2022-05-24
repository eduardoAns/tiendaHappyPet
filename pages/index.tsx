import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

const fetcher = (...args:[key:string]) => fetch(...args).then(res => res.json())

const Home: NextPage = () => {


  // const { products, isLoading } = useProducts('/productos');
   



  return (
    <ShopLayout title={'Tienda HappyPet - Home'} pageDescription={'Encuentra los mejores productos para mascotas aqui'}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

        {/* {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        } */}

        <ProductList 
          products={ initialData.products as any }
        /> 
    

    </ShopLayout>
  )
}

export default Home
