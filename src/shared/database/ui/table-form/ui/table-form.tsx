import React from 'react'

import Button from '~dnp/shared/button'
import Flex from '~dnp/shared/flex'
import {
  Column,
  Field,
  FieldArray,
  Label,
  Row,
  TextArea,
  type TextAreaProps,
  TextField,
  type TextFieldProps,
} from '~dnp/shared/form'
import Icon from '~dnp/shared/icon'
import Tooltip from '~dnp/shared/tooltip'
import { c } from '~dnp/utils/core'
import { generateUniqId } from '~dnp/utils/core'

import { type Column as IColumn } from '../../../models/database'
import ColumnForm from '../../column-form'

export interface Props {
  className?: string | undefined
  primaryRequired: boolean
  fieldNames: {
    table: string
    tableDisplay: string
    description: string
    columns: string
  }
  strings: {
    table: string
    tableDisplay: string
    description: string
    columns: string
  }
}

const FLEX_BASIS = 'calc(25% - 6px)'

export const NAME = 'databaseTable-DatabaseTableForm'

/**
 * databaseTable-DatabaseTableForm
 */
export default function Component(props: Props): JSX.Element {
  const { fieldNames, strings, primaryRequired } = props

  return (
    <Column className={c(props.className, NAME)}>
      <Row>
        <Column width='50%'>
          <Field<string, TextFieldProps<string>, HTMLInputElement>
            label={
              <Flex gap={'1'}>
                {strings.tableDisplay}
                <Tooltip content={'Отображение в интерфейсе'}>
                  <span>
                    <Icon name={'InfoCircled'} />
                  </span>
                </Tooltip>
              </Flex>
            }
            name={fieldNames.tableDisplay}
            component={TextField}
          ></Field>
          <Field<string, TextFieldProps<string>, HTMLInputElement>
            label={
              <Flex gap={'1'}>
                {strings.table}
                <Tooltip content={'В базе данных'}>
                  <span>
                    <Icon name={'InfoCircled'} />
                  </span>
                </Tooltip>
              </Flex>
            }
            name={fieldNames.table}
            component={TextField}
          />
        </Column>
        <Column width='50%'>
          <Field<string, TextAreaProps<string>, HTMLInputElement>
            label={strings.description}
            name={fieldNames.description}
            component={TextArea}
          />
        </Column>
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
                        primaryRequired,
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
