import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import { SelectMultiple, type SelectMultipleOption, type SelectMultipleProps } from '~/shared/form'
import { c } from '~/utils/core'

import { SLICE } from '../../../../constants.slice'

export { type SelectMultipleOption as Option }

export interface Props extends Omit<SelectMultipleProps, 'options'> {
  className?: string | undefined
  fetchStaleTime?: number | undefined
  fetchOptions: () => Promise<SelectMultipleOption[]>
}

const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchOptions, fetchStaleTime = Infinity, ...selectProps } = props

  const fetcher = useQuery([''], fetchOptions, { staleTime: fetchStaleTime })

  return <SelectMultiple {...selectProps} className={c(props.className, NAME)} options={fetcher.data || []} />
}

Component.displayName = NAME
