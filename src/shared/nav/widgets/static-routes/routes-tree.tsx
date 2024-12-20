import { routes } from '~/app/route'
import { auth, roles } from '~/shared/auth'
import Icon from '~/shared/icon'
import { type TreeItem } from '~/shared/link-tree'

export function getRoutesTree() {
  const routsTree: TreeItem[] = []

  if (auth.hasRole(roles.usr_get, 'dnp')) {
    routsTree.push({
      id: 'users',
      name: 'Пользователи',
      link: {
        url: 'http://10.4.40.11:8084/',
        blank: true,
      },
      renderIcon: () => <Icon name='User' />,
    })
  }
  if (auth.hasRole(roles.nav_upd, 'dnp')) {
    routsTree.push({
      id: 'nav',
      name: 'Навигационная панель',
      link: {
        url: routes.linkMenu_edit.getUrl(),
      },
      renderIcon: () => <Icon name='Star' />,
    })
  }

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
      id: routes.processing.getName(),
      name: 'Список',
      link: {
        url: routes.processing.getPath(),
      },
    })

    routsTree.push({
      id: 'processing',
      name: 'Обработки',
      renderIcon: routes.processing.payload.renderIcon,
      children,
    })
  }

  return routsTree
}
