import { lazy } from 'react'
import { type Route } from '../lib/route'
import Main from '../pages/main'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../pages/storybook/index'))

export const routes = {
  main: {
    path: '/',
    renderMain: Main,
    getName: (): string => 'main',
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  storybook: {
    path: '/storybook',
    renderMain: Storybook as unknown as () => JSX.Element,
    getName: (): string => 'storybook',
    navigatable: false,
  },

  notFound: {
    path: '/not-found',
    renderMain: () => 'Not Found',
    getName: () => 'not found',
    navigatable: false,
  },
} satisfies Record<string, Route>
