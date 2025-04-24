import { TextArea } from '@radix-ui/themes'

import { useState } from 'react'

import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import { InputSelect } from '~/shared/select'
import Text from '~/shared/text'
import TextInput from '~/shared/text-input'

import { SLICE } from '../constants'
import { type ParamFactoryContext } from './models'

export const NAME = `${SLICE}-w-StringField`

type Value = {
  'url-gp': string
  query?: string | undefined
  column?: string | undefined
  before?: string | undefined
}

export default function Component(props: {
  _paramContext: ParamFactoryContext
  onChange: (value: Value) => void
  value: Value
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _paramContext, onChange, value, ...textFieldProps } = props

  const [isLocalSql, setIsLocalSql] = useState(false)

  return (
    <Flex direction='column' gap='2'>
      <Flex direction='column'>
        <Labeled label='Greenplum URL'>
          <TextInput value={value['url-gp'] || ''} onValueChange={(v) => onChange({ ...value, 'url-gp': v })} />
        </Labeled>
      </Flex>
      <Flex gap='2' align='center'>
        <Checkbox checked={isLocalSql} onCheckedChange={_clearOnIsLocalSqlCheckedChange} />
        <Text as='label' size='2'>
          Использовать локальный SQL запрос
        </Text>
      </Flex>
      {isLocalSql ? (
        <Flex direction='column'>
          <Labeled label='Query'>
            <TextArea value={value['query'] || ''} onChange={(e) => onChange({ ...value, query: e.target.value })} />
          </Labeled>
        </Flex>
      ) : (
        <Flex direction='column' gap='2' width='400px'>
          <Flex direction='column'>
            <Labeled label='Statement'>
              <InputSelect.default
                value={value['column'] || ''}
                onValueChange={(v) => onChange({ ...value, column: v })}
                options={[
                  { value: 'ddl_statement', display: 'DDL' },
                  { value: 'pxf_statement', display: 'PXF' },
                  { value: 'insert_statement', display: 'Insert' },
                ]}
              />
            </Labeled>
          </Flex>
          <Flex direction='column'>
            <Labeled label='Before'>
              <InputSelect.default
                value={value['before'] || ''}
                onValueChange={(v) => onChange({ ...value, before: v })}
                options={[
                  { value: 'drop', display: 'drop' },
                  { value: 'truncate', display: 'truncate' },
                ]}
              />
            </Labeled>
          </Flex>
        </Flex>
      )}
    </Flex>
  )

  // Private

  function _clearOnIsLocalSqlCheckedChange(v: unknown) {
    setIsLocalSql(!!v)
    onChange({ 'url-gp': value['url-gp'] })
  }
}

Component.displayName = NAME
