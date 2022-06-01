import { FC } from 'react';
import { Box, Button, } from '@mui/material';
import { ISize } from '../../interfaces';


interface Props {
    selectedSize?: ISize;
    sizes: string;
}


export const SizeSelector: FC<Props> = ({selectedSize, sizes}) => {
  return (
    <Box>
        {
          
                <Button
                    size='small'
                    color='secondary'
                    variant='outlined'
                >
                    { sizes }
                </Button>
            
        }
    </Box>
  )
}
