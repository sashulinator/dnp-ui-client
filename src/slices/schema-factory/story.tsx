import { useCallback, useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import type { Props, Story } from '~/shared/storybook'
import { generateId } from '~/utils/core'
import { useForceUpdate } from '~/utils/core-hooks'

import LayoutSchema from '../../shared/layout-schema'
import { type Block, type ComponentProps } from '../../shared/layout-schema/models'
import { componentMap } from './constants'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const update = useForceUpdate()

    const [schema, setSchema] = useState(rootBlock)

    const form = useCreateForm(
      {
        onSubmit: (...args) => {
          // eslint-disable-next-line no-console
          console.log(...args)
          update()
        },
        // mutators: { ...arrayMutators },
      },
      { values: true },
    )

    return (
      <Flex p='30px' gap='l'>
        <Flex direction='column' gap='xxxl'>
          <button onClick={(): void => void form.submit()}>Submit</button>
          <Flex style={{ border: '1px solid red' }}>
            <Form
              form={form}
              {...state}
              component={useCallback(
                (): JSX.Element => (
                  <LayoutSchema context={{ hello: 'hello' }} componentMap={componentMap} rootBlock={schema} />
                ),
                [],
              )}
            />
          </Flex>
        </Flex>
        <Flex>
          <Button
            size='1'
            onClick={() => {
              setSchema((schema) => {
                const newSchema = { ...schema }
                // prettier-ignore
                // @ts-ignore
                newSchema.data.children = [...newSchema.data.children, { ...newSchema.data.children[0], id: generateId() }]
                return newSchema
              })
            }}
          >
            Добавить в схему
          </Button>
          <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form.getState().values, null, 4)}</code>
        </Flex>
      </Flex>
    )
  },

  controls: [],

  getName: (): string => LayoutSchema.displayName,
} satisfies Story<State>

/**
 * Private
 */

const rootBlock: Block = {
  name: 'Flex',
  id: 'flex1',
  props: {
    direction: 'column',
  },
  children: [
    {
      name: 'Flex',
      id: 'flex3',
      props: {
        direction: 'column',
      },
    },
    {
      name: 'TextField',
      id: 'common.count',
      props: {
        label: 'common.count',
        name: 'common.count',
        className: 'story-text',
        children: 'button2',
        onPropsChange: (props: ComponentProps<{ value: string }>, prevProps: ComponentProps<{ value: string }>) => {
          props?.context?.blocks['flex3'].setProps({
            content: `new Value: ${props?.value}||| prev Value: ${prevProps?.value}`,
          })
        },
      },
    },
    {
      name: 'Button',
      id: 'button1',
      props: {
        className: 'story-text',
        content: 'button1click',
        round: true,
        onClick(e: unknown, props: ComponentProps) {
          props.context.blocks['common.count'].setProps({ value: '' })
        },
      },
    },
  ],
}
