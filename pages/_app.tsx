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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
    }),
  ]),
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <Head>
        <title>{pageProps.name} | Capacitations management </title>
      </Head>
      <PrivateLayout pageAuth={pageProps.auth}>
        <Component {...pageProps} />
      </PrivateLayout>
    </ApolloProvider>
  </SessionProvider>
);

export default MyApp;
