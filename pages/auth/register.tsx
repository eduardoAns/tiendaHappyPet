import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { happyPetApi } from '../../api';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Iusuario } from '../../interfaces';


type dataForm = {
    nombre:string;
    apellido:string;
    correo:string;
    password:string;
}



const RegisterPage = () => {

const router = useRouter();
const { register, handleSubmit, setError, formState: { errors } } = useForm<dataForm>();




const crearUsuario = async ({nombre,apellido,correo,password}:dataForm) => {
    
    const dataPost:Iusuario = {
        id:'usuario011',
        nombre,
        apellido,
        correo,
        password,
        fechaCreacion:'10/10/2022',
        rol:'cliente'
    }


    try {
        
        console.log(dataPost)
        const url='http://localhost:8080/api/usuario'
        const request = await fetch(url,{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
          },
          body:JSON.stringify(dataPost)
      });
      console.log(request);
      console.log('post logrado')  
      router.replace('/');
        
    } catch (error) {
        console.log("error en las credenciales");
       
    }

    // try {
        
    //     const res = await happyPetApi.post('/usuario', data);
    //     console.log(res)
        
    // } catch (error) {
    //     console.log("error en las credenciales");
       
    // }


}

useEffect(() => {
    setError('nombre', {
        type: "manual",
        message: "No olvides ingresar tu nombre!"
    });
  
}, [setError])

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(crearUsuario)}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>

                

                <Grid item xs={12}>
                    <TextField 
                        label="Nombre" 
                        variant="filled" 
                        fullWidth
                        {...register('nombre', { required: true })} />
                    
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Apellido" 
                        variant="filled" 
                        fullWidth 
                        {...register('apellido', { required: true })}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Correo" 
                        type="email"
                        variant="filled" 
                        fullWidth 
                        {...register('correo', { required: true })}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Contraseña" 
                        type='password' 
                        variant="filled" 
                        fullWidth 
                        {...register('password', { required: true })}/>
                </Grid>

               


                <Grid item xs={12}>
                    <Button 
                        color="secondary" 
                        className='circular-btn' 
                        size='large' 
                        type="submit"
                        fullWidth>
                        Ingresar
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