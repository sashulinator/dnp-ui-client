import { lazy } from 'react'
import { type Route } from '../lib/route'
import Main from '../pages/main'
import NormalizationConfigs from '~/pages/normalization-configs'
import NormalizationConfigsArchive from '~/pages/normalization-configs-archive'
import NormalizationConfigs_name from '~/pages/normalization-configs/name'
import Processes from '~/pages/processes'
import StoreConfigs from '~/pages/store-config'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../pages/storybook/index'))

export const routes = {
  main: {
    path: '/',
    getURL: (): string => '/',
    renderMain: Main,
    getName: (): string => 'main',
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  normalizationConfigs: {
    path: '/normalization-configs',
    getURL: (): string => '/normalization-configs',
    renderMain: NormalizationConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Конфигурации нормализации',
    navigatable: true,
  },

  normalizationConfigs_name: {
    path: '/normalization-configs/:name',
    getURL: (name: string): string => `/normalization-configs/${name}`,
    renderMain: NormalizationConfigs_name,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Конфигурация нормализации',
    navigatable: true,
  },

  processes: {
    path: '/processes',
    getURL: (): string => '/processes',
    renderMain: Processes,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Процессы',
    navigatable: true,
  },

  normalizationConfigsArchive: {
    path: '/configs-archive',
    getURL: (): string => '/configs-archive',
    renderMain: NormalizationConfigsArchive,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Архив конфигураций',
    navigatable: true,
  },

  storeConfigs: {
    path: '/store-configs',
    getURL: (): string => '/store-configs',
    renderMain: StoreConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Конфигурации хранилищ',
    navigatable: true,
  },

  storybook: {
    path: '/storybook',
    getURL: (): string => '/storybook',
    renderMain: Storybook as unknown as () => JSX.Element,
    getName: (): string => 'storybook',
    navigatable: false,
  },

  notFound: {
    path: '/not-found',
    getURL: (): string => '/not-found',
    renderMain: () => 'Not Found',
    getName: () => 'not found',
    navigatable: false,
  },
} satisfies Record<string, Route>
