import React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import PrivateLayout from 'layout/PrivateLayout';
import Head from 'next/head';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{pageProps.name} | Capacitations management </title>
      </Head>
      <PrivateLayout pageAuth={pageProps.auth}>
        <Component {...pageProps} />        
      </PrivateLayout>
    </SessionProvider>
  );
}

export default MyApp;
