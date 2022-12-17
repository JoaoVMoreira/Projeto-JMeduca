import type { AppProps } from 'next/app'
import { ContextProvider } from '../contexts/contexts'
import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <ContextProvider><Component {...pageProps} /></ContextProvider>
}
