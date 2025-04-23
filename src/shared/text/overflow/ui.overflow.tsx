import { c } from '~/utils/core'
import { useMeasure } from '~/utils/core-hooks/use-measure'
import { setRefs } from '~/utils/react'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string | undefined
  containerProps?: React.HTMLAttributes<HTMLDivElement> | undefined
  alt: string | undefined
}

const NAME = 'ui-text-overflow'

export default function Component(props: Props): JSX.Element {
  const { className, alt, containerProps, ...rootProps } = props
  const [ref, measure] = useMeasure()

  return (
    <div
      {...rootProps}
      className={c(NAME, className)}
      ref={setRefs(ref)}
      style={{ width: '100%', height: '100%', position: 'relative', ...rootProps.style }}
    >
      {' '}
      <div
        title={alt}
        {...containerProps}
        style={{
          width: measure.width || undefined,
          height: measure.height || undefined,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          textAlign: 'left',
          ...containerProps?.style,
        }}
      >
        <span>{props.children}</span>
      </div>
    </div>
  )
}

Component.displayName = NAME
