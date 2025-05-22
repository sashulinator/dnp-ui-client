import './ui.layout.scss'

import { createElement } from 'react'

import { c } from '~/utils/core'

export interface Props {
  renderHeader?: (() => React.ReactNode) | undefined
  renderNav?: (() => React.ReactNode) | undefined
  renderMain: () => React.ReactNode
}

const NAME = 'dnp-layout-Layout'

export default function Component(props: Props): JSX.Element {
  const { renderHeader, renderNav, renderMain } = props

  return (
    <div className={c(NAME, _buildModificator())}>
      {renderHeader && createElement(renderHeader)}
      {renderNav && createElement(renderNav)}
      {createElement(renderMain)}
    </div>
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
