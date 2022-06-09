import NextLink from 'next/link';

import { Link, Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { IOrder } from '../../interfaces';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    // const { shippingAddress } = order;

  return (
    <ShopLayout title='Resumen de la orden 123671523' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Orden: ABC123</Typography>


        {/* {
            order.isPaid
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant='outlined'
                    color="success"
                    icon={ <CreditScoreOutlined /> }
                />
            ):
            (
                <Chip 
                    sx={{ my: 2 }}
                    label="Pendiente de pago"
                    variant='outlined'
                    color="error"
                    icon={ <CreditCardOffOutlined /> }
                />
            )
        } */}

        <Chip 
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant='outlined'
            color="error"
            icon={ <CreditCardOffOutlined /> }
        />

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList />
                {/* <CartList products={  order.orderItems } /> */}
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>Eduardo Ansa</Typography>
                        <Typography> calle 2298</Typography>
                        <Typography>Calama</Typography>
                        <Typography>Chile</Typography>
                        <Typography>+569 23123123</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />
                        {/* <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }} 
                        /> */}

                        <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                            {/* TODO */}

                            {/* {
                                order.isPaid
                                ? (
                                    <Chip 
                                        sx={{ my: 2 }}
                                        label="Orden ya fue pagada"
                                        variant='outlined'
                                        color="success"
                                        icon={ <CreditScoreOutlined /> }
                                    />

                                ):(
                                    <h1>Pagar</h1>
                                )
                            } */}
                            <h1>Pagar</h1>

                            <Chip 
                                sx={{ my: 2 }}
                                label="Orden ya fue pagada"
                                variant='outlined'
                                color="success"
                                icon={ <CreditScoreOutlined /> }
                            />
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
//
//     const { id = '' } = query;

       //verifica si el usuario esta conectado y devuelve el id del usuario
       
//     const session:any = await getSession({ req });


//     if ( !session ) {
//         return {
//             redirect: {
//                 destination: `/auth/login?p=/orders/${ id }`,
//                 permanent: false,
//             }
//         }
//     }

       //carga la orden desde la base de datos, a travez de la id de la query

//     const order = await dbOrders.getOrderById( id.toString() );

//     if ( !order ) {
//         return {
//             redirect: {
//                 destination: '/orders/history',
//                 permanent: false,
//             }
//         }
//     }

       //compara el id del token con el el id del usuario de la orden de compra ()

//     if ( order.user !== session.user._id ) {
//         return {
//             redirect: {
//                 destination: '/orders/history',
//                 permanent: false,
//             }
//         }
//     }


//     return {
//         props: {
//             order
//         }
//     }
// }

export default OrderPage;