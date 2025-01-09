import React, { useCallback, useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Form, { TypedStringField, useCreateForm } from '~/shared/form'
import type { Props, Story } from '~/shared/storybook'
import { type Any, generateId } from '~/utils/core'
import { useForceUpdate } from '~/utils/core-hooks'
import { swap } from '~/utils/list'

import ReactComponentFactory from '..'
import { type Schema } from '../models'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const update = useForceUpdate()

    const [schema, setSchema] = useState(initSchema)

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
          <Form
            form={form}
            {...state}
            component={useCallback(
              (): JSX.Element => (
                <ReactComponentFactory context={{ hello: 'hello' }} componentMap={componentMap} schema={schema} />
              ),
              [],
            )}
          />
        </Flex>
        <Flex>
          <Button
            size='1'
            onClick={() => {
              setSchema((schema) => {
                const newSchema = { ...schema }
                newSchema.block.children = swap(0, 1, newSchema.block.children || [])
                return newSchema
              })
            }}
          >
            Поменять схему
          </Button>
          <Button
            size='1'
            onClick={() => {
              setSchema((schema) => {
                const newSchema = { ...schema }
                // prettier-ignore
                // @ts-ignore
                newSchema.block.children = [...newSchema.block.children, { ...newSchema.block.children[0], id: generateId() }]
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

  getName: (): string => ReactComponentFactory.displayName,
} satisfies Story<State>

/**
 * Private
 */

const initSchema: Schema = {
  bindings: [
    {
      script: `() => {
        // console.log($)
      }
      `,
    },
    {
      selector: ['button1'],
      events: ['onClick'],
      script: `() => {
        console.log($.props, $.setProps)
        if ($.props?.color === "amber") {
          $.setProps((s) => ({ ...s, color: 'green' }))
        } else {
          $.setProps((s) => ({ ...s, color: 'amber' }))
        }
      }`,
    },
    {
      selector: ['button1'],
      events: ['onInit'],
      script: `() => {
        $.setProps((s) => ({ ...s, color: 'pink' }))
      }
        `,
    },
  ],
  block: {
    name: 'Flex',
    id: 'flex1',
    props: {
      direction: 'column',
    },
    children: [
      {
        name: 'Button',
        id: 'button1',
        props: {
          className: 'story-text',
          children: 'button1click',
          $onClick: `(e) => {
            console.log('helloddddd', e)
          }`,
        },
      },
      {
        name: 'Button',
        id: 'button2',
        props: { className: 'story-text', children: 'button2' },
      },
      {
        name: 'TextField',
        id: 'common.count',
        props: {
          label: 'common.count',
          name: 'common.count',
          className: 'story-text',
          $onChange: `(e) => {
            console.log('onChange', e)
          }`,
          children: 'button2',
        },
      },
      {
        name: 'TextField',
        id: 'table.count',
        props: {
          label: 'table.count',
          name: 'single.table.count',
          className: 'story-text',
          children: 'button2',
        },
      },
    ],
  },
}

const componentMap = {
  Button: {
    render: FactoryButton,
  },
  TextField: {
    passContextProp: false,
    render: TypedStringField,
  },
  Flex: {
    passContextProp: false,
    render: Flex,
  },
}

type PropsWithContext = { context: Record<string, Any> }

function FactoryButton(props: PropsWithContext): React.ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, ...buttonProps } = props

  return <Button {...buttonProps} />
}
