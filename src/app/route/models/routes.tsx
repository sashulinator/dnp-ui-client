import { Suspense, lazy } from 'react'

import Dcservice_create from '~/entities/database-container/dcservice/pages/create'
import Dcservice_findWithTotal from '~/entities/database-container/dcservice/pages/find-with-total'
import Dcservice_getById from '~/entities/database-container/dcservice/pages/get-by-id'
import NormalizationConfigs from '~/entities/normalization-config/pages'
import NormalizationConfigs_id from '~/entities/normalization-config/pages/id'
import { NAME as PROCESSING_NAME, Icon as ProcessingIcon } from '~/entities/processing'
import NormalizationConfigs_create from '~/entities/processing/pages/create'
import { LoginPage, auth, roles } from '~/shared/auth'
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

  processing: {
    getName: (): string => 'Обработки',
    getPath: (): string => `/${PROCESSING_NAME}`,
    getUrl() {
      return this.getPath()
    },
    render: NormalizationConfigs,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: ProcessingIcon,
      navigatable: false,
      rolesAllowed: [roles.nrm_get],
    },
  },

  processing_create: {
    getName: (): string => 'Запуск',
    getPath: (): string => `/${PROCESSING_NAME}/create`,
    getUrl() {
      return this.getPath()
    },
    render: NormalizationConfigs_create,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: true,
      renderIcon: ProcessingIcon,
      rolesAllowed: [roles.nrm_crt],
    },
  },

  processing_id: {
    getName: (): string => 'Обработки',
    getPath: () => `/${PROCESSING_NAME}/:id`,
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

  dcservice_create: {
    getName: () => 'Создать сервис',
    getPath: () => '/database-container/service/create',
    getUrl() {
      return this.getPath()
    },
    render: Dcservice_create,
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      navigatable: false,
      rolesAllowed: [roles.stc_crt],
    },
  },

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
      navigatable: false,
      rolesAllowed: [roles.stc_get],
      renderIcon: ProcessingIcon,
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
    getUrl(params: { name: string }) {
      return this.getPath().replace(':name', params.name)
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
