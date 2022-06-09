import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts, useProductsPrueba } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { initialData } from '../../database/products';
import { happyPetApi, happyPetApiPrueba } from '../../api';
import { IProductprueba } from '../../interfaces';

const AccesoriePage: NextPage = () => {


  const { products, isLoading } = useProductsPrueba('/producto/tipo/Accesorios');



    return (
      
      <ShopLayout title={'Tienda HappyPet - Accesorios'} pageDescription={'Encuentra los mejores accesorios para mascotas aquí'}>
          <Typography variant='h1' component='h1'>Accesorios</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>Para mascotas</Typography>
  
          {
            isLoading
              ? <FullScreenLoading />
              : <ProductList products={ products } />
          }
  
          
      
  
      </ShopLayout>
    )
}

export default AccesoriePage
