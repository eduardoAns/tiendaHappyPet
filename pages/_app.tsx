import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { AuthProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  
  
  
  return (

    <AuthProvider>

      <ThemeProvider theme={ lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>

    </AuthProvider>
  )
}

export default MyApp
