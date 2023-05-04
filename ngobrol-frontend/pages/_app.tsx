import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {CacheProvider, EmotionCache} from '@emotion/react';
import createEmotionCache from '../functions/createEmotionCache';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../functions/theme';
import {CssBaseline} from '@mui/material';
import {Provider} from 'react-redux';
import {store} from '../redux/store/store';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache,
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Ngobrol App</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
