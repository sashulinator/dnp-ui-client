import './layout/ui/reset/reset.css'

import '@radix-ui/themes/styles.css'

import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Provider as RouteProvider } from '~dnp/app/route'
import { globalStore } from '~dnp/shared/auth'
import { QueryClientProvider, queryClient } from '~dnp/shared/query'
import ThemeProvider from '~dnp/shared/theme'

import App from './app'

function Providers() {
  globalStore()

  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QueryParamProvider>
      </RouteProvider>
    </QueryClientProvider>
  )
}

export default Providers
