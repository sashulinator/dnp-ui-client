import { FieldArray } from 'react-final-form-arrays'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import Button from '~/shared/button'
import Flex from '~/shared/flex'

import { SLICE } from '../../constants'
import { type Procedure as IProcedure } from '../../w.procedure'
import Procedure from '../../w.procedure/ui/schema-form/ui.schema-form'

type Values = {
  name: string
}

export interface Props {
  className?: string | undefined
  feftchProcedures: () => Promise<IProcedure[]>
}

const NAME = `${APP}-${SLICE}-Form-w-ProceduresBlock`

export default function Component(props: Props): JSX.Element {
  const { feftchProcedures } = props

  const procedureListfetcher = useQuery([NAME, 'procedureList'], () => feftchProcedures(), {
    staleTime: Infinity,
  })

  return (
    <FieldArray<Values> name='procedures'>
      {({ fields }) => {
        return (
          <Flex width='100%' direction='column'>
            <Flex className='list' width='100%' direction='column' gap='4'>
              {fields.map((name, index) => {
                return <Procedure key={index} name={name} procedures={procedureListfetcher.data || []} />
              })}
            </Flex>
            <Flex className='actions' mt='4'>
              <Button onClick={() => fields.push({} as any)}>Добавить</Button>
            </Flex>
          </Flex>
        )
      }}
    </FieldArray>
  )
}

Component.displayName = NAME
