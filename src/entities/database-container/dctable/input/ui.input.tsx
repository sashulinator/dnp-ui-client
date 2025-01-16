import { useState } from 'react'
import { useQuery } from 'react-query'

import Button from '~/shared/button'
import { InputCard } from '~/shared/card'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import Spinner from '~/shared/spinner'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { type Dictionary } from '~/utils/core'
import { useSubscribe, useSubscribeUpdate } from '~/utils/core-hooks'
import { useAtom } from '~/utils/store'

import { Dctable } from '../..'

export type Value = Dictionary<Dctable.ListTable.Item>

export interface Props {
  className?: string | undefined
  value: Value
  onChange: (value: Value) => void
  loading?: boolean | undefined
  fetchList: (
    sort: Dctable.ListTable.ItemSort | undefined,
    searchFilter: Dctable.ListTable.ItemSearchFilter | undefined,
  ) => Promise<{ items: Dctable.ListTable.Item[]; total: number }>
}

const NAME = 'dnp-databaseContainer-dctable-input'

export default function Component(props: Props): JSX.Element {
  const { loading, value, onChange } = props
  const openAtom = useAtom<boolean>(false)

  const [searchFilter, setSearchFilter] = useState<Dctable.ListTable.ListTableProps['searchFilter'] | undefined>(
    undefined,
  )
  const selectedItemsAtom = useAtom<Dictionary<Dctable.ListTable.Item>>({})
  const sortAtom = useAtom<Dctable.ListTable.ItemSort | undefined>(undefined)

  useSubscribeUpdate(openAtom.subscribe)
  useSubscribeUpdate(sortAtom.subscribe)
  useSubscribeUpdate(selectedItemsAtom.subscribe)
  useSubscribe(selectedItemsAtom.subscribe, onChange)

  const fetcher = useQuery([NAME, { searchFilter, sort: sortAtom.get() }], () =>
    props.fetchList(sortAtom.get(), searchFilter),
  )

  const valueList = Object.values(value)

  return (
    <>
      <InputCard.default style={{ width: '100%' }} onClick={() => openAtom.set(true)}>
        <Flex width='100%' justify='between' align='center'>
          <Flex direction='column'>
            <Tooltip content='Отображение'>
              <div>
                <Text color={valueList[0]?.display ? undefined : 'gray'}>
                  {valueList[0]?.display || 'БЕЗ ОТОБРАЖЕНИЯ'}
                </Text>
              </div>
            </Tooltip>
            <Tooltip content='Название'>
              <Text color='gray'>{valueList[0]?.name}</Text>
            </Tooltip>
          </Flex>
          <Flex align='center' gap='2' mr='4'>
            {!loading && valueList.length > 1 && (
              <Button color='amber' variant='surface' size='1' asChild={true}>
                <Flex>+{valueList.length - 1}</Flex>
              </Button>
            )}
            {loading && <Spinner />}
          </Flex>
        </Flex>
      </InputCard.default>

      <Dialog.Root open={openAtom.get()}>
        <Dialog.Content maxWidth='1224px'>
          <Dialog.Title>
            <Flex gap='1' align='center' justify='between'>
              <div></div>
              <Button round={true} variant='ghost' onClick={() => openAtom.set(false)}>
                <Icon name='Cross1' />
              </Button>
            </Flex>
          </Dialog.Title>

          <ScrollArea scrollbars='horizontal'>
            <Dctable.ListTable.default
              list={fetcher.data?.items || []}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter as any}
              sortAtom={sortAtom}
              selectedItemsAtom={selectedItemsAtom}
            />
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

Component.displayName = NAME
