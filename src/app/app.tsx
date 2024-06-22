import '@radix-ui/themes/styles.css'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RouterProvider } from 'react-router5'
import { router } from '../shared/router'
import RootRoutes from './root-routes'
import { queryClient } from '~/shared/react-query'
import Theme from '~/ui/theme'

function App() {
  return (
    <RouterProvider router={router}>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <RootRoutes />
          {createPortal([<ReactQueryDevtools key='0' position='bottom-right' />], document.body)}
        </Theme>
      </QueryClientProvider>
    </RouterProvider>
  )
}

export default App
