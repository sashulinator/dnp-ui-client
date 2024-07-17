export function isWindow(input: unknown): input is Window {
  // must use == for ie8
  /* eslint eqeqeq:0 */
  return input !== null && input !== undefined && input == (input as Record<string, unknown>)['window']
}
