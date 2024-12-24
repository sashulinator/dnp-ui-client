import { InputCard } from '~/shared/card'
import Flex from '~/shared/flex'
import Text from '~/shared/text'
import { c } from '~/utils/core'
import { useAsync } from '~/utils/core-hooks'

import { type Dcservice } from '../../../models'
import DcserviceCard from '../ui.card'

export type InputDcservice = Pick<Dcservice, 'host' | 'port' | 'display'>

export interface Props extends Omit<InputCard.InputProps, 'children' | 'value' | 'onChange'> {
  className?: string | undefined
  value: string | undefined // id
  fetchValue: (id: string) => Promise<InputDcservice | undefined>
}

const NAME = 'dnp-databaseContainer-dcservice-InputCard'

export default function Component(props: Props): JSX.Element {
  const { value, fetchValue, ...inputCard } = props

  const fetcher = useAsync(undefined, () => fetchValue?.(value as string), { isEnabled: Boolean(value) })

  return (
    <InputCard.default loading={fetcher.isPending} {...inputCard} className={c(props.className, NAME)}>
      <Flex width='100%' align='center'>
        {fetcher.isError ? (
          <Text color='red'>Не удалось загрузить</Text>
        ) : (
          <DcserviceCard dcservice={fetcher.isSuccess ? fetcher.data : undefined} />
        )}
      </Flex>
    </InputCard.default>
  )
}

Component.displayName = NAME
