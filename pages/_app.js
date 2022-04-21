import Head from 'next/head';

import { NotificationContextProvider } from '../store/NotificationContext';
import InternalLayout from '../components/layouts/internal/InternalLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <InternalLayout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </InternalLayout>
    </NotificationContextProvider>
  );
}

export default MyApp;
