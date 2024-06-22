import { type Story, Props } from '~/ui/storybook'

import { useState } from 'react'
import TextField from '../'
import Button from '../'
import Flex from '~/ui/flex'
import Switch from '~/ui/switch'
import Text from '~/ui/text'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [isRound, setRound] = useState(false)
    const [isSquare, setSquare] = useState(false)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
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
        </Flex>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
