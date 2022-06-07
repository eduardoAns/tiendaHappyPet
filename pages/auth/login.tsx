import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { happyPetApi } from '../../api';
import axios from 'axios';
import { ErrorOutline } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context';

type FormData = {
    correo:string;
    password:string;
}


const LoginPage = () => {
    

const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();    
const [showError, setShowError] = useState(false)
const router = useRouter();
const { loginUser } = useContext( AuthContext );

// const login = async ({correo, password}:FormData) => {
    
//     setShowError(false)

//     try {
//         const {data} = await happyPetApi.post('/user/login',{correo, password})
//         const {token, user} = data;
//         console.log({token, user})

//     } catch (error) {
//         console.log('error en las credenciales')
//         setShowError(true);
//         setTimeout(() => {setShowError(false)}, 3000);
//     }



//     router.replace('/');
// }

const onLoginUser = async( { correo, password }: FormData ) => {

    setShowError(false);
    console.log(correo, password)

    const isValidLogin = await loginUser( correo, password );
    console.log(isValidLogin)
    if ( !isValidLogin ) {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
    }



    // Todo: navegar a la pantalla que el usuario estaba
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);

}

  return (
    <AuthLayout title={'Ingresar'}>
 
    <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                    <Chip 
                        label="No reconocemos este usuario / contraseña"
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
                            minLength:{value:4, message:'minimo 4 caracteres'}
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
                    <NextLink 
                        href={ router.query.p ? `/auth/register?p=${ router.query.p }`: '/auth/register' } 
                        passHref>
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