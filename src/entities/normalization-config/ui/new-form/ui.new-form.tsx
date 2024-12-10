import { useState } from 'react'

import { APP } from '~/app/constants.app'
import Flex from '~/shared/flex'
import { Card, Column, Label, Row, TypedField, useForm } from '~/shared/form'
import Select from '~/shared/select'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import { SLICE } from '../../constants.slice'
import Table from './widgets/table'
import TableMultiple, { type Option } from './widgets/table-multiple'
import { type ProcessingDataType } from './widgets/table-multiple/ui.table-multiple'

export { type ProcessingDataType as InputProcessingDataType }

const options = [
  { value: 'initial', display: 'Исходные' },
  { value: 'operational', display: 'Операционные' },
  { value: 'target', display: 'Целевые' },
]

export interface Props {
  className?: string | undefined
  fetchInputTablesOptions: (inputProcessingDataType: ProcessingDataType) => Promise<Option[]>
}

const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchInputTablesOptions } = props

  const [inputProcessingDataType, setInputProcessingDataType] = useState<ProcessingDataType>('initial')
  const [outputProcessingDataType, setOutputProcessingDataType] = useState<ProcessingDataType>('initial')

  const form = useForm()

  return (
    <Column className={c(props.className, NAME)}>
      <Card>
        <Text size='1' color='gray'>
          Вход
        </Text>
        <Row>
          <Column width='50%'>
            <Flex width='100%' direction='column'>
              <Label>Тип таблиц</Label>
              <Select.Root
                defaultValue='initial'
                value={inputProcessingDataType}
                onValueChange={(value) => {
                  setInputProcessingDataType(value as ProcessingDataType)
                  form.change('inputTables', undefined)
                }}
              >
                <Select.Trigger variant='soft' />
                <Select.Content>
                  <Select.Group>
                    {options.map((option, i) => {
                      return (
                        <Select.Item key={i} {...option}>
                          {option.display}
                        </Select.Item>
                      )
                    })}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Column>
          <Column width='50%'>
            <TypedField
              label='Таблицы'
              name='inputTables'
              component={TableMultiple}
              processingDataType={inputProcessingDataType}
              fetchOptions={fetchInputTablesOptions}
            />
          </Column>
        </Row>
      </Card>
      <Card>
        <Text size='1' color='gray'>
          Результат
        </Text>
        <Row>
          <Column width='50%'>
            <Flex width='100%' direction='column'>
              <Label>Тип таблиц</Label>
              <Select.Root
                defaultValue='initial'
                value={outputProcessingDataType}
                onValueChange={(value) => {
                  setOutputProcessingDataType(value as ProcessingDataType)
                  form.change('outputTables', undefined)
                }}
              >
                <Select.Trigger variant='soft' />
                <Select.Content>
                  <Select.Group>
                    {options.map((option, i) => {
                      return (
                        <Select.Item key={i} {...option}>
                          {option.display}
                        </Select.Item>
                      )
                    })}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Column>
          <Column width='50%'>
            <TypedField
              label='Таблицы'
              name='outputTables'
              component={Table}
              processingDataType={outputProcessingDataType}
              fetchOptions={fetchInputTablesOptions}
            />
          </Column>
        </Row>
      </Card>
    </Column>
  )
}

Component.displayName = NAME
