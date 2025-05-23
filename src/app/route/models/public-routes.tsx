import { Suspense, lazy } from 'react'

import Header from '~/app/layout/header'
import Nav from '~/app/layout/nav'
import NotFound from '~/pages/not-found'
import { LoginPage } from '~/slices/auth'

import { type Route } from './route'

const Storybook = lazy(() => import('~/pages/storybook'))
const StorybookNavLazy = lazy(() => import('~/shared/storybook/nav'))

function StorybookNav() {
  return (
    <Suspense fallback=''>
      <StorybookNavLazy />
    </Suspense>
  )
}

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
      return '/storybook'
    },
    payload: {
      renderNav: StorybookNav,
    },
    render: () => (
      <Suspense fallback='loading...'>
        <Storybook />
      </Suspense>
    ),
  },

  storybookStory: {
    getName: () => 'Storybook',
    getPath: () => '/storybook/:name',
    getUrl() {
      return this.getPath()
    },
    payload: {
      renderNav: StorybookNav,
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
