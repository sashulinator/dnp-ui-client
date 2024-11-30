import qs from 'qs'
import { Suspense, lazy } from 'react'

import Dcservice_findWithTotal from '~/entities/database-container/dcservice/pages/find-with-total'
import Dcservice_getById from '~/entities/database-container/dcservice/pages/get-by-id'
import { Icon as DictionaryTableIcon } from '~/entities/dictionary-table'
import DictionaryTable_create from '~/entities/dictionary-table/pages/create'
import DictionaryTable_explorerFindManyAndCount from '~/entities/dictionary-table/pages/explorer-find-many-and-count'
import DictionaryTable_findManyAndCount from '~/entities/dictionary-table/pages/find-many-and-count'
import DictionaryTable_getByKn from '~/entities/dictionary-table/pages/get-by-kn'
import { Icon as NormalizationConfigIcon } from '~/entities/normalization-config'
import NormalizationConfigs from '~/entities/normalization-config/pages'
import NormalizationConfigs_create from '~/entities/normalization-config/pages/create'
import NormalizationConfigs_id from '~/entities/normalization-config/pages/id'
import { Icon as OperationalTableIcon } from '~/entities/operational-table'
import OperationalTable from '~/entities/operational-table/pages'
import OperationalTable_create from '~/entities/operational-table/pages/create'
import OperationalTable_kn_explorer from '~/entities/operational-table/pages/explorer'
import OperationalTable_kn from '~/entities/operational-table/pages/kn'
import { Icon as RawDataIcon } from '~/entities/raw-data'
import RawData_getManyAndCountTables from '~/entities/raw-data/pages/find-many-and-count-tables/ui.find-many-and-count-tables'
import { Icon as StoreConfigIcon } from '~/entities/store-config'
import StoreConfigs from '~/entities/store-config/pages'
import StoreConfigs_create from '~/entities/store-config/pages/create'
import StoreConfigs_kn from '~/entities/store-config/pages/kn'
import { Icon as TargetTableIcon } from '~/entities/target-table'
import TargetTable from '~/entities/target-table/pages'
import TargetTable_create from '~/entities/target-table/pages/create'
import TargetTable_kn_explorer from '~/entities/target-table/pages/explorer'
import TargetTable_kn from '~/entities/target-table/pages/kn'
import { auth, roles } from '~/shared/auth'
import { LoginPage } from '~/shared/auth'
import Header from '~/shared/header'
import Icon from '~/shared/icon'
import Logo from '~/shared/logo-icon'
import Nav from '~/shared/nav'
import { Icon as ProcessIcon } from '~/slices/process'
import Processes from '~/slices/process/pages'
import Processes_kn from '~/slices/process/pages/kn'
import { isDev } from '~/utils/core-client/is-dev'

import Main from '../../../pages/main'
import { type AppRoute } from './app-route'

// eslint-disable-next-line react-refresh/only-export-components
const Storybook = lazy(() => import('../../../pages/storybook/index'))
const Store_getByName = lazy(() => import('../../../slices/store/pages/get-by-name'))

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
    getName: (): string => 'Обработки',
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
      navigatable: false,
      rolesAllowed: [roles.nrm_get],
    },
  },

  normalizationConfigs_create: {
    getName: (): string => 'Запуск Обработки',
    getPath: (): string => `${routes.normalizationConfigs.getPath()}/create`,
    getUrl() {
      return this.getPath()
    },
    render: NormalizationConfigs_create,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      renderIcon: NormalizationConfigIcon,
      rolesAllowed: [roles.nrm_crt],
    },
  },

  normalizationConfigs_id: {
    getName: (): string => 'Обработки',
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
      rolesAllowed: [roles.nrm_get],
    },
  },

  /**
   * databaseContaner
   */

  dcservice_getById: {
    getName: () => 'Сервис',
    getPath: () => '/database-container/service/:id',
    getUrl(id: string) {
      return this.getPath().replace(':id', id)
    },
    render: Dcservice_getById,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
      rolesAllowed: [roles.stc_get],
    },
  },

  dcservice_findWithTotal: {
    getName: () => 'Сервисы',
    getPath: () => '/database-container/service',
    getUrl() {
      return this.getPath()
    },
    render: Dcservice_findWithTotal,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      rolesAllowed: [roles.stc_get],
      renderIcon: StoreConfigIcon,
    },
  },

  /**
   * rawData
   */

  rawData_findManyAndCountTables: {
    getName: () => 'Таблицы исходных данных',
    getPath: () => '/raw-data',
    getUrl() {
      return this.getPath()
    },
    render: RawData_getManyAndCountTables,
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: RawDataIcon,
      navigatable: true,
    },
  },

  /**
   * operationalTables
   */

  operationalTables: {
    getName: (): string => 'Таблицы промежуточных данных',
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
      rolesAllowed: [roles.opt_get],
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
      rolesAllowed: [roles.opt_crt],
    },
  },

  operationalTables_kn_explorer: {
    getName: () => 'Промежуточные данные',
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
      rolesAllowed: [roles.opt_get],
    },
  },

  operationalTables_kn: {
    getName: () => 'Таблица промежуточных данных',
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
      rolesAllowed: [roles.opt_get],
    },
  },

  /**
   * targetTables
   */

  targetTables: {
    getName: () => 'Таблицы целевых данных',
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
      rolesAllowed: [roles.trt_get],
    },
  },

  targetTables_create: {
    getName: () => 'Создать таблицу целевых данных',
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
      rolesAllowed: [roles.trt_crt],
    },
  },

  targetTables_kn: {
    getName: () => 'Таблица целевых данных',
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
      rolesAllowed: [roles.trt_get],
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
      rolesAllowed: [roles.trt_get],
    },
  },

  /**
   *  dictionarytables
   */

  dictionaryTables_findManyAndCount: {
    getName: (): string => 'Таблицы справочников',
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
      rolesAllowed: [roles.dct_get],
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
      rolesAllowed: [roles.dct_crt],
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
      rolesAllowed: [roles.dct_get],
    },
  },

  dictionaryTables_getByKn: {
    getName: () => 'Таблицы справочников',
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
      rolesAllowed: [roles.dct_get],
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
      rolesAllowed: [roles.nrm_get],
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
      rolesAllowed: [roles.nrm_get],
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
      rolesAllowed: [roles.stc_get],
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
      rolesAllowed: [roles.stc_crt],
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
      rolesAllowed: [roles.stc_get],
    },
  },

  // Misc

  login: {
    getName: () => 'Login',
    getPath: () => '/login',
    getUrl() {
      return this.getPath()
    },
    render: LoginPage,
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

  store: {
    getName: () => 'Store',
    getPath: () => '/stores/:name',
    getUrl() {
      return this.getPath()
    },
    render: () => (
      <Suspense fallback='loading...'>
        <Store_getByName />
      </Suspense>
    ),
    payload: {
      navigatable: isDev(),
      renderIcon: (props) => <Icon {...props} name='Star' />,
      iconColor: 'red',
      renderHeader: Header,
      renderNav: Nav,
      rolesAllowed: [roles.admin],
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
  if (!props.route?.payload.rolesAllowed) return undefined
  if (props.route?.payload.rolesAllowed.some((role) => auth.hasRole(role, 'dnp'))) return undefined
  return { url: routes.main.getUrl() }
}

function _protectPrivate(): { url: string } | undefined {
  if (!auth.isRefreshTokenExpired()) return undefined
  return { url: `${routes.login.getUrl()}?redirect=${location.href}` }
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
