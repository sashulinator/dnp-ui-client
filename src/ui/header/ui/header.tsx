import './header.scss'
import { Switch } from '~/ui/theme'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'ui-Header'

/**
 * ui-Header
 */
export default function Component(): JSX.Element {
  return (
    <header className={c(displayName)}>
      <div className='crumbs'></div>
      <div className='settings'>
        <Switch />
      </div>
    </header>
  )
}
Component.displayName = displayName
