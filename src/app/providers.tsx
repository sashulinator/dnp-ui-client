import './layout/reset/reset.css'

import '@radix-ui/themes/styles.css'

import type { ReactNode } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Provider as RouteProvider } from '~/app/route'
import { QueryClientProvider, queryClient } from '~/shared/query'
import ThemeProvider from '~/shared/theme'

function Providers(props: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ThemeProvider>{props.children}</ThemeProvider>
        </QueryParamProvider>
      </RouteProvider>
    </QueryClientProvider>
  )
}

export default Providers
