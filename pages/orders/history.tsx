import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { GetServerSideProps, NextPage } from 'next';
import { happyPetApi } from '../../api';
import { IOrder } from '../../interfaces';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid == 'Pagado'
                    ? <Chip color="success" label="Pagado" variant='outlined' />
                    : <Chip color="error" label="No pagado" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
               <NextLink href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
               </NextLink>
            )
        }
    }
];


interface Props {
    orders: IOrder[]
}


const HistoryPage : NextPage<Props> = ({ orders }) => {
  
    const rows = orders.map( (order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
        orderId: order.id
    }))
  
  
    return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    
    // const session: any = await getSession({ req });
    const { token = '' } = req.cookies;

    let isValidToken = false;
    let userId

    try {
        const {data}=await happyPetApi.get('/validtoken', {'headers':{'Authorization': token}})
        isValidToken = true;
        userId = data.id
        
    } catch (error) {
        isValidToken = false;
    }


    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    // const orders = await dbOrders.getOrdersByUser( session.user._id );
    const {data} = await happyPetApi.get(`/orden/byuser/${userId}`)
    const orders = data;
    return {
        props: {
            orders
        }
    }
}

export default HistoryPage