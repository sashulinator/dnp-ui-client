import { SetterOrUpdater } from '~dnp/utils/core'

export interface Props<State> {
  state: State
  setState: SetterOrUpdater<State>
}
