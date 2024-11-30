import { RenderCounter } from '~/shared/debug'
import { c } from '~/utils/core'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string | undefined
  children: React.ReactNode
}

const NAME = 'page-Main'

export default function Component(props: Props): JSX.Element {
  return (
    <main className={c(props.className, NAME)} {...props} style={{ ...props.style, position: 'relative' }}>
      <RenderCounter name='main' style={{ top: 0, transform: 'translateY(0)' }} />
      {props.children}
    </main>
  )
}

Component.displayName = NAME

export { type Props as MainProps }
