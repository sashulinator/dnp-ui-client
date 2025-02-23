import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'
import Switch from '~/shared/switch'
import Text from '~/shared/text'

import TextField, { TileButton } from '..'
import Button from '..'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [isRound, setRound] = useState(false)
    const [isSquare, setSquare] = useState(false)
    const [isTransparent, setTransparent] = useState(false)

    return (
      <Flex direction={'column'} p='8' gap='4'>
        <Button round={isRound} square={isSquare} {...state}>
          Button
        </Button>
        <Flex direction='column'>
          <Text as='label'>
            <Switch size='1' checked={isRound} onCheckedChange={(checked) => setRound(checked)} />
            round
          </Text>
          <Text as='label'>
            <Switch size='1' checked={isSquare} onCheckedChange={(checked) => setSquare(checked)} />
            square
          </Text>
          <Text as='label'>
            <Switch size='1' checked={isTransparent} onCheckedChange={(checked) => setTransparent(checked)} />
            transparent
          </Text>
        </Flex>
        <Flex direction='row'>
          <TileButton
            iconName='Star'
            text={
              <>
                Настройка <h1>таблицы</h1> таблицы Очень большое название
              </>
            }
          />
        </Flex>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
