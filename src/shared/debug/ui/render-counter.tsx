import { useRef } from 'react'

import Flex from '~/shared/flex'
import { isDev } from '~/utils/core-client'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name?: string | undefined
}

const NAME = 'debug-RenderCounter'

export default function Component(props: Props): JSX.Element | null {
  const count = useRef(0)

  if (!isDev() || localStorage.getItem('devReactStrictMode') !== 'true') return null

  count.current = count.current + 1

  return (
    <Flex
      {...props}
      width='fit-content'
      height='24px'
      align='center'
      justify='center'
      style={{
        whiteSpace: 'nowrap',
        background: 'red',
        transform: 'translateY(-100%)',
        color: 'white',
        borderRadius: '4px',
        padding: '0 4px',
        position: 'absolute',
        ...props.style,
      }}
    >
      {count.current} {props.name}
    </Flex>
  )
}

Component.displayName = NAME
