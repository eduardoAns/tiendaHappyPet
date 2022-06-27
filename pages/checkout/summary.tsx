import NextLink from 'next/link';

import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, CartContext } from '../../context';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { happyPetApi } from '../../api';


const SummaryPage = () => {
    
    const router = useRouter();

    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );
    const { user } = useContext( AuthContext );

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if ( !Cookies.get('firstName') ) {
            router.push('/checkout/address');
        }
    }, [ router ]);

    const onCreateOrder = async() => {
        setIsPosting(true);
        // const userId: number = user?.id !== undefined ? user?.id : 0
        const token = Cookies.get('token')!;
        const {data}=await happyPetApi.get('/validtoken', {'headers':{'Authorization': token}})
        const userId:string = data.id
        console.log(userId)
        const { message, hasError } = await createOrder(userId); 
        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        
        router.replace(`/orders/${ message }`);
        // router.replace(`/orders/2`);


    }

    if ( !shippingAddress ) {
        return <></>;
    }
     
    const { firstName, lastName, address, address2 = '', city, phone } = shippingAddress;

  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems} { numberOfItems === 1 ? 'producto':'productos' })</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>{ firstName } { lastName }</Typography>
                        <Typography> { address }{ address2 ? `, ${address2}` : ''  } </Typography>
                        <Typography>{ city },</Typography>
                        <Typography>Chile</Typography>
                        <Typography>{ phone }</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button 
                                color="secondary" 
                                className='circular-btn' 
                                fullWidth
                                onClick={onCreateOrder}
                                disabled={isPosting}
                                >
                                Confirmar Orden
                            </Button>

                            <Chip 
                                color="error"
                                label={ errorMessage }
                                sx={{ display: errorMessage ? 'flex':'none', mt: 2 }}
                            />
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default SummaryPage;