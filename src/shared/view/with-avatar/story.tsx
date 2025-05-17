import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import WithAvatar, { type Props as WithAvatarProps, description } from './ui.with-avatar'

type State = Pick<WithAvatarProps, 'loading'>

export default {
  getName: (): string => 'ui-view-with-avatar',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex direction='column' gap='4'>
        <pre>{description}</pre>
        <Flex
          width='200px'
          style={{ border: '1px solid red', resize: 'horizontal', overflow: 'auto' }}
          direction={'column'}
          gap='4'
        >
          <WithAvatar
            {...state}
            title='titletitletitletitletitletitletitletitletitletitletitletitle'
            subtitle='subtitlesubtitlesubtitlesubtitlesubtitle'
            iconName='Postgres'
          />
        </Flex>
      </Flex>
    )
  },

  controls: [
    {
      input: 'Switch',
      defaultValue: false,
      path: ['loading'],
      label: 'loading',
    },
    {
      input: 'Switch',
      defaultValue: false,
      path: ['disabled'],
      label: 'disabled',
    },
  ],
} satisfies Story<State>
