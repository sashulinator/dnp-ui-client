import { lazy } from 'react'
import { type Route } from '../lib/route'
import Main from '../pages/main'
import StoreConfigs from '~/entities/store-config/pages'
import NormalizationConfigs from '~/pages/normalization-configs'
import NormalizationConfigs_create from '~/pages/normalization-configs/create'
import NormalizationConfigs_id from '~/pages/normalization-configs/id'
import Processes from '~/pages/processes'
import StoreConfigs_kn from '~/pages/store-configs/kn'
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
    getURL: (): string => routes.normalizationConfigs.path,
    renderMain: NormalizationConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Конфигурации нормализации',
    navigatable: true,
  },

  normalizationConfigs_create: {
    path: '/normalization-configs/create',
    getURL: (): string => routes.normalizationConfigs_create.path,
    renderMain: NormalizationConfigs_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать конфигурацию нормализации',
    navigatable: true,
  },

  normalizationConfigs_id: {
    path: '${routes.normalizationConfigs.path}/:id',
    getURL: (id: string): string => `${routes.normalizationConfigs.path}/${id}`,
    renderMain: NormalizationConfigs_id,
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

  storeConfigs: {
    path: '/store-configs',
    getURL: (): string => '/store-configs',
    renderMain: StoreConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Хранилища',
    navigatable: true,
  },

  storeConfigs_kn: {
    path: '/store-configs/:kn',
    getURL: (kn: string): string => `${routes.storeConfigs.path}/${kn}`,
    renderMain: StoreConfigs_kn,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Хранилище',
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
