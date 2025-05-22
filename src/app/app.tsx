import '@radix-ui/themes/styles.css'

import { createElement, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { auth } from '~/app/auth'
import { RouteControllerAdapterLayout } from '~/app/layout'
import { bussinessRoutes, history, publicRoutes } from '~/app/route'
import { Controller as RouteController } from '~/app/route'
import { processingDataApi } from '~/entities/workshop'
import { QueryClientProvider, QueryDevtools, queryClient } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import { NotificationToastList } from '~/shared/toast'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { map } from '~/utils/dictionary'

import { ConfirmDialog } from './dialog'

const appRoute = {
  ...publicRoutes,
  ...map(bussinessRoutes, (route) => ({
    ...route,
    render: (...props: unknown[]) => {
      // делаем предзапрос всех важных сущностей
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        processingDataApi.factory.getDcdatabases.prefetchAndStore()
      }, [])
      return createElement(route.render, props)
    },
  })),
}

function App() {
  useSubscribeUpdate((update) => auth.on('*', update))
  useEffect(() => auth.on('logout', () => history.push(publicRoutes.login.getUrl())))

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmDialog.Container />
      <NotificationToastList />
      <ScrollArea scrollbars='vertical'>
        <RouteController context={{}} routeMap={appRoute} render={RouteControllerAdapterLayout} />
      </ScrollArea>
      {createPortal([<QueryDevtools key='0' position='bottom-right' />], document.body)}
    </QueryClientProvider>
  )
}

export default App
