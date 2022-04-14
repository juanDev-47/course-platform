import React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import PrivateLayout from 'layout/PrivateLayout';
import Head from 'next/head';
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { WidgetLoader } from 'react-cloudinary-upload-widget';
import { User } from 'interfaces';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: 'https://course-platform-red.vercel.app/api/graphql',
    }),
  ]),
});

declare module 'next-auth' {
  interface Session {
    user: User;
    userId: string;
  }
}

type CustomAppProps = AppProps & {
  pageProps: {
    session: {
      user: User;
    };
  };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => (
  <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <WidgetLoader />
      <Head>
        <title>{pageProps.name} | Capacitations management </title>
      </Head>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <PrivateLayout pageAuth={pageProps.auth} className='h-screen'>
        <Component {...pageProps} />
      </PrivateLayout>
    </ApolloProvider>
  </SessionProvider>
);

export default MyApp;
