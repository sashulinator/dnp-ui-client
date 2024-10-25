import { createElement, useCallback } from 'react'

import { type AppRoute } from '~dnp/app/route'

import RootLayout from '../../layout'

export type Props = Parameters<AppRoute['render']>[0]

Component.displayName = 'layout-RouteControllerAdapter'

export default function Component(props: Props): JSX.Element {
  const render = useCallback(
    () => createElement(props.route.render, { route: props.route, context: props.context }),
    [props.route.render],
  )

  return (
    <RootLayout
      renderMain={render}
      renderHeader={props.route.payload.renderHeader}
      renderNav={props.route.payload.renderNav}
    />
  )
}
