import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { happyPetApi } from '../../api';
import axios from 'axios';
import { ErrorOutline } from '@mui/icons-material';
import { useState } from 'react';

type FormData = {
    correo:string;
    password:string;
}


const LoginPage = () => {
    

const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();    
const [showError, setShowError] = useState(false)
const router = useRouter();

const login = async ({correo, password}:FormData) => {
    
    setShowError(false)

    try {
        const {data} = await happyPetApi.post('/user/login',{correo, password})
        const {token, user} = data;
        console.log({token, user})

    } catch (error) {
        console.log('error en las credenciales')
        setShowError(true);
        setTimeout(() => {setShowError(false)}, 3000);
    }



    // router.replace('/');
}

  return (
    <AuthLayout title={'Ingresar'}>
 
    <form onSubmit={handleSubmit(login)}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                    <Chip 
                        label="No reconocemos este usuario / coontraseña"
                        color="error"
                        icon={<ErrorOutline />}
                        className="fadeIn"
                        sx={{display: showError? 'flex':'none'}}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        label="Correo" 
                        variant="filled" 
                        fullWidth 
                        {...register('correo', {
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.correo}
                        helperText={errors.correo?.message}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Contraseña" 
                        type='password' 
                        variant="filled" 
                        fullWidth 
                        {...register('password',{
                            required:'Este campo es requerido',
                            minLength:{value:6, message:'minimo 6 caracteres'}
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        />
                </Grid>

                <Grid item xs={12}>
                    <Button  
                        type='submit'
                        color="secondary" 
                        className='circular-btn' 
                        size='large' 
                        fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href="/auth/register" passHref>
                        <Link underline='always'>
                            ¿No tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </form>
    </AuthLayout>
  )
}

export default LoginPage