import { type ForwardedRef, forwardRef } from 'react'

import Flex from '~/shared/flex'
import Input, { type InputProps } from '~/shared/input'
import { useQuery } from '~/shared/query'
import Spinner from '~/shared/spinner'
import { WithAvatar } from '~/shared/view'
import { capitalize } from '~/utils/core'

import type { DcserviceDisplay } from '../types'

export type Display = DcserviceDisplay

export interface Props extends Omit<InputProps, 'onChange' | 'children' | 'value'> {
  className?: string | undefined
  fetchDisplay: () => Promise<Display | undefined>
  fetcherDependencies: unknown[]
}

const NAME = 'dnp-databaseContainer-dcservice-input'

function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { loading, variant = 'soft', fetcherDependencies, fetchDisplay: fetchValue, ...inputCardProps } = props

  const valueFetcher = useQuery([NAME, ...fetcherDependencies], fetchValue)
  const value = valueFetcher.data

  return (
    <>
      <Input
        ref={ref}
        size={null}
        {...inputCardProps}
        variant={variant}
        style={{ width: '100%', padding: 'var(--space-2)', gap: 'var(--space-2)', ...inputCardProps.style }}
      >
        <Flex width='100%' justify='between' align='center'>
          <WithAvatar
            disabled={props?.disabled}
            style={{ overflow: 'hidden', width: '100%' }}
            title={value?.display}
            subtitle={value?.host && value?.port ? `${value?.host}:${value?.port}` : ''}
            iconName={capitalize(value?.client || 'Logo') as 'Postgres'}
          />
          <Flex align='center' gap='2'>
            {loading && <Spinner />}
          </Flex>
        </Flex>
      </Input>
    </>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef
