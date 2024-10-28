import qs from 'qs'
import { Suspense, lazy } from 'react'

import { Icon as DictionaryTableIcon } from '~dnp/entities/dictionary-table'
import DictionaryTable_create from '~dnp/entities/dictionary-table/pages/create'
import DictionaryTable_explorerFindManyAndCount from '~dnp/entities/dictionary-table/pages/explorer-find-many-and-count'
import DictionaryTable_findManyAndCount from '~dnp/entities/dictionary-table/pages/find-many-and-count'
import DictionaryTable_getByKn from '~dnp/entities/dictionary-table/pages/get-by-kn'
import { Icon as NormalizationConfigIcon } from '~dnp/entities/normalization-config'
import NormalizationConfigs from '~dnp/entities/normalization-config/pages'
import NormalizationConfigs_create from '~dnp/entities/normalization-config/pages/create'
import NormalizationConfigs_id from '~dnp/entities/normalization-config/pages/id'
import { Icon as OperationalTableIcon } from '~dnp/entities/operational-table'
import OperationalTable from '~dnp/entities/operational-table/pages'
import OperationalTable_create from '~dnp/entities/operational-table/pages/create'
import OperationalTable_kn_explorer from '~dnp/entities/operational-table/pages/explorer'
import OperationalTable_kn from '~dnp/entities/operational-table/pages/kn'
import { Icon as ProcessIcon } from '~dnp/entities/process'
import Processes from '~dnp/entities/process/pages'
import Processes_kn from '~dnp/entities/process/pages/kn'
import { Icon as StoreConfigIcon } from '~dnp/entities/store-config'
import StoreConfigs from '~dnp/entities/store-config/pages'
import StoreConfigs_create from '~dnp/entities/store-config/pages/create'
import StoreConfigs_kn from '~dnp/entities/store-config/pages/kn'
import { Icon as TargetTableIcon } from '~dnp/entities/target-table'
import TargetTable from '~dnp/entities/target-table/pages'
import TargetTable_create from '~dnp/entities/target-table/pages/create'
import TargetTable_kn_explorer from '~dnp/entities/target-table/pages/explorer'
import TargetTable_kn from '~dnp/entities/target-table/pages/kn'
import { globalStore, isResourceRoles, resourceRoles } from '~dnp/shared/auth'
import Header from '~dnp/shared/header'
import Icon from '~dnp/shared/icon'
import Logo from '~dnp/shared/logo-icon'
import Nav from '~dnp/shared/nav'
import { isDev } from '~dnp/utils/core-client/is-dev'

import Main from '../../../pages/main'
import Login from '../../../shared/auth/pages/login'
import { type AppRoute } from './app-route'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../../../pages/storybook/index'))

export const routes = {
  main: {
    getName: (): string => 'НСИ',
    getPath: () => '/',
    getUrl(): string {
      return this.getPath()
    },
    render: Main,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: Logo,
      navigatable: false,
    },
  },

  /**
   * normaliztionConfigs
   */

  normalizationConfigs: {
    getName: (): string => 'Нормализации',
    getPath: (): string => '/normalization-configs',
    getUrl() {
      return this.getPath()
    },
    render: NormalizationConfigs,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: NormalizationConfigIcon,
      navigatable: true,
      rolesAllowed: [resourceRoles.admin, resourceRoles.operator],
    },
  },

  normalizationConfigs_create: {
    getName: (): string => 'Создать Нормализацию',
    getPath: (): string => `${routes.normalizationConfigs.getPath()}/create`,
    getUrl() {
      return this.getPath()
    },
    render: NormalizationConfigs_create,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
      rolesAllowed: [resourceRoles.admin, resourceRoles.operator],
    },
  },

  normalizationConfigs_id: {
    getName: (): string => 'Нормализации',
    getPath: () => '/normalization-configs/:id',
    getUrl(id: string) {
      return this.getPath().replace(':id', id)
    },
    render: NormalizationConfigs_id,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
      rolesAllowed: [resourceRoles.admin, resourceRoles.operator],
    },
  },

  /**
   *  dictionarytables
   */

  dictionaryTables_findManyAndCount: {
    getName: (): string => 'Справочники',
    getPath: () => '/dictionary-tables',
    getUrl() {
      return this.getPath()
    },
    render: DictionaryTable_findManyAndCount,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      renderIcon: DictionaryTableIcon,
    },
  },

  dictionaryTables_create: {
    getName: (): string => 'Создать справочник',
    getPath: () => '/dictionary-tables/create',
    getUrl() {
      return this.getPath()
    },
    render: DictionaryTable_create,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
  },

  dictionaryTables_explorerFindManyAndCount: {
    getName: () => 'Данные промежуточной таблицы',
    getPath: () => '/dictionary-tables/:kn/explorer',
    getUrl(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
    },
    generateKey: (location) => location.pathname,
    render: DictionaryTable_explorerFindManyAndCount,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
  },

  dictionaryTables_getByKn: {
    getName: () => 'Справочник',
    getPath: () => '/dictionary-tables/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    render: DictionaryTable_getByKn,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
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
    render: OperationalTable,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      renderIcon: OperationalTableIcon,
    },
  },

  operationalTables_create: {
    getName: () => 'Создать промежуточную таблицу',
    getPath: () => '/operational-tables/create',
    getUrl() {
      return this.getPath()
    },
    render: OperationalTable_create,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
  },

  operationalTables_kn_explorer: {
    getName: () => 'Данные промежуточной таблицы',
    getPath: () => '/operational-tables/:kn/explorer',
    getUrl(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
    },
    redirect: combineProtections(_protectPrivate),
    render: OperationalTable_kn_explorer,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
  },

  operationalTables_kn: {
    getName: () => 'Промежуточная таблица',
    getPath: () => '/operational-tables/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    render: OperationalTable_kn,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
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
    render: Processes,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      renderIcon: ProcessIcon,
      rolesAllowed: [resourceRoles.admin, resourceRoles.operator],
    },
  },

  processes_kn: {
    getName: (): string => 'Процесс',
    getPath: () => '/processes/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    render: Processes_kn,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
      renderIcon: ProcessIcon,
      rolesAllowed: [resourceRoles.admin, resourceRoles.operator],
    },
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
    render: StoreConfigs,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      renderIcon: StoreConfigIcon,
      rolesAllowed: [resourceRoles.admin],
    },
  },

  storeConfigs_create: {
    getName: () => 'Создать Хранилище',
    getPath: () => '/store-configs/create',
    getUrl() {
      return this.getPath()
    },
    render: StoreConfigs_create,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
      rolesAllowed: [resourceRoles.admin],
    },
  },

  storeConfigs_kn: {
    getName: () => 'Хранилище',
    getPath: () => '/store-configs/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    render: StoreConfigs_kn,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
      rolesAllowed: [resourceRoles.admin],
    },
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
    render: TargetTable,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      renderIcon: TargetTableIcon,
    },
  },

  targetTables_create: {
    getName: () => 'Создать целевую таблицу',
    getPath: () => '/target-tables/create',
    getUrl() {
      return this.getPath()
    },
    render: TargetTable_create,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
  },

  targetTables_kn: {
    getName: () => 'Целевая таблица',
    getPath: () => '/target-tables/:kn',
    getUrl(kn: string) {
      return this.getPath().replace(':kn', kn)
    },
    redirect: combineProtections(_protectPrivate),
    render: TargetTable_kn,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
  },

  targetTables_kn_explorer: {
    getName: () => 'Данные целевой таблицы',
    getPath: () => '/target-tables/:kn/explorer',
    getUrl(kn: string, params?: { name: string } | undefined) {
      return `${this.getPath().replace(':kn', kn)}${qs.stringify(params, { addQueryPrefix: true })}`
    },
    redirect: combineProtections(_protectPrivate),
    render: TargetTable_kn_explorer,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
    },
  },

  // Misc

  login: {
    getName: () => 'Login',
    getPath: () => '/login',
    getUrl() {
      return this.getPath()
    },
    render: Login,
    payload: {
      navigatable: isDev(),
      renderIcon: (props) => <Icon {...props} name='Star' />,
      iconColor: 'red',
    },
  },

  storybook: {
    getName: () => 'Storybook',
    getPath: () => '/storybook',
    getUrl() {
      return this.getPath()
    },
    render: () => (
      <Suspense fallback='loading...'>
        <Storybook />
      </Suspense>
    ),
    payload: {
      navigatable: isDev(),
      renderIcon: (props) => <Icon {...props} name='Star' />,
      iconColor: 'red',
    },
  },

  notFound: {
    getName: () => 'Not found',
    getPath: () => '/not-found',
    getUrl() {
      return this.getPath()
    },
    render: () => 'Not Found',
    payload: {
      navigatable: false,
      renderHeader: Header,
      renderNav: Nav,
    },
  },
} satisfies Record<string, AppRoute>

/**
 * private
 */

function _protectByRole(props: { route: AppRoute }): { url: string } | undefined {
  return undefined
  if (isResourceRoles(props.route?.payload.rolesAllowed)) return
  return { url: routes.main.getUrl() }
}

function _protectPrivate(): { url: string } | undefined {
  return undefined
  const jwtPayload = globalStore.getState().getJwtPayload()
  if (!jwtPayload) return { url: `${routes.login.getUrl()}?redirect=${location.href}` }
}

function combineProtections(...fns: ((props: { route: AppRoute }) => { url: string } | undefined)[]) {
  return (props: { route: AppRoute }): { url: string } | undefined => {
    for (let index = 0; index < fns.length; index++) {
      const fn = fns[index]
      const result = fn(props)
      if (result !== undefined) return result
    }
  }
}
