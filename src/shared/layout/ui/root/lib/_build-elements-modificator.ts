export type Route = {
  payload: {
    renderHeader?: unknown
    renderNav?: unknown
  }
}

export function _buildElementsModificator(currentRoute: undefined | Route): string {
  const layoutPartNames = ['main']

  if (currentRoute?.payload.renderNav) {
    layoutPartNames.push('nav')
  }
  if (currentRoute?.payload.renderHeader) {
    layoutPartNames.push('header')
  }

  return `-elements--${layoutPartNames.sort().join('-')}`
}
