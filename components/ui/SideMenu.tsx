import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext, UiContext } from "../../context";


export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const { user, isLoggedIn, logout} = useContext(  AuthContext );
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    
    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toggleSideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={searchTerm}
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>


                {
                    isLoggedIn && (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>
                    )
                }


                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/toys')}
                >
                    
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'juguetes'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/accesories')}
                    >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'accesorios'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/cosmetics')}
                    >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'cosmeticos'} />
                </ListItem>


                {
                    isLoggedIn 
                    ? (
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                    )
                    : (
                        <ListItem 
                            button
                            onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                }


                {/* Admin */}

                {
                    user?.rol == 'administrador' && (
                        <>
                            <Divider />
                            <ListSubheader>Panel de administracion</ListSubheader>


                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>

                            <ListItem
                                button
                                onClick={ () => navigateTo(`/admin/users`) }
                                >
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>        
                        </>
                    )
                }
                
            </List>
        </Box>
    </Drawer>
  )
}