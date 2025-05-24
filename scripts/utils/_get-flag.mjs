export function getFlag(name) {
  const keyRegexp = new RegExp(`^--${name}=`)
  const str = [...process.argv].reverse().find((a) => keyRegexp.test(a))
  if (!str) return undefined
  const value = str.replace(keyRegexp, '')
  return value
}