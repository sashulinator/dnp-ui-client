import React from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { FieldArray } from '~/shared/form'
import Icon from '~/shared/icon'
import { c, generateUniqId } from '~/utils/core'

import _renderColumn from '../ui/widgets/columns'

type Item = {
  id: string
  key: string
  name: string
  type: string
  relation?: {
    table: string
    key: string
  }
}

export interface Props {
  className?: string | undefined
  name: string
}

export const NAME = 'table-Form-w-Columns'

const FLEX_BASIS = 'calc(25% - 6px)'

/**
 * table-Form-w-Columns'
 */
export default function Component(props: Props): JSX.Element {
  const { name } = props

  return (
    <Flex width='100%' wrap='wrap' gap='2'>
      <FieldArray<Item> name={name} className={c(props.className, NAME)}>
        {({ fields }) => {
          return (
            <>
              {fields.map((name, index) =>
                React.createElement(_renderColumn, {
                  key: name,
                  name,
                  index,
                  move: fields.move,
                  remove: fields.remove,
                  length: fields.length || 0,
                }),
              )}
              <Button
                type='button'
                onClick={() =>
                  fields.push({
                    id: generateUniqId(3, (id) => !fields.value.find((item) => item.id === id)),
                    key: '',
                    name: '',
                    type: 'string',
                  })
                }
                variant='outline'
                asChild
                style={{
                  display: 'flex',
                  height: '14.5rem',
                  order: fields.length,
                  flexBasis: FLEX_BASIS,
                }}
              >
                <Flex align='center' justify='center'>
                  <Icon name='Plus' style={{ scale: '3' }} />
                </Flex>
              </Button>
            </>
          )
        }}
      </FieldArray>
    </Flex>
  )
}

Component.displayName = NAME
