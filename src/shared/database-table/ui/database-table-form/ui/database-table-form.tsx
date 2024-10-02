import React from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { Column, Field, FieldArray, Label, Row, TextField, type TextFieldProps } from '~/shared/form'
import Icon from '~/shared/icon'
import { c } from '~/utils/core'
import { generateUniqId } from '~/utils/core'

import { type Column as IColumn } from '../../../models/database-table'
import ColumnForm from '../../column-form'

export interface Props {
  className?: string | undefined
  fieldNames: {
    table: string
    tableDisplay: string
    columns: string
  }
  strings: {
    table: string
    tableDisplay: string
    columns: string
  }
}

const FLEX_BASIS = 'calc(25% - 6px)'

export const NAME = 'databaseTable-DatabaseTableForm'

/**
 * databaseTable-DatabaseTableForm
 */
export default function Component(props: Props): JSX.Element {
  const { fieldNames, strings } = props

  return (
    <Column className={c(props.className, NAME)}>
      <Row>
        <Column width='50%'>
          <Field<string, TextFieldProps<string>, HTMLInputElement>
            label={strings.tableDisplay}
            name={fieldNames.tableDisplay}
            component={TextField}
          />
          <Field<string, TextFieldProps<string>, HTMLInputElement>
            label={strings.table}
            name={fieldNames.table}
            component={TextField}
          />
        </Column>
        <Flex width='50%' />
      </Row>
      <Column>
        <Flex direction='column'>
          <Label children={strings.columns} />
          <Flex width='100%' wrap='wrap' gap='2'>
            <FieldArray<IColumn> name={fieldNames.columns} className={c(props.className, NAME)}>
              {({ fields }) => {
                return (
                  <>
                    {fields.map((name, index) =>
                      React.createElement(ColumnForm, {
                        key: name,
                        name,
                        index,
                        move: fields.move,
                        remove: fields.remove,
                        length: fields.length || 0,
                        rootProps: {
                          style: { flexBasis: FLEX_BASIS },
                        },
                      }),
                    )}
                    <Button
                      type='button'
                      onClick={() =>
                        fields.push({
                          id: generateUniqId(3, (id) => !fields.value?.find((item) => item.id === id)),
                          columnName: '',
                          maxLength: 50,
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
        </Flex>
      </Column>
    </Column>
  )
}

Component.displayName = NAME
