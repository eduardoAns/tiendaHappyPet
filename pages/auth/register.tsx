import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { happyPetApi, happyPetApiPrueba } from '../../api';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IUser } from '../../interfaces';
import { AuthContext } from '../../context';
import { ErrorOutline } from '@mui/icons-material';


type dataForm = {
    nombre:string;
    apellido:string;
    correo:string;
    password:string;
}

type pruebaUsuario = {
    nombre:string,
    apellido:string,
    correo:string,
    password:string,
    fechaCreacion:string,
    rol:string
}



const RegisterPage = () => {

const router = useRouter();
const { register, handleSubmit, setError, formState: { errors } } = useForm<dataForm>();
const [showMsg, setShowMsg] = useState(false)
const { registerUser } = useContext( AuthContext );




const crearUsuario = async ({nombre,apellido,correo,password}:dataForm) => {
    
    const dataPost:pruebaUsuario = {
        nombre,
        apellido,
        correo,
        password,
        fechaCreacion:'10/10/2022',
        rol:'cliente'
    }


        // setShowError(false);
        // const isRegister = await registerUser(dataPost);

        // if ( !isRegister ) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return;
        // }


        
        // // Todo: navegar a la pantalla que el usuario estaba
        // router.replace('/');


    try {
        
        const request = await happyPetApi.post('/usuario', dataPost);
        console.log(request);
        console.log('post logrado');  
        setShowMsg(true);

        
    } catch (error) {
        console.log("error en las credenciales");
       
    }

    // const onRegisterForm = async( {  name, email, password }: FormData ) => {
        
    //     setShowError(false);
    //     const isRegister = await registerUser(name, email, password);

    //     if ( hasError ) {
    //         setShowError(true);
    //         setErrorMessage( message! );
    //         setTimeout(() => setShowError(false), 3000);
    //         return;
    //     }
        
    //     // Todo: navegar a la pantalla que el usuario estaba
    //     router.replace('/');

    // }



}

  return (
    <AuthLayout title={'Registrar'}>
        <form onSubmit={handleSubmit(crearUsuario)}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>
                <Chip 
                        label="Usuario registrado correctamente"
                        color="success"
                        className="fadeIn"
                        sx={{display: showMsg? 'flex':'none'}}
                    />
                

                <Grid item xs={12}>
                    <TextField 
                        label="Nombre" 
                        variant="filled" 
                        fullWidth
                        {...register('nombre', {
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.correo}
                        helperText={errors.correo?.message} 
                        />
                    
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Apellido" 
                        variant="filled" 
                        fullWidth 
                        {...register('apellido', {
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.correo}
                        helperText={errors.correo?.message}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Correo" 
                        type="email"
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
                        color="secondary" 
                        className='circular-btn' 
                        size='large' 
                        type="submit"
                        fullWidth>
                        Registrar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href="/auth/login" passHref>
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage