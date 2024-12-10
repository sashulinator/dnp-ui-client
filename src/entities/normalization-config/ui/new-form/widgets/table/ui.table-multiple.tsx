import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import { Select, type SelectMultipleOption, type SelectProps } from '~/shared/form'
import { c } from '~/utils/core'

import { SLICE } from '../../../../constants.slice'

export { type SelectMultipleOption as Option }

export type ProcessingDataType = 'initial' | 'operational' | 'target'

export interface Props extends Omit<SelectProps<string>, 'options'> {
  className?: string | undefined
  fetchStaleTime?: number | undefined
  fetchOptions: (inputProcessingDataType: ProcessingDataType) => Promise<SelectMultipleOption[]>
  processingDataType: ProcessingDataType
}

const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchOptions, fetchStaleTime = Infinity, processingDataType: inputProcessingDataType, ...selectProps } = props

  const fetcher = useQuery([NAME, inputProcessingDataType], () => fetchOptions(inputProcessingDataType), {
    staleTime: fetchStaleTime,
  })

  return <Select {...selectProps} className={c(props.className, NAME)} options={fetcher.data || []} />
}

Component.displayName = NAME
