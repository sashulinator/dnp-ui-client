import dayjs from 'dayjs'
import { NumberParam, withDefault } from 'serialize-query-params'
import { useQueryParams } from 'use-query-params'

import { routes } from '~/app/route'
import Button from '~/shared/button'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Heading from '~/shared/heading'
import Link from '~/shared/link'
import { Pagination } from '~/shared/page'
import Section from '~/shared/section'
import List from '~/shared/table/-list'
import { fetchList } from '~/slices/process'

import { ProcessStatusBadge } from '../ui/ProcessStatusBadge'

export interface Props {
  className?: string | undefined
}

const types = {
  processing: 'Обработка',
  excelToTable: 'Импорт Excel',
  tableToExcel: 'Экспорт Excel',
}

const columns = [
  {
    name: 'track',
    display: 'Тип процесса',
    renderCell: ({ item }: { item: { id: string; type: string } }) => {
      return (
        <Button variant='ghost' asChild={true}>
          <Link to={routes.processes_kn.getUrl(item.id)}>{(types as any)[item.type]}</Link>
        </Button>
      )
    },
  },
  {
    name: 'type',
    display: 'Статус',
    renderCell: () => <ProcessStatusBadge status='STARTED' />,
  },
  {
    name: 'user',
    display: 'Автор',
    renderCell: ({ item }: { item: { user?: { username?: string | undefined } } }) => {
      return item?.user?.username
    },
  },
  {
    name: 'createdAt',
    display: 'Запущен',
  },
]

const displayName = 'page-Processes'

/**
 * page-Processes
 */
export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = fetchList.useCache({ take, skip: (page - 1) * take })

  const rTableList = (
    <List
      context={{}}
      list={
        fetcherList.data?.items.map((item) => ({
          ...item,
          createdAt: dayjs(item.createdAt).format('DD.MM.YYYY HH:mm'),
        })) ?? []
      }
      columns={
        columns.map((column) => ({
          ...column,
          name: column.name as 'id' | 'track' | 'type' | 'createdAt',
        })) as any
      }
    />
  )
  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading>{routes.processes.getName()}</Heading>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            loading={fetcherList.isFetching}
            limit={take}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
          />
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {rTableList}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
