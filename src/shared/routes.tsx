import { BarChartIcon, LapTimerIcon, LayersIcon, StarIcon, TargetIcon } from '@radix-ui/react-icons'
import { Suspense, lazy } from 'react'
import { type Route } from '../lib/route'
import Main from '../pages/main'
import NormalizationConfigs from '~/pages/normalization-configs'
import NormalizationConfigs_create from '~/pages/normalization-configs/create'
import NormalizationConfigs_id from '~/pages/normalization-configs/id'
import OperationalTable from '~/pages/operational-table'
import OperationalTable_create from '~/pages/operational-table/create'
import OperationalTable_kn from '~/pages/operational-table/kn'
import Processes from '~/pages/processes'
import StoreConfigs from '~/pages/store-configs'
import StoreConfigs_create from '~/pages/store-configs/create'
import StoreConfigs_kn from '~/pages/store-configs/kn'
import TargetTable from '~/pages/target-table'
import TargetTable_create from '~/pages/target-table/create'
import TargetTable_kn from '~/pages/target-table/kn'
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

  /**
   * normaliztionConfigs
   */

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

  /**
   * operationalTables
   */

  operationalTables: {
    path: '/operational-tables',
    getURL: (): string => routes.operationalTables.path,
    renderMain: OperationalTable,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Промежуточные таблицы',
    navigatable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderIcon: TargetIcon as any,
  },

  operationalTables_create: {
    path: '/operational-tables/create',
    getURL: (): string => routes.operationalTables_create.path,
    renderMain: OperationalTable_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать промежуточную таблицу',
    navigatable: false,
  },

  operationalTables_kn_explorer: {
    path: '/operational-tables/:kn/explorer',
    getURL: (kn: string): string => routes.operationalTables_kn_explorer.path.replace(':kn', kn),
    renderMain: OperationalTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Промежуточная таблица',
    navigatable: false,
  },

  operationalTables_kn: {
    path: '/operational-tables/:kn',
    getURL: (kn: string): string => `${routes.operationalTables.path}/${kn}`,
    renderMain: OperationalTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Промежуточная таблица',
    navigatable: false,
  },

  /**
   * processes
   */

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

  /**
   * storeConfigs
   */

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

  /**
   * targetTables
   */

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

  targetTables_create: {
    path: '/target-tables/create',
    getURL: (): string => routes.targetTables_create.path,
    renderMain: TargetTable_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать целевую таблицу',
    navigatable: false,
  },

  targetTables_kn: {
    path: '/target-tables/:kn',
    getURL: (kn: string): string => `${routes.targetTables.path}/${kn}`,
    renderMain: TargetTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Целевая таблица',
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
