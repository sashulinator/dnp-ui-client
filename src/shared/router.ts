import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'
import { isDev } from '../utils/core'
import { routes } from './routes'

// Конвертируем обьект в массив
const routeArr = Object.entries(routes).map(([name, route]) => ({
  ...route,
  name,
}))

// Создаем раутер
const router = createRouter(routeArr, {
  defaultRoute: 'main',
  allowNotFound: true,
  queryParamsMode: 'loose',
})

// Логгируем если dev
if (isDev()) {
  const loggerPlugin = await import('router5-plugin-logger')
  router.usePlugin(loggerPlugin.default)
}

router.usePlugin(browserPlugin())

router.start()

export { router }
