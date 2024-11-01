import './layout/ui/reset/reset.css'

import '@radix-ui/themes/styles.css'

import { useEffect } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Provider as RouteProvider, history, routes } from '~/app/route'
import { auth } from '~/shared/auth'
import { QueryClientProvider, queryClient } from '~/shared/query'
import ThemeProvider from '~/shared/theme'
import { useSubscribeUpdate } from '~/utils/core-hooks'

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
