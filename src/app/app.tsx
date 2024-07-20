import '@radix-ui/themes/styles.css'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import RootRoutes from './root-routes'
import { queryClient } from '~/shared/react-query'
import { RootLayout } from '~/ui/layout'
import Theme from '~/ui/theme'
import { NotificationToastList } from '~/ui/toast'

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
