import './layout/ui/reset/reset.css'

import '@radix-ui/themes/styles.css'

import { createPortal } from 'react-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { RouteControllerAdapterLayout } from '~/app/layout'
import { routes } from '~/app/route'
import { Controller as RouteController, Provider as RouteProvider } from '~/app/route'
import { QueryClientProvider, QueryDevtools, queryClient } from '~/shared/query'
import Theme from '~/shared/theme'
import { NotificationToastList } from '~/shared/toast'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Theme>
            <NotificationToastList />
            <RouteController context={{}} routeMap={routes} render={RouteControllerAdapterLayout} />
            {createPortal([<QueryDevtools key='0' position='bottom-right' />], document.body)}
          </Theme>
        </QueryParamProvider>
      </RouteProvider>
    </QueryClientProvider>
  )
}

export default App
