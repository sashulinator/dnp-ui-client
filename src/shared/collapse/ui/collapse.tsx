import { a, useSpring } from '@react-spring/web'

import React, { type CSSProperties, type ForwardedRef, forwardRef, useState } from 'react'

import { type XY, c } from '~/utils/core'
import { usePrevious } from '~/utils/core-hooks/previous'
import { useRenderDelay } from '~/utils/core-hooks/render-delay'
import { useMeasure } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isExpanded: boolean
  from?: (CSSProperties & Partial<XY>) | undefined
  to?: (CSSProperties & Partial<XY>) | undefined
  duration?: number | undefined
  containerProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

const displayName = 'collapse-Collapse'

function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { containerProps, duration, to, from, isExpanded, children, ...divProps } = props
  const [refState, setRefState] = useState<Element | null>(null)
  const [measureRef, measure] = useMeasure()

  const isFirstRender = usePrevious(false, true)
  useRenderDelay(0)

  const springProps = useSpring({
    from,
    to: refState ? { height: isExpanded ? measure.height : 0, ...to } : {},
    config: { duration: duration ?? 200 },
  })

  return (
    <a.div
      {...divProps}
      style={{ overflow: 'hidden', width: '100%', ...divProps.style, ...springProps }}
      ref={ref}
      className={c(divProps.className, displayName, isExpanded && '--expanded', !isExpanded && '--collapsed')}
    >
      {(isExpanded || !isFirstRender) && (
        <div {...containerProps} className={c('container')} ref={setRefs(measureRef, setRefState)}>
          {children}
        </div>
      )}
    </a.div>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = displayName
export default ForwardRef
