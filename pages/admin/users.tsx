import { useState, useEffect } from 'react';
import { PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import { IUser } from '../../interfaces';
import { happyPetApiPrueba } from '../../api';




const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('https://happypet.herokuapp.com/api/usuario');
    const [ users, setUsers ] = useState<IUser[]>([]);


    useEffect(() => {
      if (data) {
          setUsers(data);
      }
    }, [data])

    console.log(data)
    

    if ( !data && !error ) return (<></>);

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

export default UsersPage