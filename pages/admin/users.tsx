import { useState, useEffect, useContext } from 'react';
import { PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, Typography } from '@mui/material';

import { AdminLayout, ShopLayout } from '../../components/layouts'
import { IUser } from '../../interfaces';
import { happyPetApi, happyPetApiPrueba } from '../../api';
import { AuthContext } from '../../context';
import { GetServerSideProps } from 'next';




const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('https://happypet.herokuapp.com/api/usuario');
    const [ users, setUsers ] = useState<IUser[]>([]);
    // const {user} = useContext(AuthContext);



    useEffect(() => {
      if (data) {
          setUsers(data);
      }
    }, [data])

    console.log(data)
    

    // if ( user?.rol != "administrador") return (<>
    // <ShopLayout title='Pagina no encontrada' pageDescription='No hay nada que mostrar aquí'>
    //     <Box 
    //         display='flex' 
    //         justifyContent='center' 
    //         alignItems='center' 
    //         height='calc(100vh - 200px)'
    //         sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
    //     >
    //         <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
    //         <Typography marginLeft={2}>No encontramos ninguna página aquí</Typography>
    //     </Box>
    // </ShopLayout>
    
    // </>)


    const onRoleUpdated = async( userId: number, newRole: string ) => {

        const previosUsers = users.map( user => ({ ...user }));
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId == user.id ? newRole : user.rol
        }));

        setUsers(updatedUsers);

        try {
            
            await happyPetApiPrueba.put('/usuario', {  userId, role: newRole });

        } catch (error) {
            setUsers( previosUsers );
            console.log(error);
            alert('No se pudo actualizar el role del usuario');
        }

    }


    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre ', width: 300 },
        { field: 'apellido', headerName: ' apellido', width: 300 },

        {
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) => {
                return (
                    <Select
                        value={ row.role }
                        label="Rol"
                        onChange={ ({ target }) => onRoleUpdated( row.id, target.value ) }
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='administrador'> administrador </MenuItem>
                        <MenuItem value='cliente'> cliente </MenuItem>
                    </Select>
                )
            }
        },
    ];

    const rows = users.map( user => ({
        id: user.id,
        email: user.correo,
        name: user.nombre,
        role: user.rol,
        apellido:user.apellido
    }))


  return (
    <AdminLayout 
        title={'Usuarios'} 
        subTitle={'Mantenimiento de usuarios'}
        icon={ <PeopleOutline /> }
    >


        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>


    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

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
                destination: '/auth/login?p=/admin/users',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default UsersPage