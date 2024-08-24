import { memo, useId } from 'react'
import { useField } from 'react-final-form'
import { useQuery } from 'react-query'
import { Values } from '../types/values'
import Columns from '../widgets/columns'
import Flex from '~/ui/flex'
import { Checkbox, Card, Column, Label, Row, Select, TextField, TextFieldProps, Field, Hint } from '~/ui/form'
import Spinner from '~/ui/spinner'
import Text from '~/ui/text'
import UiTextField from '~/ui/text-field'
import { c, fns } from '~/utils/core'
import { useDebounce } from '~/utils/core-hooks'

export interface Props {
  className?: string | undefined
  readonly?: boolean
  isKnUniq?: ((kn: string) => Promise<boolean>) | undefined
}

export const displayName = 'operationalTable-Form'

/**
 * operationalTable-Form
 */
export function Component(props: Props): JSX.Element {
  return (
    <Flex className={c(props.className, displayName)} direction='column' width='100%' gap='6'>
      <Card>
        <Column>
          <Row style={{ width: '100%' }}>
            <_KnField
              isKnUniq={props.isKnUniq}
              variant='soft'
              name='kn'
              label='Системное название'
              rootProps={{ flexBasis: '25%' }}
            />
            <Flex width='75%' />
          </Row>
          <Row style={{ width: '100%' }}>
            <Checkbox variant='soft' name='nav' label='Отображать в навигационной панели' />
          </Row>
        </Column>
      </Card>

      <Card>
        <Row>
          <Column width='25%'>
            <TextField variant='soft' name='name' label='Название' rootProps={{ width: '100%' }} />
            <Select
              label='Представление по умолчанию'
              name='tableSchema.defaultView'
              defaultValue='table'
              rootProps={{ width: '100%' }}
              options={[
                { value: 'table', display: 'Таблица' },
                { value: 'tree', display: 'Дерево' },
              ]}
            />
          </Column>
          <Flex width='75%' />
        </Row>
      </Card>

      <Card>
        <Column>
          <Row>
            <Column width='25%'>
              <TextField variant='soft' name='tableName' label='Таблица' rootProps={{ width: '100%' }} />
            </Column>
            <Flex width='75%' />
          </Row>
          <Column>
            <Flex direction='column'>
              <Label content='Колонки' />
              <Columns name='tableSchema.items' />
            </Flex>
          </Column>
        </Column>
      </Card>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed

/**
 * Private
 */
interface _KnFieldProps extends TextFieldProps {
  isKnUniq?: ((kn: string) => Promise<boolean>) | undefined
}

function _KnField(props: _KnFieldProps) {
  const { isKnUniq, rootProps, ...textFieldProps } = props

  const createdAtValue = useField<Values>('createdAt', { subscription: { value: true } })
  const readOnly = Boolean(createdAtValue.input.value)

  console.log('createdAtValue', createdAtValue.input.value)

  const id = useId()
  const [valueToCheck, setValueToCheckWithDelay] = useDebounce('', 500)

  const uniqChecker = useQuery(['operationTable.uniqChecker', valueToCheck], () => isKnUniq?.(valueToCheck), {
    enabled: !readOnly && Boolean(valueToCheck),
    keepPreviousData: true,
    retry: false,
  })

  return (
    <Field<string, HTMLInputElement, string> name={props.name}>
      {({ input, meta }) => {
        const showError = (meta.error || meta.submitError) && meta.touched

        return (
          <Flex direction='column' width='100%' {...rootProps}>
            <Label content='Системное название' htmlFor={id} />
            <UiTextField.Root
              id={id}
              readOnly={readOnly}
              color={showError ? 'red' : undefined}
              {...textFieldProps}
              {...input}
              onChange={fns(input.onChange, (e) => setValueToCheckWithDelay(e.target.value))}
              type='text'
            />
            <Flex>
              {showError ? (
                <Hint type='error' content={meta.error.message || meta.submitError.message} />
              ) : (
                <>
                  {uniqChecker.isError && !readOnly && input.value && (
                    <Text color='red'>Ошибка запроса: Не удалось проверить</Text>
                  )}
                  {uniqChecker.isSuccess && !readOnly && input.value && (
                    <Hint
                      type={uniqChecker.data ? 'success' : 'error'}
                      content={uniqChecker.data ? 'Уникальное название' : 'Такое название уже существует'}
                    />
                  )}
                  {uniqChecker.isFetching && <Spinner />}
                </>
              )}
            </Flex>
          </Flex>
        )
      }}
    </Field>
  )
}
