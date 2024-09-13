import qs from 'qs'
import { Suspense, lazy } from 'react'

import { Icon as DictionaryTableIcon } from '~/entities/dictionary-table'
import DictionaryTable from '~/entities/dictionary-table/pages'
import DictionaryTable_create from '~/entities/dictionary-table/pages/create'
import DictionaryTable_kn from '~/entities/dictionary-table/pages/kn'
import DictionaryTable_kn_explorer from '~/entities/dictionary-table/pages/kn/explorer'
import { Icon as NormalizationConfigIcon } from '~/entities/normalization-config'
import NormalizationConfigs from '~/entities/normalization-config/pages'
import NormalizationConfigs_create from '~/entities/normalization-config/pages/create'
import NormalizationConfigs_id from '~/entities/normalization-config/pages/id'
import { Icon as OperationalTableIcon } from '~/entities/operational-table'
import OperationalTable from '~/entities/operational-table/pages'
import OperationalTable_create from '~/entities/operational-table/pages/create'
import OperationalTable_kn from '~/entities/operational-table/pages/kn'
import OperationalTable_kn_explorer from '~/entities/operational-table/pages/kn/explorer'
import { Icon as ProcessIcon } from '~/entities/process'
import Processes from '~/entities/process/pages'
import { Icon as StoreConfigIcon } from '~/entities/store-config'
import StoreConfigs from '~/entities/store-config/pages'
import StoreConfigs_create from '~/entities/store-config/pages/create'
import StoreConfigs_kn from '~/entities/store-config/pages/kn'
import { Icon as TargetTableIcon } from '~/entities/target-table'
import TargetTable from '~/entities/target-table/pages'
import TargetTable_create from '~/entities/target-table/pages/create'
import TargetTable_kn from '~/entities/target-table/pages/kn'
import { roles } from '~/entities/user'
import Admin from '~/pages/admin'
import Header from '~/shared/header'
import Icon from '~/shared/icon'
import Logo from '~/shared/logo-icon'
import Nav from '~/shared/nav'
import { isDev } from '~/utils/core'

import { type Route } from '../lib/route'
import Main from '../pages/main'

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
    rolesAllowed: [roles.Admin, roles.Operator],
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
    rolesAllowed: [roles.Admin, roles.Operator],
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
    rolesAllowed: [roles.Admin, roles.Operator],
  },

  /**
   *  dictionarytables
   */

  dictionaryTables: {
    getPath: () => '/dictionary-tables',
    getURL() {
      return this.getPath()
    },
    renderMain: DictionaryTable,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Справочники',
    navigatable: true,
    renderIcon: DictionaryTableIcon,
  },

  dictionaryTables_create: {
    getPath: () => '/dictionary-tables/create',
    getURL() {
      return this.getPath()
    },
    renderMain: DictionaryTable_create,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Создать справочник',
    navigatable: false,
  },

  dictionaryTables_kn_explorer: {
    getPath: () => '/dictionary-tables/:kn/explorer',
    getURL(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
    },
    renderMain: DictionaryTable_kn_explorer,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Данные промежуточной таблицы',
    navigatable: false,
  },

  dictionaryTables_kn: {
    getPath: () => '/dictionary-tables/:kn',
    getURL(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    renderMain: DictionaryTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    getName: (): string => 'Справочник',
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
    getURL(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
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
    rolesAllowed: [roles.Admin, roles.Operator],
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
    rolesAllowed: [roles.Admin],
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
    rolesAllowed: [roles.Admin],
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
    rolesAllowed: [roles.Admin],
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
