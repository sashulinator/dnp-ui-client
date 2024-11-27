import './style.scss'

import { Flex, Text } from '@radix-ui/themes'

import type { IconName } from '~/shared/icon'
import { _renderIcon } from '~/shared/icon'
import { c } from '~/utils/core'

import Button, { type ButtonProps } from '../../button'

export interface Props extends ButtonProps {
  text?: React.ReactNode
  iconName: IconName | string
}

const NAME = 'button-Tile'

export default function Component(props: Props): JSX.Element {
  const { text, iconName, ...buttonProps } = props

  return (
    <Button {...buttonProps} className={c(props.className, Component.displayName)}>
      <Flex direction='column' align='center' gap='1' pt={'4px'} pb={'4px'}>
        <_renderIcon iconName={iconName} width={30} height={30} />
        <Text className='button-tile-text' size='1'>
          {text}
        </Text>
      </Flex>
    </Button>
  )
}

Component.displayName = NAME
