import { type Context, context } from '../model/context'

export const NAME = 'where-FilterConfigurator-c-Root'

export interface Props extends Context {
  children: React.ReactNode
}

/**
 * where-FilterConfigurator-c-Root
 */
export function Root(props: Props): JSX.Element {
  const { children, ...contextProps } = props

  return <context.Provider value={contextProps}>{children}</context.Provider>
}

Root.displayName = NAME
