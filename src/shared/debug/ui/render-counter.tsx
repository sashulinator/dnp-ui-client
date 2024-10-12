import { useRef } from 'react'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string | undefined
}

const NAME = 'RenderCounter'

export default function Component(props: Props): JSX.Element {
  const count = useRef(0)

  count.current += 1

  return (
    <div {...props} style={{ background: 'red', color: 'white' }}>
      {count.current}
    </div>
  )
}

Component.displayName = NAME
