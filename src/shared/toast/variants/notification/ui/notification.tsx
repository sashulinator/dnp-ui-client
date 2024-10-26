import './notification.scss'

import * as Toast from '@radix-ui/react-toast'

import { c } from '~dnp/utils/core'

export interface Props extends Omit<Toast.ToastProps, 'title' | 'type'> {
  className?: string | undefined
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  actionAltText?: string | undefined
  type?: 'success' | 'error' | 'default' | undefined
}

const displayName = 'dnp-toast-Toast-v-Notification'

/**
 * ui-Notification
 */
export default function Component(props: Props): JSX.Element {
  const { className, title, description, action, actionAltText, type = 'default', ...rootProps } = props

  return (
    <Toast.Root className={c(displayName, className, `type--${type}`)} {...rootProps}>
      <Toast.Title className={`${displayName}_title`}>
        <div className={`${displayName}_indicator`} />
        {title}
      </Toast.Title>
      {description && <Toast.Description className={`${displayName}_description`}>{description}</Toast.Description>}
      {action && (
        <Toast.Action altText={actionAltText || 'action'} className={`${displayName}_action`}>
          {action}
        </Toast.Action>
      )}
    </Toast.Root>
  )
}

Component.displayName = displayName
