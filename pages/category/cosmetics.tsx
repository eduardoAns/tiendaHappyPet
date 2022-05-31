import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts, useProductsPrueba } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { initialData } from '../../database/products';


const CosmeticPage: NextPage = () => {


  const { products, isLoading } = useProductsPrueba('/producto/tipo/Cosmetica');
   



   return (
    <ShopLayout title={'Tienda HappyPet - Cosmeticos'} pageDescription={'Encuentra los mejores cosmeticos para mascotas aquí'}>
        <Typography variant='h1' component='h1'>Cosmetica</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>para mascotas </Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

export default CosmeticPage
