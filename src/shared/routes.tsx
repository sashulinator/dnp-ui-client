import { BarChartIcon, LapTimerIcon, LayersIcon, StarIcon, TargetIcon } from '@radix-ui/react-icons'
import { Suspense, lazy } from 'react'
import { type Route } from '../lib/route'
import Main from '../pages/main'
import NormalizationConfigs from '~/pages/normalization-configs'
import NormalizationConfigs_create from '~/pages/normalization-configs/create'
import NormalizationConfigs_id from '~/pages/normalization-configs/id'
import Processes from '~/pages/processes'
import StoreConfigs from '~/pages/store-configs'
import StoreConfigs_create from '~/pages/store-configs/create'
import StoreConfigs_kn from '~/pages/store-configs/kn'
import TargetTable from '~/pages/target-table'
import Header from '~/ui/header'
import Nav from '~/ui/nav'
import { isDev } from '~/utils/core'

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
    getName: (): string => 'Нормализации',
    navigatable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderIcon: BarChartIcon as any,
  },

  normalizationConfigs_create: {
    path: '/normalization-configs/create',
    getURL: (): string => routes.normalizationConfigs_create.path,
    renderMain: NormalizationConfigs_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать Нормализацию',
    navigatable: false,
  },

  normalizationConfigs_id: {
    path: '/normalization-configs/:id',
    getURL: (id: string): string => `${routes.normalizationConfigs.path}/${id}`,
    renderMain: NormalizationConfigs_id,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Нормализации',
    navigatable: false,
  },

  processes: {
    path: '/processes',
    getURL: (): string => '/processes',
    renderMain: Processes,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Процессы',
    navigatable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderIcon: LapTimerIcon as any,
  },

  storeConfigs: {
    path: '/store-configs',
    getURL: (): string => '/store-configs',
    renderMain: StoreConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Хранилища',
    navigatable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderIcon: LayersIcon as any,
  },

  storeConfigs_create: {
    path: '/store-configs/create',
    getURL: (): string => routes.storeConfigs_create.path,
    renderMain: StoreConfigs_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать Хранилище',
    navigatable: false,
  },

  storeConfigs_kn: {
    path: '/store-configs/:kn',
    getURL: (kn: string): string => `${routes.storeConfigs.path}/${kn}`,
    renderMain: StoreConfigs_kn,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Хранилище',
    navigatable: false,
  },

  targetTables: {
    path: '/target-tables',
    getURL: (): string => routes.targetTables.path,
    renderMain: TargetTable,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Целевые таблицы',
    navigatable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderIcon: TargetIcon as any,
  },

  targetTables_id: {
    path: '/target-tables/:kn',
    getURL: (kn: string): string => `${routes.targetTables.path}/${kn}`,
    renderMain: () => 'TargetTable',
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Целевые таблицы',
    navigatable: false,
  },

  // Misc

  storybook: {
    path: '/storybook',
    getURL: (): string => '/storybook',
    renderMain: () => (
      <Suspense fallback='loading...'>
        <Storybook />
      </Suspense>
    ),
    getName: (): string => 'storybook',
    navigatable: isDev(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderIcon: StarIcon as any,
  },

  notFound: {
    path: '/not-found',
    getURL: (): string => '/not-found',
    renderMain: () => 'Not Found',
    getName: () => 'not found',
    navigatable: false,
  },
} satisfies Record<string, Route>
