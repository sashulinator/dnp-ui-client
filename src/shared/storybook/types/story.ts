import type { Control } from './control'
import type { Props } from './props'

export type Story<State> = {
  getName: () => string

  getPath?: () => string

  render: (props: Props<State>) => JSX.Element

  controls: Control[]
}
