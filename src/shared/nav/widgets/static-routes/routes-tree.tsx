import { routes } from '~/app/route'
import { auth, roles } from '~/shared/auth'
import Icon from '~/shared/icon'
import { type TreeItem } from '~/shared/link-tree'

export function getRoutesTree() {
  const routsTree: TreeItem[] = []

  /**
   * Настройки пользователей
   */
  if (auth.hasRole(roles.usr_get, 'dnp')) {
    const children: TreeItem[] = []

    children.push({
      id: 'users-settings',
      name: 'http://10.4.40.11:8084/',
      link: {
        url: 'http://10.4.40.11:8084/',
        blank: true,
      },
    })

    routsTree.push({
      id: 'users',
      name: 'Пользователи',

      renderIcon: () => <Icon name='User' />,
      children,
    })
  }

  /**
   * Настройки интерфейса
   */
  if (auth.hasRole(roles.nav_upd, 'dnp')) {
    const children: TreeItem[] = []

    children.push({
      id: 'nav-settings',
      name: 'Настройка навигации',
      link: {
        url: routes.linkMenu_edit.getUrl(),
      },
    })

    routsTree.push({
      id: 'nav',
      name: 'Интерфейс',
      renderIcon: () => <Icon name='Star' />,
      children,
    })
  }

  /**
   * Настройка таблиц
   */
  if (auth.hasRole(roles.usr_get, 'dnp')) {
    const children: TreeItem[] = []

    children.push({
      id: 'tables-directories',
      name: 'Справочники',
    })
    children.push({
      id: 'tables-source',
      name: 'Исходные',
    })
    children.push({
      id: 'tables-intermediate',
      name: 'Промежуточные',
    })
    children.push({
      id: 'tables-target',
      name: 'Целевые',
    })
    children.push({
      id: 'tables-data',
      name: 'Хранилища',
    })

    routsTree.push({
      id: 'tables',
      name: 'Настройка таблиц',
      renderIcon: () => <Icon name='User' />,
      children,
    })
  }

  /**
   * Обработки
   */
  if (auth.hasRole(roles.nrm_get, 'dnp')) {
    const children: TreeItem[] = []

    if (auth.hasRole(roles.nrm_crt, 'dnp')) {
      children.push({
        id: routes.processing_create.getName(),
        name: routes.processing_create.getName(),
        link: {
          url: routes.processing_create.getPath(),
        },
      })
    }

    children.push({
      id: routes.processes.getName(),
      name: 'Статус',
      link: {
        url: routes.processes.getPath(),
      },
    })
    children.push({
      id: routes.processing_list.getName(),
      name: 'Перечень',
      link: {
        url: routes.processing_list.getPath(),
      },
    })

    routsTree.push({
      id: 'processing',
      name: 'Обработки',
      renderIcon: routes.processing.payload.renderIcon,
      children,
    })
  }

  /**
   * Хранилище
   */

  routsTree.push({
    id: routes.dcservice_findWithTotal.getName(),
    name: routes.dcservice_findWithTotal.getName(),
    renderIcon: () => <Icon name='Database' />,
    link: {
      url: routes.dcservice_findWithTotal.getPath(),
    },
  })

  return routsTree
}
