import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { initialData } from '../../database/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { useRouter } from 'next/router';
import { useProducts } from '../../hooks';
import { ICartProduct, IProduct, IProductprueba, ISize, IUser } from '../../interfaces';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useContext, useState } from 'react';
import { CartContext } from '../../context';
import { happyPetApi } from '../../api';

interface Props {
  product: IProductprueba
}


const ProductPage:NextPage<Props> = ({product}) => {


  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${ router.query.slug }`);
  const router = useRouter();
  const { addProductToCart } = useContext( CartContext )

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    id: product.id,
    image: product.images[0].src,
    price: product.price,
    size: product.sizes[0],
    title: product.title,
    gender: product.gender,
    quantity: 1,
    inStock:product.inStock
  })

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }));
  }


  const onAddProduct = () => {

    addProductToCart(tempCartProduct);
    router.push('/cart');
  }

  return (

    

    <ShopLayout title={ product.title } pageDescription={ product.description }>
    
      <Grid container spacing={3}>

        <Grid item xs={12} sm={ 7 }>
          <ProductSlideshow 
            images={ product.images }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter 
                currentValue={ tempCartProduct.quantity }
                updatedQuantity={ onUpdateQuantity  }
                maxValue={ product.inStock > 10 ? 10: product.inStock }
              />
              <SizeSelector 
                //selectedSize={ product.sizes[0] } 
                sizes={ product.sizes }
              />
            </Box>


            {/* Agregar al carrito */}
            {
              (product.inStock > 0)
               ? (
                  <Button 
                    color="secondary" 
                    className='circular-btn'
                    onClick={ onAddProduct }
                  > agregar al carro
                    {/* {
                      tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    } */}
                  </Button>
               )
               : (
                 <Chip label="No hay disponibles" color="error" variant='outlined' />
               )
            }

            {/* <Chip label="No hay disponibles" color="error" variant='outlined' /> */}

            {/* Descripci??n */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripci??n</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}





// getServerSideProps 
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//* No usar esto.... SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug( slug );

//   if ( !product ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


// getStaticPaths....
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  // const productSlugs = initialData.products;
  // const {data} = await happyPetApi.get('/producto');
  // const productTitle = data.forEach((element:any) => 
  //   {element.id = String(element.id)
  //   return element
  //   }
  // );

  const {data} = await happyPetApi.get('/producto/lista')
  const productosId = data
  // const productosId = [...Array(13)].map((value, index) => `${index + 1}`)

  

  return {
    paths: productosId.map( (id:string) => ({  
      params: {
        id
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  

  const { id = '' } = params as { id: string };

  const {data} = await happyPetApi.get(`/producto/ ${parseInt(id)}`);

  const product = data
  

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}
// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes
// export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
//   const productSlugs = await dbProducts.getAllProductSlugs();

  
//   return {
//     paths: productSlugs.map( ({ slug }) => ({
//       params: {
//         slug
//       }
//     })),
//     fallback: 'blocking'
//   }
// }


// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user???s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast ??? getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
// export const getStaticProps: GetStaticProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug( slug );`url/${slug]}`

//   if ( !product ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     },
//     revalidate: 60 * 60 * 24
//   }
// }

export default ProductPage