import { Control } from './control'
import { Props } from './props'

export interface Story<State> {
  getName: () => string

  getPath?: () => string

  render: (props: Props<State>) => JSX.Element

  controls: Control[]
}
