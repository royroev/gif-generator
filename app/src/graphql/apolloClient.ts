import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'

const apolloClient = new ApolloClient({
    link: ApolloLink.from([new HttpLink({ uri: 'http://localhost:8080/v1/graphql' })]),
    cache: new InMemoryCache(),
    connectToDevTools: import.meta.env.MODE === 'development',
})

export default apolloClient
