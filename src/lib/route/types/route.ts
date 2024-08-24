export type Route = {
  /**
   * Путь
   */
  getPath: () => string

  /**
   * Получить бизнес название раута
   */
  getName: () => string

  /**
   * Получить URL
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getURL: (...args: any[]) => string

  /**
   * Компонент Main
   */
  renderMain: () => React.ReactNode

  /**
   * Компонент Header
   */
  renderHeader?: () => React.ReactNode

  /**
   * Компонент Nav
   */
  renderNav?: () => React.ReactNode

  /**
   * Иконка которую обычно можно видеть в Nav
   */
  renderIcon?: (props: React.SVGAttributes<SVGSVGElement>) => React.ReactNode

  /**
   * Отображать ли в Nav
   */
  navigatable?: boolean | undefined

  /**
   * Конфигурация для корневого layout
   * @default '-configuration--app'
   */
  layoutConfiguration?: string | undefined

  rolesAllowed?: string[]
}
