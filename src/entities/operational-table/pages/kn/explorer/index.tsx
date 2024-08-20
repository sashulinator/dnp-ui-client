import { Dialog } from '@radix-ui/themes'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NAME_ONE } from '../../../constants/name'
import { Item, Viewer } from '~/entities/explorer'
import { TableSchemaItem } from '~/entities/operational-table'
import { api } from '~/entities/operational-table'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/layout/variants/heading'
import Pagination from '~/ui/pagination'
import Section from '~/ui/section'
import { TableListColumn } from '~/ui/table'
import Text from '~/ui/text'
import TextHighlighter from '~/ui/text-highlighter'
import { isInteger, isString } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = `page-${NAME_ONE.replace(/ /, '')}_id`

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const [item, setItem] = useState<null | Item>(null)

  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 10

  const exploreFetcher = api.explore.useCache({ kn, skip, take }, { keepPreviousData: true })

  // Update skip when page changes
  useEffect(() => {
    setSkip((page - 1) * take)
  }, [page])

  const columns = useMemo(
    () => (exploreFetcher.data ? tableSchemaToColumns(exploreFetcher.data.operationalTable.tableSchema.items) : []),
    [exploreFetcher.data],
  )

  return (
    <main className={displayName}>
      <Dialog.Root open={Boolean(item)}>
        <Dialog.Content maxWidth='450px'>
          <Dialog.Title>
            Запись <TextHighlighter>{item?.name}</TextHighlighter>
          </Dialog.Title>

          <Flex direction='column' gap='3'>
            {item &&
              Object.entries(item.data).map(([key, value]) => {
                if (!isString(value) || isInteger(value)) return null

                return (
                  <div key={key}>
                    <Text as='div' size='1' mb='1' weight='bold'>
                      {key}
                    </Text>
                    <Text as='div' mb='1'>
                      {value}
                    </Text>
                  </div>
                )
              })}
          </Flex>

          <Flex gap='3' mt='4' justify='end'>
            <Button variant='soft' color='gray' onClick={() => setItem(null)}>
              Закрыть
            </Button>
          </Flex>
        </Dialog.Content>

        <Container p='1.5rem'>
          {exploreFetcher.isError && (
            <Flex width='100%' justify='center' gap='2' align='center'>
              Ошибка <Button onClick={() => exploreFetcher.refetch()}>Перезагрузить</Button>
            </Flex>
          )}

          {!exploreFetcher.isError && (
            <Section size='1'>
              <Heading.Root
                loading={exploreFetcher.isFetching}
                route={routes.operationalTables_kn_explorer}
                backRoute={routes.operationalTables}
                renderIcon={routes.operationalTables.renderIcon}
              >
                <Heading.BackToParent />
                <Heading.Uniq
                  string={exploreFetcher.data?.operationalTable.name}
                  tooltipContent={routes.operationalTables_kn_explorer.getName()}
                />
              </Heading.Root>
            </Section>
          )}

          <Section size='1'>
            <Pagination
              currentPage={page}
              loading={exploreFetcher.isFetching}
              limit={take.toString()}
              totalElements={exploreFetcher.data?.total?.toString()}
              onChange={setPage}
            />
          </Section>

          {exploreFetcher.isSuccess && (
            <Section size='1'>
              <Viewer.Root
                loading={exploreFetcher.isFetching}
                onPathChange={(paths) => {
                  const last = paths[paths.length - 1]
                  const item = exploreFetcher.data.items.find((item) => item.name === last.name)
                  if (!item) return
                  setItem(item)
                }}
                paths={exploreFetcher.data.paths}
                data={exploreFetcher.data}
              >
                <Viewer.Table columns={columns} />
              </Viewer.Root>
            </Section>
          )}
        </Container>
      </Dialog.Root>
    </main>
  )
}

Component.displayName = displayName

/**
 * Private
 */

function tableSchemaToColumns(tableSchemaItems: TableSchemaItem[]): TableListColumn<Record<string, unknown>>[] {
  return tableSchemaItems.map((item) => {
    return {
      key: item.columnName,
      renderCell: ({ value }) => {
        return value as string
      },
      renderHeader: () => item.name,
    }
  })
}
