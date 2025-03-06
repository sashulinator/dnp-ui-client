export interface Causable<E extends Error = Error> {
  cause: E
}

export function isCausable(input: unknown): input is Causable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !!(input as any).code
}
