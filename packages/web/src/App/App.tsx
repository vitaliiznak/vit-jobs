import React from "react"

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from "apollo-link-context"
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from "react-apollo"

import RouterMain from "./RouterMain"
// import * as serviceWorker from "./serviceWorker"

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})
const AUTH_TOKEN = ""
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <RouterMain />
    </ApolloProvider>
  )
}

export default App
