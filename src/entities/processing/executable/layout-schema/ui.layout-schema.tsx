import LayoutSchema, { type LayoutSchemaProps } from '~/slices/layout-schema'

import { componentMap } from './constants'

export interface Props extends Omit<LayoutSchemaProps, 'componentMap'> {}

const NAME = 'dnp-processing-procedure-layoutSchema'

export default function Component(props: Props): JSX.Element {
  return <LayoutSchema componentMap={componentMap} {...props} />
}

Component.displayName = NAME
