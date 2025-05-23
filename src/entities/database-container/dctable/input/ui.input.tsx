import Flex from '~/shared/flex'
import Input, { type InputProps } from '~/shared/input'
import { useQuery } from '~/shared/query'
import Spinner from '~/shared/spinner'
import { WithAvatar } from '~/shared/view'

export type Value = {
  name: string
  display?: string | undefined
}

export interface Props extends Omit<InputProps, 'onChange' | 'children' | 'value' | 'hasValue'> {
  className?: string | undefined
  fetchValue: () => Promise<Value[] | Value | undefined>
  fetcherDependencies: unknown[]
}

const NAME = 'dnp-databaseContainer-dctable-input'

export default function Component(props: Props): JSX.Element {
  const { loading, variant = 'soft', fetcherDependencies, fetchValue, ...inputCardProps } = props

  const valueFetcher = useQuery([NAME, ...fetcherDependencies], fetchValue)
  const value = buildValue()

  return (
    <>
      <Input
        size={null}
        {...inputCardProps}
        variant={variant}
        hasValue={!!value?.name}
        style={{ width: '100%', padding: 'var(--space-2)', gap: 'var(--space-2)', ...inputCardProps.style }}
      >
        <Flex width='100%' justify='between' align='center'>
          <WithAvatar
            disabled={props?.disabled}
            style={{ overflow: 'hidden', width: '100%' }}
            title={value?.name}
            subtitle={value?.display}
            iconName='Table'
          />
          <Flex align='center' gap='2'>
            {(loading || valueFetcher.isFetching) && <Spinner />}
          </Flex>
        </Flex>
      </Input>
    </>
  )

  function buildValue(): Value | undefined {
    if (!Array.isArray(valueFetcher.data)) return valueFetcher.data
    if (valueFetcher.data.length > 1) return { name: `Выбрано (${valueFetcher.data.length})` }
    if (valueFetcher.data.length === 1) return valueFetcher.data[0]
    return undefined
  }
}

Component.displayName = NAME
