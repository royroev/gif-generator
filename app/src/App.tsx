import React, { Suspense } from 'react'

import { ApolloProvider } from '@apollo/client'
import { Provider as ReduxProvider } from 'react-redux'

import ErrorBoundary from './components/ErrorBoundary'
import client from './graphql/apolloClient'
import store from './store'

const Gifs = React.lazy(() => import('./features/gifs'))

function App() {
    return (
        <ReduxProvider store={store}>
            <ApolloProvider client={client}>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Gifs />
                    </Suspense>
                </ErrorBoundary>
            </ApolloProvider>
        </ReduxProvider>
    )
}

export default App
