import { Suspense, lazy } from 'react'

import NotFound from '~/pages/not-found'
import { LoginPage } from '~/shared/auth'
import Header from '~/shared/header'
import Nav from '~/shared/nav'

import { type Route } from './route'

const Storybook = lazy(() => import('~/pages/storybook/index'))
const StorybookNav = lazy(() => import('~/shared/storybook/widgets/nav'))

export const publicRoutes = {
  login: {
    getName: () => 'Login',
    getPath: () => '/login',
    getUrl() {
      return this.getPath()
    },
    payload: {},
    render: LoginPage,
  },

  storybook: {
    getName: () => 'Storybook',
    getPath: () => '/storybook/:name',
    getUrl() {
      return this.getPath()
    },
    payload: {
      renderNav: () => (
        <Suspense fallback=''>
          <StorybookNav />
        </Suspense>
      ),
    },
    render: () => (
      <Suspense fallback='loading...'>
        <Storybook />
      </Suspense>
    ),
  },

  notFound: {
    getName: () => 'Not found',
    getPath: () => '/*',
    getUrl() {
      return this.getPath()
    },
    render: NotFound,
    payload: {
      navigatable: false,
      renderHeader: Header,
      renderNav: Nav,
    },
  },
} satisfies Record<string, Route>
