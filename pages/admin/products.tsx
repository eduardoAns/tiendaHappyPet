import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


import { AdminLayout } from '../../components/layouts'
import { IProduct, IProductprueba  } from '../../interfaces';
import useSWR from 'swr';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { happyPetApi, happyPetApiPrueba } from '../../api';
import { GetServerSideProps } from 'next';


const columns:GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Foto',
        renderCell: ({ row }: GridValueGetterParams ) => {
            return (
                <a href={ `/product/${ row.id }` } target="_blank" rel="noreferrer">
                    <CardMedia 
                        component='img'
                        alt={ row.title }
                        className='fadeIn'
                        image={ row.img }
                    />
                </a>
            )
        }
    },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <NextLink href={`/admin/products/${ row.id }`} passHref>
                    <Link underline='always'>
                        { row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Stock' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },

];



const ProductsPage = () => {

    const { data, error } = useSWR<IProductprueba[]>('https://happypet.herokuapp.com/api/producto');


    if ( !data && !error ) return (<></>);

    
    const rows = data!.map( product => ({
        id: product.id,
        img: `/products/${ product.images[1].src}`, 
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes,
    }));


  return (
    <AdminLayout 
        // title={`Productos`} 
        title={`Productos (${ data?.length })`} 
        subTitle={'Mantenimiento de productos'}
        icon={ <CategoryOutlined /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
                href="/admin/products/new"
            >
                Crear producto
            </Button>
        </Box>

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
        console.log(rol)

        if(rol == 'administrador'){
            isValidToken = true;
        }
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/admin/products',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default ProductsPage;