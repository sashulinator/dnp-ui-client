import { Suspense, lazy } from 'react'

import NotFound from '~/pages/not-found'
import { LoginPage } from '~/shared/auth'

import { type Route } from './route'

const Storybook = lazy(() => import('../../../pages/storybook/index'))

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
    getPath: () => '/storybook',
    getUrl() {
      return this.getPath()
    },
    payload: {},
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
    payload: {},
    render: NotFound,
  },
} satisfies Record<string, Route>
