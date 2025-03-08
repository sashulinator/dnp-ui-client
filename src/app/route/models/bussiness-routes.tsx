import { Suspense, lazy } from 'react'

import { auth, roles } from '~/app/auth'
import Dcservice_create from '~/entities/database-container/dcservice/pages/create'
import Dcservice_findWithTotal from '~/entities/database-container/dcservice/pages/find-with-total'
import Dcservice_getById from '~/entities/database-container/dcservice/pages/get-by-id'
import { NAME as PROCESSING_NAME, Icon as ProcessingIcon } from '~/entities/processing'
import NormalizationConfigs_create from '~/entities/processing/pages/create/create'
import NormalizationConfigs_list from '~/entities/processing/pages/list'
import NormalizationConfigs_status from '~/entities/processing/pages/status'
import LinkMenu_edit from '~/pages/link-tree.edit'
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
import { publicRoutes } from './public-routes'

// eslint-disable-next-line react-refresh/only-export-components
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
    render: () => 'Обработки',
    redirect: combineProtections(_protectPrivate, _protectByRole),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: ProcessingIcon,
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
  processing_status: {
    getName: (): string => 'Статус',
    getPath: (): string => `/${PROCESSING_NAME}/status`,
    getUrl() {
      return this.getPath()
    },
    render: NormalizationConfigs_status,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: ProcessingIcon,
      rolesAllowed: [roles.nrm_crt],
    },
  },
  processing_list: {
    getName: (): string => 'Перечень',
    getPath: (): string => `/${PROCESSING_NAME}/list`,
    getUrl() {
      return this.getPath()
    },
    render: NormalizationConfigs_list,
    redirect: combineProtections(_protectPrivate),
    payload: {
      renderHeader: Header,
      renderNav: Nav,
      renderIcon: ProcessingIcon,
      rolesAllowed: [roles.nrm_crt],
    },
  },

  processing_id: {
    getName: (): string => 'Обработка',
    getPath: () => `/${PROCESSING_NAME}/:id`,
    getUrl(id: string) {
      return this.getPath().replace(':id', id)
    },
    render: () => 'Обработка',
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
    getName: () => 'Сервисы Баз',
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
      renderIcon: (props) => <Icon {...props} name='Star' />,
      iconColor: 'red',
      renderHeader: Header,
      renderNav: Nav,
      rolesAllowed: [roles.admin],
    },
  },

  linkMenu_edit: {
    getName: () => 'Редактировать меню навигации',
    getPath: () => '/link-menu',
    getUrl() {
      return this.getPath()
    },
    render: () => (
      <Suspense fallback='loading...'>
        <LinkMenu_edit />
      </Suspense>
    ),
    payload: {
      navigatable: isDev(),
      renderIcon: (props) => <Icon {...props} name='Star' />,
      iconColor: 'red',
      renderHeader: Header,
      renderNav: Nav,
      // rolesAllowed: [roles.admin],
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
  return { url: `${publicRoutes.login.getUrl()}?redirect=${location.href}` }
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
