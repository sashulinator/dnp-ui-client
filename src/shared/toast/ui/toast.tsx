import './toast.scss'

import * as Toast from '@radix-ui/react-toast'

import { c } from '~/utils/core'

export interface Props extends Toast.ToastProps {
  className?: string | undefined
}

export const displayName = 'dnp-toast-Toast'

/**
 * dnp-toast-Toast
 *
 * Стандартный Toast компонент
 */
export default function Component(props: Props): JSX.Element {
  const { ...restProps } = props

  return (
    <Toast.Root className={c(displayName, props.className)} {...restProps}>
      <Toast.Title className={`${displayName}_title`}>title</Toast.Title>
      {/* <Toast.Description>
        
      </Toast.Description> */}
      {/* <Toast.Action className='ToastAction' asChild altText='Goto schedule to undo'>
        <button className='Button small green'>Undo</button>
      </Toast.Action> */}
    </Toast.Root>
  )
}

Component.displayName = displayName
