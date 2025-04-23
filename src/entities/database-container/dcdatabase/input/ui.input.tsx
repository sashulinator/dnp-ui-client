import Flex from '~/shared/flex'
import Input, { type InputProps } from '~/shared/input'
import { useQuery } from '~/shared/query'
import Spinner from '~/shared/spinner'
import { WithAvatar } from '~/shared/view'

export type Value = {
  name: string
  display?: string | undefined
}

export interface Props extends Omit<InputProps, 'onChange' | 'children' | 'value'> {
  className?: string | undefined
  fetchValue: () => Value | undefined
  fetcherDependencies: unknown[]
}

const NAME = 'dnp-databaseContainer-dcdatabase-input'

export default function Component(props: Props): JSX.Element {
  const { loading, variant = 'soft', fetcherDependencies, fetchValue, ...inputCardProps } = props

  const valueFetcher = useQuery([NAME, ...fetcherDependencies], fetchValue)
  const value = valueFetcher.data

  return (
    <>
      <Input
        size={null}
        {...inputCardProps}
        variant={variant}
        style={{ width: '100%', padding: 'var(--space-2)', gap: 'var(--space-2)', ...inputCardProps.style }}
      >
        <Flex width='100%' justify='between' align='center'>
          <WithAvatar
            disabled={props?.disabled}
            style={{ overflow: 'hidden', width: '100%' }}
            title={value?.name}
            subtitle={value?.display}
            iconName='Database'
          />
          <Flex align='center' gap='2'>
            {loading && <Spinner />}
          </Flex>
        </Flex>
      </Input>
    </>
  )
}

Component.displayName = NAME
