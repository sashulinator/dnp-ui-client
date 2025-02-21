import { TextArea } from '@radix-ui/themes'

import { useState } from 'react'

import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import { Field } from '~/shared/form'
import Labeled from '~/shared/labeled'
import { InputSelect } from '~/shared/select'
import Text from '~/shared/text'
import TextInput from '~/shared/text-input'

import { SLICE } from '../constants'
import { type ParamFactoryContext } from './models'

export const NAME = `${SLICE}-w-StringField`

type Value = {
  'url-gp': string
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
          <Field<string> name={`${_paramContext.name}.url-gp`}>{({ input }) => <TextInput {...input} />}</Field>
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
            <Field<string> name={`${_paramContext.name}.query`}>{({ input }) => <TextArea {...input} />}</Field>
          </Labeled>
        </Flex>
      ) : (
        <Flex direction='column' gap='2' width='400px'>
          <Flex direction='column'>
            <Labeled label='Statetment'>
              <Field<string> name={`${_paramContext.name}.column`}>
                {({ input }) => (
                  <InputSelect.default
                    {...input}
                    options={[
                      { value: 'ddl_statetment', display: 'DDL' },
                      { value: 'pxf_statetment', display: 'PFX' },
                      { value: 'insert_statetment', display: 'Insert' },
                    ]}
                  />
                )}
              </Field>
            </Labeled>
          </Flex>
          <Flex direction='column'>
            <Labeled label='Before'>
              <Field<string> name={`${_paramContext.name}.before`}>
                {({ input }) => (
                  <InputSelect.default
                    {...input}
                    options={[
                      { value: 'drop', display: 'drop' },
                      { value: 'truncate', display: 'truncate' },
                    ]}
                  />
                )}
              </Field>
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
