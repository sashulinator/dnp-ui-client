import './layout/ui/reset/reset.css'

import '@radix-ui/themes/styles.css'

import { useEffect } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Provider as RouteProvider, history, routes } from '~dnp/app/route'
import { QueryClientProvider, queryClient } from '~dnp/shared/query'
import ThemeProvider from '~dnp/shared/theme'
import { useSubscribeUpdate } from '~dnp/utils/core-hooks'

import { auth } from '../slices/auth'
import App from './app'

function Providers() {
  useSubscribeUpdate((update) => auth.on('*', update))

  useEffect(() => {
    return auth.on('logout', () => history.push(routes.login.getUrl()))
  })

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
