import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import { Iimage } from '../../interfaces';
import styles from './ProductSlideshow.module.css';

interface Props {
    images: Iimage[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide
        easing="ease"
        duration={ 7000 }
        indicators
    >
        {
            images.map( image =>  {
                const url = image.src;
                return (
                    <div className={ styles['each-slide'] } key={ image.public_id }>
                        <div style={{
                            backgroundImage: `url(${ url })`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                    </div>
                )

            })
        }

    </Slide>
  )
}
