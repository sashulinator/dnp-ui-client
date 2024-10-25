import { capitalize } from '~dnp/utils/core'
import { setPath } from '~dnp/utils/dictionary'

type Path = { key?: unknown }

export function toNestedErrors(errorArray?: unknown[]): Record<string, unknown> | undefined {
  const errors = errorArray as { message: string; code: string; expected: string; path: Path[] }[] | undefined
  if (!errors) return undefined

  let ret = {} as Record<string, unknown>

  for (let i = 0; i < errors.length; i += 1) {
    const error = errors[i]
    // не хочу завязывать переводы на сообщение ошибки, хочу на код
    const code = `assert${capitalize(error.expected)}`
    error.code = code
    const path = error.path.map((key) => key.key) as string[]
    ret = setPath(ret, path, error)
  }

  return ret
}
