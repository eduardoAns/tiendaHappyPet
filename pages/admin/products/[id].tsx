import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Link, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts'
import { Iimage, IProduct, IProductprueba } from '../../../interfaces';
// import { dbProducts } from '../../../database';
import { happyPetApi } from '../../../api';
import NextLink from 'next/link';


const validTypes  = ['Juguetes','Cosmetica','Accesorios']
const validGender = ['M','F','U']
const validSizes = ['XS','S','M','L','XL']


interface FormData {
    id?: number;
    description: string;
    images: Iimage[];
    inStock: number;
    price: number;
    sizes: string;
    tags: string;
    title: string;
    type: string;
    gender: string;
    date:string;
    status:string
}


interface Props {
    product: IProductprueba;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })


    // useEffect(() => {
    //   const subscription = watch(( value, { name, type } ) => {
    //       if ( name === 'title' ) {
    //           const newSlug = value.title?.trim()
    //                 .replaceAll(' ', '_')
    //                 .replaceAll("'", '')
    //                 .toLocaleLowerCase() || '';

    //            setValue('slug', newSlug);
    //       }
    //   });
    //   return () => subscription.unsubscribe();
    // }, [watch, setValue])
    


    const onFilesSelected = async({ target }: ChangeEvent<HTMLInputElement>) => {
        if ( !target.files || target.files.length === 0 ) {
            return;
        }

        console.log(target.files)
        try {
            
            // console.log( file );
            for( const file of target.files ) {
                const formData = new FormData();
                console.log(file)
                formData.append('multipartFile', file);
                const { data } = await happyPetApi.post('/producto/cloud/upload', formData);
                console.log(data)
                const imageInfo:Iimage ={
                    public_id:data.public_id,
                    src:data.secure_url,
                }
                setValue(`images`, [...getValues('images'), imageInfo], { shouldValidate: true });
            }


        } catch (error) {
            console.log({ error });
        }
    }

    const onDeleteImage = async ( image: Iimage) =>{


        setValue(
            'images', 
            getValues('images').filter( ({src}) => src !== image.src ),
            { shouldValidate: true }
        );

        await happyPetApi.delete(`/producto/cloud/delete/${image.public_id}`);

    }

    // const onDeleteImage = ( image: string) =>{
    //     setValue(
    //         'images', 
    //         getValues('images').filter( ({src}) => src !== image ),
    //         { shouldValidate: true }
    //     );
    // }

    


    const onSubmit = async( form: FormData ) => {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        
        if ( form.images.length < 2 ) return alert('Mínimo 2 imagenes');
        setIsSaving(true);
        form.date = hoy.toDateString();
        form.status="Activo";
        
        
        
        
        
    
        console.log(form)

        try {
            const { data } = await happyPetApi({
                url: '/producto',
                method: form.id ? 'PUT': 'POST',  // si tenemos un id, entonces actualizar, si no crear
                data: form
            });
            router.replace('/admin/products/');

            
            // if ( !form.id ) {
            //     router.replace(`/admin/products`);
            // } else {
            //     setIsSaving(false)
            // }


        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={product.title==='' ? 'Nuevo producto':`Editando: ${ product.title }`}
            // subTitle={`Editando: Hueso corestore`}
            icon={ <DriveFileRenameOutline /> }
        >
            <NextLink href='/admin/products' passHref>
                <Link>
                    <Button color='secondary'>Volver</Button>
                </Link>
            </NextLink>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="stock"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                setValueAs: v => parseInt(v),
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                setValueAs: v => parseInt(v),
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({ target })=> setValue('gender', target.value, { shouldValidate: true }) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Categoria</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ ({ target })=> setValue('type', target.value, { shouldValidate: true }) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                       {
                        (getValues('type') !== "Juguetes" 
                        && 
                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                                <RadioGroup
                                    row
                                    value={ getValues('sizes') }
                                    onChange={ ({ target })=> setValue('sizes', target.value, { shouldValidate: true }) }
                                >

                                {
                                    validSizes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />

                                    ))
                                }
                                </RadioGroup>
 
                        </FormGroup>   
                        
                        
                        )

                       }
                        

                        


                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Marca"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('tags', {
                                required: 'Este campo es requerido',
                                // validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco':undefined
                            })}
                            error={ !!errors.tags }
                            helperText={ errors.tags?.message }
                        />

                        

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={ fileInputRef }
                                type="file"
                                multiple
                                accept='image/jpg, image/gif, image/jpeg'
                                style={{ display: 'none' }}
                                onChange={ onFilesSelected }
                            />


                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( (image) => (
                                        <Grid item xs={4} sm={3} key={image.src}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ image.src }
                                                    alt={ image.src }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={()=> onDeleteImage(image)}
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req,query }) => {
    
    const { id = '' } = query as { id: string };

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
                destination: `/auth/login?p=/admin/products/${id}`,
                permanent: false,
            }
        }
    }

    let product: IProductprueba | null;
    if ( id === 'new' ) {
        // crear un producto
        const tempProduct: IProductprueba = {
            description: "",
            images: [],
            inStock: 0,
            price: 0,
            sizes: "",
            tags: "",
            title: "",
            type: "",
            gender: "",
            date:"",
            status:"",
        }

        product = tempProduct
    

    } else {
        const {data} = await happyPetApi.get(`/producto/ ${parseInt(id)}`);

        product = data    
    }





    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage