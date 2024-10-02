import qs from 'qs'
import { Suspense, lazy } from 'react'

import { Icon as DictionaryTableIcon } from '~/entities/dictionary-table'
import DictionaryTable from '~/entities/dictionary-table/pages'
import DictionaryTable_create from '~/entities/dictionary-table/pages/create'
import DictionaryTable_kn_explorer from '~/entities/dictionary-table/pages/explorer'
import DictionaryTable_kn from '~/entities/dictionary-table/pages/kn'
import { Icon as NormalizationConfigIcon } from '~/entities/normalization-config'
import NormalizationConfigs from '~/entities/normalization-config/pages'
import NormalizationConfigs_create from '~/entities/normalization-config/pages/create'
import NormalizationConfigs_id from '~/entities/normalization-config/pages/id'
import { Icon as OperationalTableIcon } from '~/entities/operational-table'
import OperationalTable from '~/entities/operational-table/pages'
import OperationalTable_create from '~/entities/operational-table/pages/create'
import OperationalTable_kn_explorer from '~/entities/operational-table/pages/explorer'
import OperationalTable_kn from '~/entities/operational-table/pages/kn'
import { Icon as ProcessIcon } from '~/entities/process'
import Processes from '~/entities/process/pages'
import { Icon as StoreConfigIcon } from '~/entities/store-config'
import StoreConfigs from '~/entities/store-config/pages'
import StoreConfigs_create from '~/entities/store-config/pages/create'
import StoreConfigs_kn from '~/entities/store-config/pages/kn'
import { Icon as TargetTableIcon } from '~/entities/target-table'
import TargetTable from '~/entities/target-table/pages'
import TargetTable_create from '~/entities/target-table/pages/create'
import TargetTable_kn_explorer from '~/entities/target-table/pages/explorer'
import TargetTable_kn from '~/entities/target-table/pages/kn'
import { roles } from '~/entities/user'
import Admin from '~/pages/admin'
import Header from '~/shared/header'
import Icon from '~/shared/icon'
import Logo from '~/shared/logo-icon'
import Nav from '~/shared/nav'
import { isDev } from '~/utils/core'

import { type Route } from '..'
import Main from '../../../pages/main'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../../../pages/storybook/index'))

export const routeMap = {
  main: {
    getName: (): string => 'НСИ',
    getPath: () => '/',
    getUrl(): string {
      return this.getPath()
    },
    renderMain: Main,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
    renderIcon: Logo,
  },

  /**
   * normaliztionConfigs
   */

  normalizationConfigs: {
    getName: (): string => 'Нормализации',
    getPath: () => '/normalization-configs',
    getUrl() {
      return this.getPath()
    },
    renderMain: NormalizationConfigs,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: true,
    renderIcon: NormalizationConfigIcon,
    rolesAllowed: [roles.Admin, roles.Operator],
  },

  normalizationConfigs_create: {
    getName: (): string => 'Создать Нормализацию',
    getPath: () => '/normalization-configs/create',
    getUrl() {
      return this.getPath()
    },
    renderMain: NormalizationConfigs_create,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
    rolesAllowed: [roles.Admin, roles.Operator],
  },

  normalizationConfigs_id: {
    getName: (): string => 'Нормализации',
    getPath: () => '/normalization-configs/:id',
    getUrl(id: string) {
      return this.getPath().replace(':id', id)
    },
    renderMain: NormalizationConfigs_id,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
    rolesAllowed: [roles.Admin, roles.Operator],
  },

  /**
   *  dictionarytables
   */

  dictionaryTables: {
    getName: (): string => 'Справочники',
    getPath: () => '/dictionary-tables',
    getUrl() {
      return this.getPath()
    },
    renderMain: DictionaryTable,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: true,
    renderIcon: DictionaryTableIcon,
  },

  dictionaryTables_create: {
    getName: (): string => 'Создать справочник',
    getPath: () => '/dictionary-tables/create',
    getUrl() {
      return this.getPath()
    },
    renderMain: DictionaryTable_create,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  dictionaryTables_kn_explorer: {
    getName: () => 'Данные промежуточной таблицы',
    getPath: () => '/dictionary-tables/:kn/explorer',
    getUrl(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
    },
    renderMain: DictionaryTable_kn_explorer,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  dictionaryTables_kn: {
    getName: () => 'Справочник',
    getPath: () => '/dictionary-tables/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    renderMain: DictionaryTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  /**
   * operationalTables
   */

  operationalTables: {
    getName: (): string => 'Промежуточные таблицы',
    getPath: () => '/operational-tables',
    getUrl() {
      return this.getPath()
    },
    renderMain: OperationalTable,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: true,
    renderIcon: OperationalTableIcon,
  },

  operationalTables_create: {
    getName: () => 'Создать промежуточную таблицу',
    getPath: () => '/operational-tables/create',
    getUrl() {
      return this.getPath()
    },
    renderMain: OperationalTable_create,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  operationalTables_kn_explorer: {
    getName: () => 'Данные промежуточной таблицы',
    getPath: () => '/operational-tables/:kn/explorer',
    getUrl(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
    },
    renderMain: OperationalTable_kn_explorer,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  operationalTables_kn: {
    getName: () => 'Промежуточная таблица',
    getPath: () => '/operational-tables/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    renderMain: OperationalTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  /**
   * processes
   */

  processes: {
    getName: () => 'Процессы',
    getPath: () => '/processes',
    getUrl() {
      return this.getPath()
    },
    renderMain: Processes,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: true,
    renderIcon: ProcessIcon,
    rolesAllowed: [roles.Admin, roles.Operator],
  },

  /**
   * storeConfigs
   */

  storeConfigs: {
    getName: () => 'Хранилища',
    getPath: () => '/store-configs',
    getUrl() {
      return this.getPath()
    },
    renderMain: StoreConfigs,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: true,
    renderIcon: StoreConfigIcon,
    rolesAllowed: [roles.Admin],
  },

  storeConfigs_create: {
    getName: () => 'Создать Хранилище',
    getPath: () => '/store-configs/create',
    getUrl() {
      return this.getPath()
    },
    renderMain: StoreConfigs_create,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
    rolesAllowed: [roles.Admin],
  },

  storeConfigs_kn: {
    getName: () => 'Хранилище',
    getPath: () => '/store-configs/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    renderMain: StoreConfigs_kn,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
    rolesAllowed: [roles.Admin],
  },

  /**
   * targetTables
   */

  targetTables: {
    getName: () => 'Целевые таблицы',
    getPath: () => '/target-tables',
    getUrl() {
      return this.getPath()
    },
    renderMain: TargetTable,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: true,
    renderIcon: TargetTableIcon,
  },

  targetTables_create: {
    getName: () => 'Создать целевую таблицу',
    getPath: () => '/target-tables/create',
    getUrl() {
      return this.getPath()
    },
    renderMain: TargetTable_create,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  targetTables_kn: {
    getName: () => 'Целевая таблица',
    getPath: () => '/target-tables/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    renderMain: TargetTable_kn,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  targetTables_kn_explorer: {
    getName: () => 'Данные целевой таблицы',
    getPath: () => '/target-tables/:kn/explorer',
    getUrl(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
    },
    renderMain: TargetTable_kn_explorer,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: false,
  },

  admin: {
    getName: () => 'Управление пользователем',
    getPath: () => '/admin',
    getUrl() {
      return this.getPath()
    },
    renderMain: Admin,
    renderHeader: Header,
    renderNav: Nav,
    navigatable: isDev(),
    renderIcon: (props) => <Icon {...props} name='User' />,
  },

  // Misc

  storybook: {
    getName: () => 'Storybook',
    getPath: () => '/storybook',
    getUrl() {
      return this.getPath()
    },
    renderMain: () => (
      <Suspense fallback='loading...'>
        <Storybook />
      </Suspense>
    ),
    navigatable: isDev(),
    renderIcon: (props) => <Icon {...props} name='Star' />,
  },

  notFound: {
    getName: () => 'Not found',
    getPath: () => '/not-found',
    getUrl() {
      return this.getPath()
    },
    renderMain: () => 'Not Found',
    navigatable: false,
  },
} satisfies Record<string, Route>
