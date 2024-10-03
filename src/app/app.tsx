import '@radix-ui/themes/styles.css'

import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { RootLayout } from '~/shared/layout'
import { queryClient } from '~/shared/react-query'
import { routeMap } from '~/shared/route'
import Theme from '~/shared/theme'
import { NotificationToastList } from '~/shared/toast'

import { RootRoutes } from '../shared/route'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Theme>
            <NotificationToastList />
            <RootRoutes routeMap={routeMap} renderLayout={RootLayout} />
            {createPortal([<ReactQueryDevtools key='0' position='bottom-right' />], document.body)}
          </Theme>
        </QueryParamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
