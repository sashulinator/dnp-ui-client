import { memo } from 'react'

import { routes } from '~dnp/app/route'
import { type Row } from '~dnp/entities/dictionary-table'
import Button from '~dnp/shared/button'
import { RenderCounter } from '~dnp/shared/debug'
import Flex from '~dnp/shared/flex'
import { type FormApi } from '~dnp/shared/form'
import { Heading } from '~dnp/shared/page'
import { type SetterOrUpdater } from '~dnp/utils/core'

export interface Props {
  setFormToCreateOpen: SetterOrUpdater<boolean>
  formToCreate: FormApi<Row>
  name: string
}

const NAME = 'workingTable-page-Heading'

function Component(props: Props): JSX.Element {
  const { name, setFormToCreateOpen, formToCreate } = props

  return (
    <Flex width='100%' justify='between'>
      <RenderCounter name='heading' />
      <Heading.Root
        route={routes.dictionaryTables_explorerFindManyAndCount}
        backRoute={routes.dictionaryTables_findManyAndCount}
        renderIcon={routes.dictionaryTables_findManyAndCount.payload.renderIcon}
      >
        <Heading.BackToParent />
        <Heading.Unique string={name} tooltipContent={routes.dictionaryTables_explorerFindManyAndCount.getName()} />
      </Heading.Root>
      <Flex>
        <Button
          onClick={() => {
            formToCreate.initialize({})
            setFormToCreateOpen(true)
          }}
        >
          Создать
        </Button>
      </Flex>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = NAME
export default Memoed
