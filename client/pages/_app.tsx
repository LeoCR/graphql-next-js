/* eslint-disable react/no-children-prop */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dotenv from 'dotenv'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import CartProvider from '@store/Cart'
import AuthProvider from '@store/Auth'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'
import { apolloClient } from 'service/client'

const queryClient = new QueryClient()

dotenv.config()
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
