export function mergeStyles<T extends React.CSSProperties>(...styles: (T | undefined)[]) {
  return styles.reduce((acc, s) => ({ ...acc, ...s }), {})
}
