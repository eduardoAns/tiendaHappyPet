import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { info } from 'console';
import { useContext, useState } from 'react';
import { UiContext } from '../../context';

export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }


    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>HappyPet |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Tienda</Typography>
                    </Link>  
                </NextLink>

                <Box flex={ 1 } />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn">                    
                    <NextLink href='/category/toys' passHref>
                        <Link>
                            <Button color={asPath === '/category/toys'?'primary':'info'}>juguetes</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/accesories' passHref>
                        <Link>
                            <Button color={asPath === '/category/accesories'?'primary':'info'}>Accesorios</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/cosmetics' passHref>
                        <Link>
                            <Button color={asPath === '/category/cosmetics'?'primary':'info'}>Cosmetica</Button>
                        </Link>
                    </NextLink>
                </Box>


                <Box flex={ 1 } />

{/* Pantallas pantallas grandes */}
                {
                    isSearchVisible 
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                    : 
                    (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }

                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ 2 } color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>


                <Button onClick={toggleSideMenu}>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
