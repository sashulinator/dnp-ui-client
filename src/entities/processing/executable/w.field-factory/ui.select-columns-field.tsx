import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import Multiselect from '~/shared/multiselect'
import { preventDefault } from '~/utils/core-client'
import { useMeasure } from '~/utils/core-hooks'

import { SLICE } from '../constants'
import { type ParamFactoryContext } from './models'

export const NAME = `${SLICE}-w-StringField`

export default function Component(props: {
  value: string[]
  _paramContext: ParamFactoryContext
  onChange: (value: string[]) => void
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _paramContext, onChange, value } = props
  const [ref, measure] = useMeasure()

  return (
    <Flex direction='column'>
      <Labeled label={_paramContext.paramSchema.display}>
        <Multiselect.Root onValueChange={onChange} value={value}>
          <Multiselect.Trigger strings={{ selected: 'Выбрано' }} ref={ref} />
          {!!_paramContext.columns.length && (
            <Multiselect.Content style={{ width: measure.width || undefined }}>
              {_paramContext.columns.map((o) => {
                return (
                  <Multiselect.Item key={o.name} value={o.name} onClick={preventDefault}>
                    {o.name}
                  </Multiselect.Item>
                )
              })}
            </Multiselect.Content>
          )}
        </Multiselect.Root>
      </Labeled>
    </Flex>
  )
}

Component.displayName = NAME
