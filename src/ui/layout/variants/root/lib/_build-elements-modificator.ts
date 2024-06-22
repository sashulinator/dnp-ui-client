export type Route = {
  renderHeader?: unknown
  renderNav?: unknown
}

export function _buildElementsModificator(currentRoute: undefined | Route): string {
  const layoutPartNames = ['main']

  if (currentRoute?.renderNav) {
    layoutPartNames.push('nav')
  }
  if (currentRoute?.renderHeader) {
    layoutPartNames.push('header')
  }

  return `-elements--${layoutPartNames.sort().join('-')}`
}
