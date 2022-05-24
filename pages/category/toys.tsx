import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { initialData } from '../../database/products';


const ToyPage: NextPage = () => {


    // const { products, isLoading } = useProducts('/productos?gender=toy');
   



    return (
      <ShopLayout title={'Tienda HappyPet - Juguetes'} pageDescription={'Encuentra los mejores juguetes para mascotas aqui'}>
          <Typography variant='h1' component='h1'>Juguetes</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>para mas mascotas alegres</Typography>
  
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

export default ToyPage
