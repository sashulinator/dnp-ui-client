import React, { type ForwardedRef, forwardRef, useRef } from 'react'

import Button, { type ButtonProps } from '~/shared/button'
import { fns } from '~/utils/core'
import { setRefs } from '~/utils/react'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  rootProps?: ButtonProps | undefined
  children?: React.ReactNode
  style?: React.CSSProperties
  accept: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, file: FileList | null) => void
}

function Component(props: Props, ref: ForwardedRef<HTMLInputElement>) {
  const {
    onFileChange,
    variant = 'solid',
    size = '2',
    rootProps,
    style,
    children = 'Прикрепите файл',
    ...inputProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Button
        variant={variant}
        size={size}
        {...rootProps}
        style={{ ...style, ...rootProps?.style }}
        onClick={() => inputRef.current?.click()}
      >
        {children}
      </Button>

      {/** HIDDEN */}

      <input
        {...inputProps}
        type='file'
        ref={setRefs(ref, inputRef)}
        style={{ display: 'none' }}
        onChange={fns(props.onChange, (e) => onFileChange(e, e.target.files))}
      />
    </>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = 'dnp-sh-file-Input'

export default ForwardRef
export { type Props as InputProps }
