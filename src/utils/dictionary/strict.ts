import type { Dictionary } from '../core'

type Config = {
  ignore: string[]
}

const defIgnore = ['toJSON', 'valueOf', 'inspect']

export function strict<T extends Dictionary>(obj: T, config?: Config): T {
  return new Proxy(obj, {
    get: (target, key) => {
      const ignore = config?.ignore || defIgnore
      const v = target[key as string]

      if (typeof key !== 'string') return v

      if (v !== undefined) return v

      if (ignore.includes(key)) {
        return v
      }

      const msg = `Property '${key as string}' is undefined`
      const err = new ReferenceError(msg)

      throw err
    },
  })
}
