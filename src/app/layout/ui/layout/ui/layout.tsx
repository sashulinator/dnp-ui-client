import './layout.scss'

import { createElement } from 'react'

import ScrollArea from '~dnp/shared/scroll-area'
import { c } from '~dnp/utils/core'

export interface Props {
  renderHeader?: (() => React.ReactNode) | undefined
  renderNav?: (() => React.ReactNode) | undefined
  renderMain: () => React.ReactNode
}

const NAME = 'dnp-layout-Layout'

export default function Component(props: Props): JSX.Element {
  const { renderHeader, renderNav, renderMain } = props

  return (
    <ScrollArea scrollbars='vertical'>
      <div className={c(NAME, _buildModificator())}>
        {renderHeader && createElement(renderHeader)}
        {renderNav && createElement(renderNav)}
        {createElement(renderMain)}
      </div>
    </ScrollArea>
  )

  /**
   * private
   */

  /**
   * Строит класс с перечислением наличия елементов
   * @returns '-elements--main-header-nav'
   */
  function _buildModificator(): string {
    const layoutPartNames = ['main']
    if (props?.renderNav) layoutPartNames.push('nav')
    if (props?.renderHeader) layoutPartNames.push('header')
    return `-elements--${layoutPartNames.sort().join('-')}`
  }
}

Component.displayName = NAME
