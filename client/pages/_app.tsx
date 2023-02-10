/* eslint-disable react/no-children-prop */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dotenv from 'dotenv'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import CartProvider from '@store/Cart'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'
import { apiURL } from '@utils/getBaseURL'

const queryClient = new QueryClient()
const apolloClient = new ApolloClient({
  uri: `${apiURL}/graphql`,
  cache: new InMemoryCache(),
})

dotenv.config()
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
