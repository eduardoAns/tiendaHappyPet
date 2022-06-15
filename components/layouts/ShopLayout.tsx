import { FC } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />
            
            
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </Head> 

        

        <nav>
            <Navbar />
        </nav>

        <SideMenu />

        <main style={{
            // backgroundImage:"url('https://media.istockphoto.com/vectors/paw-print-cat-dog-puppy-pet-trace-flat-style-stock-vector-vector-id1214700549')",
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
        </footer>

    </>
  )
}


