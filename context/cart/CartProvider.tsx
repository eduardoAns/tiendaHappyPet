import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct, IOrder, IUser, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { happyPetApi } from '../../api';

export interface CartState {
    isLoaded:boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress;

}



const CART_INITIAL_STATE: CartState = {
    isLoaded:false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined

}


export const CartProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    // Efecto
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);

    useEffect(() => {

        if ( Cookie.get('firstName')){
            const shippingAddress = {
                firstName : Cookie.get('firstName') || '',
                lastName  : Cookie.get('lastName') || '',
                address   : Cookie.get('address') || '',
                address2  : Cookie.get('address2') || '',
                city      : Cookie.get('city') || '',
                phone     : Cookie.get('phone') || '',
            }
            
            dispatch({ type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])

    
    useEffect(() => {
      Cookie.set('cart', JSON.stringify( state.cart ));
    }, [state.cart]);


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        const total = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    
        const orderSummary = {
            numberOfItems,
            total, //total 
            tax: total - (total/(taxRate + 1)), //precio del iva = total - (total/1.19)
            subTotal: total/( taxRate + 1 ) //subtotal = total/1.19
        }
        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);



    const addProductToCart = ( product: ICartProduct ) => {
        //! Nivel 1
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        //! Nivel 2
        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

        //! Nivel Final
        //.some entrega un boolean
        const productInCart = state.cart.some( p => p.id === product.id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // const productInCartButDifferentSize = state.cart.some( p => p.id === product.id && p.size === product.size );
        // if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        //en este punto, el producto se asegura que si existe
        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p.id !== product.id ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('firstName',address.firstName);
        Cookie.set('lastName',address.lastName);
        Cookie.set('address',address.address);
        Cookie.set('address2',address.address2 || '');
        Cookie.set('city',address.city);
        Cookie.set('phone',address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }

    const createOrder = async(user:string):Promise<{hasError:boolean; message: string; }> => {

        if ( !state.shippingAddress ) {
            throw new Error('No hay direcci??n de entrega');
        }

        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const {data} = await happyPetApi.get(`usuario/${user}`)
        const userId:IUser = data
        const body: IOrder = {
            user:userId,
            orderItems: state.cart.map( p => ({
                ...p,
                id:undefined,
                idproducto:p.id!,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: "Pendiente",
            paidAt:hoy.toDateString(),
            idPaypal:"idprueba",
            
        }

        console.log(body);


        try {
            
            const {data} = await happyPetApi.post('/orden', body);
            
            console.log(data);

            dispatch({ type: '[Cart] - Order complete' });
            return {
                hasError:false,
                message: data.toString()
            }


        } catch (error) {
            // if ( axios.isAxiosError(error) ) {
            //     return {
            //         hasError: true,
            //         message: error.response?.data.message
            //     }
            // }
            return {
                hasError: true,
                message : 'error al guardar la orden'
            }
        }

    }


    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress,
            // Orders
            createOrder,
        }}>
            { children }
        </CartContext.Provider>
    )
};