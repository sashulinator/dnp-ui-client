import { type Props, type Story } from '~/shared/storybook'

import OptionFilter from './index'

interface State {
  // Определите состояние, если необходимо
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <OptionFilter
          onSubmit={() => {
            // console.log(e,e1)
          }}
          options={[
            {
              value: '1',
              display: '1',
            },
            {
              value: '2',
              display: '2',
            },
            {
              value: '33',
              display: '33',
            },
          ]}
          {...state}
        />
      </div>
    )
  },

  controls: [
    // ... существующий код ...
  ],

  getName: (): string => OptionFilter.displayName, // Исправленный доступ к displayName
} satisfies Story<State>
