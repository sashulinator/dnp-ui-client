export function defaultRenderCell(params: { value: unknown }) {
  return params.value ? String(params.value) : ''
}
