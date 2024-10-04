import './layout/ui/reset/reset.css'

import '@radix-ui/themes/styles.css'

import { createElement, useRef } from 'react'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { RootLayout } from '~/app/layout'
import { type AppRoute, routes } from '~/app/route'
import { queryClient } from '~/shared/react-query'
import { Controller as RouteController, Provider as RouteProvider } from '~/shared/route'
import Theme from '~/shared/theme'
import { NotificationToastList } from '~/shared/toast'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Theme>
            <NotificationToastList />
            <RouteController context={{}} routeMap={routes} render={_RootLayout} />
            {createPortal([<ReactQueryDevtools key='0' position='bottom-right' />], document.body)}
          </Theme>
        </QueryParamProvider>
      </RouteProvider>
    </QueryClientProvider>
  )
}

export default App

/**
 * private
 */

function _RootLayout(props: Parameters<AppRoute['render']>[0]): JSX.Element {
  const render = useRef(() => createElement(props.route.render, { route: props.route, context: props.context }))

  return (
    <RootLayout
      renderMain={render.current}
      renderHeader={props.route.payload.renderHeader}
      renderNav={props.route.payload.renderNav}
    />
  )
}
