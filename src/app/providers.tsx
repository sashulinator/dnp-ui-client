import './layout/ui/reset/reset.css'

import '@radix-ui/themes/styles.css'

import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Provider as RouteProvider } from '~/app/route'
import { QueryClientProvider, queryClient } from '~/shared/query'
import Theme from '~/shared/theme'

import App from './app'

function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Theme>
            <App />
          </Theme>
        </QueryParamProvider>
      </RouteProvider>
    </QueryClientProvider>
  )
}

export default Providers
