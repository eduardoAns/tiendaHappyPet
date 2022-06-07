import { FC } from 'react'
import { Grid } from '@mui/material'
import { IProduct, IProductprueba } from '../../interfaces'
import { ProductCard } from '.'

interface Props {
    products: IProductprueba[];
}

export const ProductList: FC<Props> = ({ products }) => {

  return (
    <Grid container spacing={4}>
        {
            products.map( product => (
                <ProductCard 
                    key={ product.id }
                    product={ product }
                />
            ))
        }
    </Grid>
  )
}

