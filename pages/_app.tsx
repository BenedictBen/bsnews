import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title key="title">News App</title>
        <meta name="description" content="News App made with Next Js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.jpg" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
