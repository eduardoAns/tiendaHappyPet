import useSWR, { SWRConfiguration } from 'swr';
import { IProduct, IProductprueba } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProductsPrueba = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<IProductprueba[]>(`https://happypet.herokuapp.com/api${ url }`, config );

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }

}