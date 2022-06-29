import { GetServerSideProps, NextPage } from 'next';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip, Link, Button } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSummary } from '../../../components/cart';
// import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import { happyPetApi } from '../../../api';
import NextLink from 'next/link';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {


    const { shippingAddress } = order;


  return (
    <AdminLayout 
        title='Resumen de la orden' 
        subTitle={ `Orden Id: ${ order.id }`}
        icon={ <AirplaneTicketOutlined /> }
    >
        <Box>
            <NextLink href='/admin/orders' passHref>
                <Link>
                    <Button color='secondary'>Volver</Button>
                </Link>
            </NextLink>
        </Box>
        

        {
            order.isPaid=='Pagado'
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
        }

        

        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={  order.orderItems } />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        </Box>

                        
                        <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }`: '' }</Typography>
                        <Typography>{ shippingAddress.city }</Typography>
                        <Typography>{ shippingAddress.phone }</Typography>

                        <Divider sx={{ my:1 }} />


                        <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }} 
                        />

                        <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                            {/* TODO */}


                            <Box display='flex' flexDirection='column'>
                                {
                                    order.isPaid=='Pagado'
                                    ? (
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label="Orden ya fue pagada"
                                            variant='outlined'
                                            color="success"
                                            icon={ <CreditScoreOutlined /> }
                                        />

                                    ):(
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label="Pendiente de pago"
                                            variant='outlined'
                                            color="error"
                                            icon={ <CreditCardOffOutlined /> }
                                        />
                                    )
                                }
                            </Box>

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </AdminLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const { token = '' } = req.cookies;

    let isValidToken = false;

    try {
        const{data} =  await happyPetApi.get('/validtoken', {'headers':{'Authorization': token}})
        const {rol} = data

        if(rol == 'administrador'){
            isValidToken = true;
        }
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination:`/auth/login?p=/admin/orders/${id}`,
                permanent: false,
            }
        }
    }

    const {data} = await happyPetApi.get(`/orden/${id}`)
    const order = data

    if ( !order ) {
        return {
            redirect: {
                destination: `/auth/login?p=/admin/orders/${id}`,
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}


export default OrderPage;