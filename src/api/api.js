import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

export const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
});


export const inicial = async () => {
    
    client.query({
        query: gql`
        query {
            lista {
                celular
                codigo
            }
        }`
    }).then(res => console.log(res))
}