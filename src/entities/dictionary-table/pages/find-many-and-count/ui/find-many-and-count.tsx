import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import { routes } from '~/app/route'
import { Item, api } from '~/entities/dictionary-table'
import { auth } from '~/shared/auth'
import Button from '~/shared/button'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import { RenderCounter } from '~/shared/debug'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { Heading, Pagination } from '~/shared/page'
import Section from '~/shared/section'
import { c } from '~/utils/core'
import { useRenderDelay } from '~/utils/core-hooks/render-delay'

import { SLICE } from '../../../constants.name'

export interface Props {
  className?: string | undefined
}

const displayName = `${SLICE}-Page_list`

export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const listRenderDelay = useRenderDelay(TICK_MS * 3)

  const fetcherList = api.fetchList.cache.use({ take, skip: (page - 1) * take }, { keepPreviousData: true })

  return (
    <main className={displayName} style={{ position: 'relative' }}>
      <RenderCounter style={{ top: 0 }} />
      <Container p='4'>
        <Section size='1' className={c(cssAnimations.Appear)}>
          <Flex width='100%' justify='between'>
            <Heading.Root
              route={routes.dictionaryTables_findManyAndCount}
              backRoute={routes.main}
              renderIcon={routes.dictionaryTables_findManyAndCount.payload.renderIcon}
            >
              <Heading.BackToParent />
              <Heading.Name />
            </Heading.Root>
            <Flex align='center' gap='2'>
              {auth.hasRole(auth.roles.stc_get, 'dnp') && (
                <Button variant='outline' asChild>
                  <Link to={routes.storeConfigs_kn.getUrl('workingTable')}>Хранилище</Link>
                </Button>
              )}
              <Button asChild>
                <Link to={routes.dictionaryTables_create.getUrl()}>Создать</Link>
              </Button>
            </Flex>
          </Flex>
        </Section>
        <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS}ms` }}>
          <Pagination
            currentPage={page}
            limit={take}
            loading={fetcherList.isFetching}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
          />
        </Section>
        {listRenderDelay.isRender && (
          <Section size='1' className={c(cssAnimations.Appear)}>
            <Flex gap='4' direction={'column'}>
              {fetcherList.data?.items?.map((item, i) => {
                return (
                  <Item
                    style={{ animationDelay: `${Math.pow(i, 0.7) * TICK_MS}ms` }}
                    className={c(cssAnimations.Appear)}
                    key={item.kn}
                    item={item}
                  />
                )
              })}
            </Flex>
          </Section>
        )}
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName
