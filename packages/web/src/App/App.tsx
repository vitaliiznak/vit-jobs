import React from 'react'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo'
import { createUploadLink } from 'apollo-upload-client'

import RouterMain from './RouterMain'
// import * as serviceWorker from "./serviceWorker"

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URI_BASE
})
const AUTH_TOKEN = ''
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink)
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <RouterMain />
    </ApolloProvider>
  )
}

export default App
