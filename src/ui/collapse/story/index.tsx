import { Story, Props } from '~/ui/storybook'

import { useState } from 'react'
import Collapse from '../ui/collapse'

interface State {
  expanded: boolean
  content: boolean
  animation: boolean
}

export default {
  getName: (): string => Collapse.displayName || '',

  render: function Element(): JSX.Element {
    const [expanded, setExpanded] = useState(true)

    return (
      <>
        <button onClick={() => setExpanded(!expanded)}>expand toggle</button>
        <Collapse
          isExpanded={expanded}
          // from={animation ? { opacity: expanded ? 0 : 1, y: 0 } : undefined}
          // to={animation ? { opacity: expanded ? 1 : 0, y: expanded ? 0 : 20 } : undefined}
          style={{ background: 'blue' }}
        >
          <p>Hello</p>
          <p>World</p>
        </Collapse>
      </>
    )
  },

  controls: [
    // { name: 'expanded', input: 'checkbox', defaultValue: true },
    // { name: 'content', input: 'checkbox', defaultValue: true },
    // { name: 'animation', input: 'checkbox', defaultValue: false },
  ],
} satisfies Story<State>
