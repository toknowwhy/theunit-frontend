'use client'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

export default function DiscoverProvider({
    subgraphUrl,
    children
} : {
    subgraphUrl: string,
    children: ReactNode
}) {

    const client = new ApolloClient({
        uri: subgraphUrl,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}