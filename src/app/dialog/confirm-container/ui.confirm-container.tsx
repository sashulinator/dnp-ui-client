import { ConfirmDialog } from '~/shared/dialog'
import { useSubscribeUpdate } from '~/utils/core-hooks'

import { state } from './lib.confirm'

const NAME = 'app-dialog---confirm-container'

export default function Component(): JSX.Element {
  useSubscribeUpdate(state.subscribe)

  return <ConfirmDialog.default {...state.get()} />
}

Component.displayName = NAME
