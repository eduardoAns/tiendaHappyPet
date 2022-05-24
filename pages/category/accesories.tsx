import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { initialData } from '../../database/products';


const AccesoriePage: NextPage = () => {


    // const { products, isLoading } = useProducts('/productos?gender=accesorie');
   



    return (
      <ShopLayout title={'Tienda HappyPet - Accesorios'} pageDescription={'Encuentra los mejores accesorios para mascotas aquí'}>
          <Typography variant='h1' component='h1'>Accesorios</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>Para mascotas</Typography>
  
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

export default AccesoriePage
