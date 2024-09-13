import '@radix-ui/themes/styles.css'

import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '~/old-shared/react-query'
import { RootLayout } from '~/shared/layout'
import Theme from '~/shared/theme'
import { NotificationToastList } from '~/shared/toast'

import RootRoutes from './root-routes'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <NotificationToastList />
        <RootRoutes renderLayout={RootLayout} />
        {createPortal([<ReactQueryDevtools key='0' position='bottom-right' />], document.body)}
      </Theme>
    </QueryClientProvider>
  )
}

export default App
