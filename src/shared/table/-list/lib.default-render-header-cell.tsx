import { toHtml } from '~/utils/md'

export function defaultRenderHeaderCell(params: { name: string | number | symbol; display?: string | undefined }) {
  return params.display ? toHtml(params.display) : String(params.name)
}
