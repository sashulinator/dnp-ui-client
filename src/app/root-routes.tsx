import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { type Route as LibRoute } from '~/lib/route'

import { routes } from '~/shared/routes'

RootRoutes.displayName = 'app-Routes'

export interface Props {
  className?: string
  renderLayout: (props: { route: LibRoute }) => JSX.Element | null
}

export default function RootRoutes(props: Props): JSX.Element {
  const Layout = props.renderLayout

  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(routes).map(([key, route]) => (
          <Route key={key} {...route} element={React.createElement(Layout, { route })} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
