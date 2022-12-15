import type { AppProps } from 'next/app'
import { ContextProvider } from '../contexts/contexts'

export default function App({ Component, pageProps }: AppProps) {
  return <ContextProvider><Component {...pageProps} /></ContextProvider>
}
