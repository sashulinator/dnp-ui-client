import { type Dictionary } from '~/utils/core'

export type Route<TPayload extends Dictionary = Dictionary, TContext extends Dictionary = Dictionary> = {
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
  getUrl: (...args: any[]) => string

  /**
   * Компонент
   */
  render: (props: { route: Route<TPayload>; context: TContext }) => React.ReactNode

  /**
   * Будут переданы в render как props
   */
  payload: TPayload

  /**
   * Можно использовать как защиту
   */
  redirect?: (props: { route: Route<TPayload>; context: TContext }) => { url: string } | undefined
}
