import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  // ------------------
  // 今は、SameSiteはSet-Cookieヘッダの属性で「Lax」を設定すれば CSRF 対策ができるらしいので無効化した
  // ------------------
  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get(
  //       `${process.env.API_URL}/auth/csrf`
  //     )
  //     axios.defaults.headers.common['csrf-token'] = data.csrfToken
  //   }
  //   getCsrfToken()
  // }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
