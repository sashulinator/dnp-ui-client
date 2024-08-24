import { Suspense, lazy } from 'react'
import { type Route } from '../lib/route'
import Main from '../pages/main'
import { Icon as NormalizationConfigIcon } from '~/entities/normalization-config'
import { Icon as OperationalTableIcon } from '~/entities/operational-table'
import { Icon as ProcessIcon } from '~/entities/process'
import { Icon as StoreConfigIcon } from '~/entities/store-config'
import { Icon as TargetTableIcon } from '~/entities/target-table'
import Admin from '~/pages/admin'
import NormalizationConfigs from '~/pages/normalization-configs'
import NormalizationConfigs_create from '~/pages/normalization-configs/create'
import NormalizationConfigs_id from '~/pages/normalization-configs/id'
import OperationalTable from '~/pages/operational-table'
import OperationalTable_create from '~/pages/operational-table/create'
import OperationalTable_kn from '~/pages/operational-table/kn'
import OperationalTable_kn_explorer from '~/pages/operational-table/kn/explorer'
import Processes from '~/pages/processes'
import StoreConfigs from '~/pages/store-configs'
import StoreConfigs_create from '~/pages/store-configs/create'
import StoreConfigs_kn from '~/pages/store-configs/kn'
import TargetTable from '~/pages/target-table'
import TargetTable_create from '~/pages/target-table/create'
import TargetTable_kn from '~/pages/target-table/kn'
import Header from '~/ui/header'
import Icon from '~/ui/icon'
import Logo from '~/ui/logo-icon'
import Nav from '~/ui/nav'
import { isDev } from '~/utils/core'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../pages/storybook/index'))

export const routes = {
  main: {
    getPath: () => '/',
    getURL(): string {
      return this.getPath()
    },
    renderMain: Main,
    getName: (): string => 'НСИ',
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
    renderIcon: Logo,
  },

  /**
   * normaliztionConfigs
   */

  normalizationConfigs: {
    getPath: () => '/normalization-configs',
    getURL() {
      return this.getPath()
    },
    renderMain: NormalizationConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Нормализации',
    navigatable: true,
    renderIcon: NormalizationConfigIcon,
  },

  normalizationConfigs_create: {
    getPath: () => '/normalization-configs/create',
    getURL() {
      return this.getPath()
    },
    renderMain: NormalizationConfigs_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать Нормализацию',
    navigatable: false,
  },

  normalizationConfigs_id: {
    getPath: () => '/normalization-configs/:id',
    getURL(id: string) {
      return this.getPath().replace(':id', id)
    },
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
    getPath: () => '/operational-tables',
    getURL() {
      return this.getPath()
    },
    renderMain: OperationalTable,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Промежуточные таблицы',
    navigatable: true,
    renderIcon: OperationalTableIcon,
  },

  operationalTables_create: {
    getPath: () => '/operational-tables/create',
    getURL() {
      return this.getPath()
    },
    renderMain: OperationalTable_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать промежуточную таблицу',
    navigatable: false,
  },

  operationalTables_kn_explorer: {
    getPath: () => '/operational-tables/:kn/explorer',
    getURL(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    renderMain: OperationalTable_kn_explorer,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Данные промежуточной таблицы',
    navigatable: false,
  },

  operationalTables_kn: {
    getPath: () => '/operational-tables/:kn',
    getURL(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
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
    getPath: () => '/processes',
    getURL() {
      return this.getPath()
    },
    renderMain: Processes,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Процессы',
    navigatable: true,
    renderIcon: ProcessIcon,
  },

  /**
   * storeConfigs
   */

  storeConfigs: {
    getPath: () => '/store-configs',
    getURL() {
      return this.getPath()
    },
    renderMain: StoreConfigs,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Хранилища',
    navigatable: true,
    renderIcon: StoreConfigIcon,
  },

  storeConfigs_create: {
    getPath: () => '/store-configs/create',
    getURL() {
      return this.getPath()
    },
    renderMain: StoreConfigs_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать Хранилище',
    navigatable: false,
  },

  storeConfigs_kn: {
    getPath: () => '/store-configs/:kn',
    getURL(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
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
    getPath: () => '/target-tables',
    getURL() {
      return this.getPath()
    },
    renderMain: TargetTable,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Целевые таблицы',
    navigatable: true,
    renderIcon: TargetTableIcon,
  },

  targetTables_create: {
    getPath: () => '/target-tables/create',
    getURL() {
      return this.getPath()
    },
    renderMain: TargetTable_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать целевую таблицу',
    navigatable: false,
  },

  targetTables_kn: {
    getPath: () => '/target-tables/:kn',
    getURL(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    renderMain: TargetTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Целевая таблица',
    navigatable: false,
  },

  admin: {
    getPath: () => '/admin',
    getURL() {
      return this.getPath()
    },
    renderMain: Admin,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Управление пользователем',
    navigatable: isDev(),
    renderIcon: (props) => <Icon {...props} name='User' />,
  },

  // Misc

  storybook: {
    getPath: () => '/storybook',
    getURL() {
      return this.getPath()
    },
    renderMain: () => (
      <Suspense fallback='loading...'>
        <Storybook />
      </Suspense>
    ),
    getName: (): string => 'storybook',
    navigatable: isDev(),
    renderIcon: (props) => <Icon {...props} name='Star' />,
  },

  notFound: {
    getPath: () => '/not-found',
    getURL() {
      return this.getPath()
    },
    renderMain: () => 'Not Found',
    getName: () => 'not found',
    navigatable: false,
  },
} satisfies Record<string, Route>
