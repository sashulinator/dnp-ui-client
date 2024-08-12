import { useParams } from 'react-router-dom'
import { NAME_ONE } from '../../../constants/name'
import { Viewer } from '~/entities/explorer'
import { api } from '~/entities/operational-table'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import Heading from '~/ui/heading'
import Section from '~/ui/section'
import Spinner from '~/ui/spinner'

import { emptyFn } from '~/utils/function'

export interface Props {
  className?: string | undefined
}

const displayName = `page-${NAME_ONE.replace(/ /, '')}_id`

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const explorerFetcher = api.explore.useCache({ kn })

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        {explorerFetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => explorerFetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!explorerFetcher.isError && (
          <Section size='1'>
            <Heading>{routes.operationalTables_kn.getName()} </Heading>
          </Section>
        )}

        {explorerFetcher.isLoading && (
          <Flex width='100%' justify='center'>
            <Spinner />
          </Flex>
        )}

        {explorerFetcher.isSuccess && (
          <Section size='1'>
            <Viewer onPathChange={emptyFn} paths={explorerFetcher.data.paths} data={explorerFetcher.data} />
          </Section>
        )}
      </Container>
    </main>
  )
}

Component.displayName = displayName
