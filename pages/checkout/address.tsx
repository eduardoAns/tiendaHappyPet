import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';
import { GetServerSideProps } from "next";
import router, { useRouter } from "next/router";
import { CartContext } from "../../context";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { happyPetApi, happyPetApiPrueba } from "../../api";

type FormData = {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    city     : string;
    phone    : string;
}

const getAddressFromCookies = ():FormData => {
    return {
        firstName : Cookies.get('firstName') || '',
        lastName  : Cookies.get('lastName') || '',
        address   : Cookies.get('address') || '',
        address2  : Cookies.get('address2') || '',
        city      : Cookies.get('city') || '',
        phone     : Cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const router = useRouter();
    const { updateAddress} = useContext( CartContext );

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: getAddressFromCookies() 
     });

     useEffect(() => {
        reset(getAddressFromCookies() );

    }, [reset])

    const onSubmitAddress = ( data: FormData ) => {
        console.log(data)
        updateAddress( data );
        router.push('/checkout/summary');
    }
        
  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
        <form onSubmit={ handleSubmit( onSubmitAddress ) }>

        
            <Typography variant="h1" component='h1'>Dirección</Typography>

            <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Nombre' 
                        variant="filled" 
                        fullWidth 
                        { ...register('firstName', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.firstName }
                        helperText={ errors.firstName?.message }
                        />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Apellido' 
                        variant="filled" 
                        fullWidth 
                        { ...register('lastName', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.lastName }
                        helperText={ errors.lastName?.message }
                        />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Dirección' 
                        variant="filled" 
                        fullWidth 
                        { ...register('address', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                        />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Dirección 2 (opcional)' 
                        variant="filled" 
                        fullWidth 
                        
                        />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Ciudad' 
                        variant="filled" 
                        fullWidth 
                        { ...register('city', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.city }
                        helperText={ errors.city?.message }
                        />
                </Grid>
                            
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Teléfono' 
                        variant="filled" 
                        fullWidth 
                        { ...register('phone', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.phone }
                        helperText={ errors.phone?.message }
                        />
                </Grid>

            </Grid>


            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>                    

                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Confirmar pedido
                    </Button>
      
            </Box>  
        </form>                
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = '' } = req.cookies;

    let isValidToken = false;

    try {
        const request =  await happyPetApi.get('/validtoken', {'headers':{'Authorization': token}})

        // await happyPetApi.get('/validate-token', {'headers':{'Authorization': token}})
        if(request){
            isValidToken = true;
        }
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default AddressPage