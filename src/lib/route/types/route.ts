export type Route = {
  /**
   * Путь
   */
  path: string

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
  renderIcon?: () => React.ReactNode

  /**
   * Отображать ли в Nav
   */
  navigatable?: boolean | undefined

  /**
   * Конфигурация для корневого layout
   * @default '-configuration--app'
   */
  layoutConfiguration?: string | undefined
}
