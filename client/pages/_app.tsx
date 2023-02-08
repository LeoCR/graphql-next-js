import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import CartProvider from '@store/Cart'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default MyApp
