import { SetterOrUpdater } from '~/utils/core'

export interface Props<State> {
  state: State
  setState: SetterOrUpdater<State>
}
