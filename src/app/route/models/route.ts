import { type Dictionary } from '~dnp/utils/core'

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

  /**
   * Генерация уникального ключа
   *
   * Проблематика:
   * При переходе со страницы /entity/1 на /entity/2
   * не происходит моунтинг страницы а ее ререндеринг,
   * что часто не желательно
   */
  generateKey?: (
    location: {
      pathname: string
      search: string
      hash: string
    },
    route: Route,
  ) => string
}
