import { createElement } from 'react'
import { _buildElementsModificator } from '../lib/_build-elements-modificator'
import './root.scss'
import { type Route } from '~/lib/route'
import ScrollArea from '~/ui/scroll-area'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  route: Route
}

const displayName = 'ui-Layout-v-Root'

/**
 * ui-Layout-v-Root
 */
export default function Component(props: Props): JSX.Element {
  const { route } = props

  const layoutConfiguration = '-layoutConfiguration--default'

  return (
    <ScrollArea scrollbars='vertical'>
      <div className={c(displayName, layoutConfiguration, _buildElementsModificator(route))}>
        {route?.renderHeader && createElement(route.renderHeader)}
        {route?.renderNav && createElement(route.renderNav)}
        {createElement(route.renderMain)}
      </div>
    </ScrollArea>
  )
}

Component.displayName = displayName
