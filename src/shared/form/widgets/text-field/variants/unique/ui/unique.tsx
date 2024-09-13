import { useQuery } from 'react-query'

import Flex from '~/shared/flex'
import Spinner from '~/shared/spinner'
import Text from '~/shared/text'
import { capitalize } from '~/utils/core'
import { useDebounce } from '~/utils/core-hooks'

import TextField, { type TextFieldProps } from '../../..'
import Hint from '../../../../hint'
import { NAME as PARENT_NAME } from '../../../ui/text-field'

export type Props = Omit<TextFieldProps<string>, 'name' | 'value' | 'type'> & {
  entityName: string
  checkUnique?: ((kn: string) => Promise<boolean>) | undefined
}

export const NAME = `${PARENT_NAME}-v-Unique`

/**
 * ui-Form-w-UniqueTextField
 */
export default function Component(props: Props) {
  const { checkUnique, entityName, ...textFieldProps } = props

  const [valueToCheckUniq, setValueToCheckUniqWithDelay] = useDebounce('', 500)

  const uniqChecker = useQuery(
    [`${entityName}.checkUnique${capitalize(props.input.name)}`, valueToCheckUniq],
    () => checkUnique?.(valueToCheckUniq),
    {
      enabled: Boolean(valueToCheckUniq),
      keepPreviousData: true,
      retry: false,
    },
  )

  return (
    <TextField
      {...textFieldProps}
      onChange={(e) => setValueToCheckUniqWithDelay(e.target.value)}
      renderHint={({ isErrorVisible: isShow, meta, input }) => {
        if (isShow) return <Hint type='error' content={meta.error.message || meta.submitError.message} />

        return (
          <Flex gap='2'>
            {uniqChecker.isError && input.value && (
              <Text size='1' color='red'>
                Ошибка запроса: Не удалось проверить
              </Text>
            )}
            {uniqChecker.isSuccess && input.value && (
              <Hint
                type={uniqChecker.data ? 'success' : 'error'}
                content={uniqChecker.data ? 'Уникальное название' : 'Такое название уже существует'}
              />
            )}
            {uniqChecker.isFetching && <Spinner />}
          </Flex>
        )
      }}
    />
  )
}
