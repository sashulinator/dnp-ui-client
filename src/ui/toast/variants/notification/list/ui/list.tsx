import { Provider, Viewport } from '@radix-ui/react-toast'
import { useEffect } from 'react'
import NotificationToast from '../../ui/notification'
import './list.scss'
import { useNotificationListStore } from '~/shared/notification-list-store'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'ui-Toast-v-Notification-list'

/**
 * ui-Toast-v-Notification-list
 */
export default function Component(props: Props): JSX.Element {
  const notificationList = useNotificationListStore().list

  return (
    <div className={c(props.className, displayName)}>
      <Provider>
        <Viewport>
          {notificationList.map((notificationProps, index) => {
            return <_Item key={notificationProps.id} index={index} />
          })}
        </Viewport>
      </Provider>
    </div>
  )
}

function _Item(props: { index: number }): JSX.Element {
  const { index } = props

  const { id, duration = 5000, open = true, ...notification } = useNotificationListStore((s) => s.list[index])

  useEffect(() => {
    setTimeout(() => setOpen(false), duration)
    // удаляем из стора через секунду после закрытия
    setTimeout(() => useNotificationListStore.getState().remove(id), duration + 1000)
  }, [duration, open, id])

  return <NotificationToast open={open} {...notification} onOpenChange={setOpen} />

  function setOpen(open: boolean) {
    useNotificationListStore.getState().patch({ id, open })
  }
}

Component.displayName = displayName
