import './text-field.scss'

import { TextField } from '@radix-ui/themes'
import type { RootProps } from '@radix-ui/themes/dist/esm/components/text-field.d.ts'

import { type ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

export type Props = Omit<RootProps, 'variant'> & {
  variant?: 'classic' | 'surface' | 'soft' | 'borderless'
}

export const NAME = 'dnp-textField-TextField-c-Root'

/**
 * Root
 */
function Root(props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { className, variant = 'surface', ...textFieldRootProps } = props

  return (
    <TextField.Root
      {...textFieldRootProps}
      variant={variant === 'borderless' ? 'surface' : variant}
      ref={setRefs(ref)}
      className={c(className, NAME, `--variant-${variant}`)}
    />
  )
}

const ForwardRef = forwardRef(Root)
ForwardRef.displayName = NAME
export default ForwardRef
