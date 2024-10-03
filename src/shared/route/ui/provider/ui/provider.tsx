import { BrowserRouter, type BrowserRouterProps } from 'react-router-dom'

export interface Props extends BrowserRouterProps {
  className?: string | undefined
}

Component.displayName = 'router-Provider'

export default function Component(props: Props): JSX.Element {
  return <BrowserRouter {...props} />
}
