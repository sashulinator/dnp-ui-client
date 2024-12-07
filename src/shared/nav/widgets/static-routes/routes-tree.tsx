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
        url: routes.store.getUrl({ name: 'navMenu' }),
      },
      renderIcon: () => <Icon name='Star' />,
    })
  }

  if (routes.dictionaryTables_findManyAndCount.payload.rolesAllowed.some((role) => auth.hasRole(role, 'dnp'))) {
    routsTree.push({
      id: 'Таблицы',
      name: 'Таблицы',
      renderIcon: () => <Icon name='Table' />,
      children: [
        {
          id: routes.dictionaryTables_findManyAndCount.getName(),
          name: routes.dictionaryTables_findManyAndCount.getName(),
          link: { url: routes.dictionaryTables_findManyAndCount.getPath() },
        },
        {
          id: routes.rawData_findManyAndCountTables.getName(),
          name: routes.rawData_findManyAndCountTables.getName(),
          link: { url: routes.rawData_findManyAndCountTables.getPath() },
        },
        {
          id: routes.operationalTables.getName(),
          name: routes.operationalTables.getName(),
          link: { url: routes.operationalTables.getPath() },
        },
        {
          id: routes.targetTables.getName(),
          name: routes.targetTables.getName(),
          link: { url: routes.targetTables.getPath() },
        },
      ],
    })
  }

  if (auth.hasRole(roles.nrm_get, 'dnp')) {
    const children: TreeItem[] = []

    if (auth.hasRole(roles.nrm_crt, 'dnp')) {
      children.push({
        id: routes.normalizationConfigs_create.getName(),
        name: routes.normalizationConfigs_create.getName(),
        link: {
          url: routes.normalizationConfigs_create.getPath(),
        },
      })
    }

    children.push({
      id: routes.normalizationConfigs.getName(),
      name: 'Список',
      link: {
        url: routes.normalizationConfigs.getPath(),
      },
    })

    routsTree.push({
      id: 'processing',
      name: 'Обработки',
      renderIcon: routes.normalizationConfigs.payload.renderIcon,
      children,
    })
  }

  return routsTree
}
