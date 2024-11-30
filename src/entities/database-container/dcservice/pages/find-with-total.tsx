import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import { APP } from '~/app/constants.app'
import { routes } from '~/app/route'
import Container from '~/shared/container'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import { RenderCounter } from '~/shared/debug'
import Flex from '~/shared/flex'
import { Heading, Main, Pagination } from '~/shared/page'
import Section from '~/shared/section'
import { c } from '~/utils/core'
import { useRenderDelay } from '~/utils/core-hooks/render-delay'

import { dcserviceApi } from '..'
import { SLICE } from '../constants.slice'
import Item from '../ui/item'

export interface Props {
  className?: string | undefined
}

const NAME = `${APP}-page-${SLICE}-GetById`

export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const listRenderDelay = useRenderDelay(TICK_MS * 3)

  const fetcherList = dcserviceApi.findWithTotal.useCache({ take, skip: (page - 1) * take }, { keepPreviousData: true })

  return (
    <Main className={NAME} style={{ position: 'relative' }}>
      <RenderCounter style={{ top: 0 }} />
      <Container p='4'>
        <Section size='1' className={c(cssAnimations.Appear)}>
          <Flex width='100%' justify='between'>
            <Heading.Root route={routes.dcservice_findWithTotal} backRoute={routes.main}>
              <Heading.BackToParent />
              <Heading.Name />
            </Heading.Root>
            <Flex align='center' gap='2'>
              {/* <Button asChild>
                <Link to={routes.dcservice_findWithTotal.getUrl()}>Создать</Link>
              </Button> */}
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
                    key={item.id}
                    item={item}
                  />
                )
              })}
            </Flex>
          </Section>
        )}
        <Section></Section>
      </Container>
    </Main>
  )
}

Component.displayName = NAME
