import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

export const history = createBrowserHistory({ window })

const NAME = 'router-Provider'

export default function Component(props: { children: React.ReactNode }): JSX.Element {
  return <HistoryRouter history={history as any} {...props} />
}

Component.displayName = NAME
