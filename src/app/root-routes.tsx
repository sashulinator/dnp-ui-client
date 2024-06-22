import { useRouteNode } from 'react-router5'
import { routes } from '../shared/routes'
import { RootLayout } from '~/ui/layout'

const displayName = 'Root-Routes'

/**
 * root-routes
 */
export default function Component(): React.ReactNode {
  const routeContext = useRouteNode('')

  const name = routeContext.route?.name?.split('.')[0]

  const route = routes?.[name as keyof typeof routes]

  return <RootLayout route={route || routes.notFound} />
}

Component.displayName = displayName
