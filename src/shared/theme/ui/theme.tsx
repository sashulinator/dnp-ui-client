import { Theme } from '@radix-ui/themes'

import { useEffect, useState } from 'react'

import { eventBus } from '~/shared/event-bus'

import { getCurrentName } from '../lib/get-current-name'

export interface Props {
  children: React.ReactNode
}

const displayName = 'ui-Theme'

/**
 * ui-Theme
 */
export default function Component(props: Props): JSX.Element {
  const [appearance, setAppearance] = useState(getCurrentName)
  useEffect(() => eventBus.on('setTheme', setAppearance), [])

  return <Theme appearance={appearance}>{props.children}</Theme>
}

Component.displayName = displayName
