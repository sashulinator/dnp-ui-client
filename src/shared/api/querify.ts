import QueryString from 'qs'

export function querify(obj: Record<string, string | number | boolean>) {
  return QueryString.stringify(obj, { addQueryPrefix: true })
}
