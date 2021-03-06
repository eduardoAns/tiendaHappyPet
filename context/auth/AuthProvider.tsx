import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';

import { happyPetApi } from '../../api';
import { IUser } from '../../interfaces';
import happyPetApiPrueba from '../../api/happyPetApiPrueba';
import router from 'next/router';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    
    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {

        const Authorization= Cookies.get('token')

        if ( !Authorization ) {
            return;
        }

        try {
            const { data } = await happyPetApi.get('/validate-token', {'headers':{'Authorization': Authorization}});
            const { token, user } = data;
            Cookies.set('token', token.jwt );
            dispatch({ type: '[Auth] - Login', payload: user });
            console.log(data)
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( correo: string, password: string ): Promise<boolean> => {
        

        try {
            const { data } = await happyPetApi.post('/login', { correo, password });

            const { token, user } = data;
            Cookies.set('token', token.jwt );
            dispatch({ type: '[Auth] - Login', payload: user });
            console.log(data)
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async( dataUser:IUser ): Promise<{hasRegister:boolean; message: string; }> => {
        try {
            const { data } = await happyPetApi.post('/usuario', dataUser);
            // const { token, user } = data;
            // Cookies.set('token', token.jwt );
            // dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasRegister:true,
                message: 'Usuario creado exitosamente!'!
            }

        } catch (error) {
            return {
                hasRegister:false,
                message: 'Correo en uso, intente con otro'
            }
            // if ( axios.isAxiosError(error) ) {
            //     return {
            //         hasError: true,
            //         message: error.response?.data.message
            //     }
            // }

            // return {
            //     hasError: true,
            //     message: 'No se pudo crear el usuario - intente de nuevo'
            // }
        }
    }

    const logout = () => {

        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('city');
        Cookies.remove('phone');
        Cookies.remove('token');
        router.reload();
        
        

    }



    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )
};