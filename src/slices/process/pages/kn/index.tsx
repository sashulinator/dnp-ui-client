import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useParams } from 'react-router-dom'

import { routes } from '~/app/route'
import Card from '~/shared/card'
import CodeEditor from '~/shared/code-editor/ui/code-editor'
import Container from '~/shared/container'
import DataList from '~/shared/data-list'
import Flex from '~/shared/flex'
import { Heading } from '~/shared/page'
import Section from '~/shared/section'
import Skeleton from '~/shared/skeleton'
import Text from '~/shared/text'

import * as api from '../../api/get-by-kn'
import { ProcessStatusBadge } from '../../ui/ProcessStatusBadge'
import { ProcessTypeBadge } from '../../ui/ProcessTypeBadge'

export default function Component() {
  const { kn = '' } = useParams<{ kn: string }>()

  const fetcher = api.useCache({ kn })

  // Код для отображения времени выполнения. Заменить на вычисления из событий процесса после склейки с шиной статусов
  const firstDate = dayjs(Date.now())
  const secondDate = dayjs(Date.now() - 3424940)

  const diff = firstDate.diff(secondDate)

  dayjs.extend(duration)

  const dur = dayjs.duration(diff).format('HH:mm:ss')

  return (
    <main>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading.Root
            route={routes.processes_kn}
            backRoute={routes.processes}
            renderIcon={routes.processes.payload.renderIcon}
          >
            <Heading.BackToParent />
            <Heading.Name />
            <Heading.Unique string={''} tooltipContent='Название' />
          </Heading.Root>
        </Section>

        <Section size='1'>
          <Card>
            <Flex p='24px' direction='column' gapY='16px'>
              {/* Вот тут список процедур со статусами */}
              <Text weight='bold' size='3'>
                Основная информация
              </Text>
              {fetcher.isSuccess ? (
                <DataList.Root>
                  <DataList.Item align='center'>
                    <DataList.Label>ID Инициатора</DataList.Label>
                    <DataList.Value>{fetcher.data?.trackId}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item align='center'>
                    <DataList.Label>Тип Процесса</DataList.Label>
                    <DataList.Value>
                      <ProcessTypeBadge type={fetcher.data.type} />
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item align='center'>
                    <DataList.Label>Статус</DataList.Label>
                    <DataList.Value>
                      <ProcessStatusBadge status='STARTED' />
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item align='center'>
                    <DataList.Label>Запущен</DataList.Label>
                    <DataList.Value>{dayjs(fetcher.data.createdAt).format('DD.MM.YYYY HH:mm')}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item align='center'>
                    <DataList.Label>Время выполнения</DataList.Label>
                    <DataList.Value>{dur}</DataList.Value>
                  </DataList.Item>
                  {/* {fetcher.data.normalizationConfigId && (
                    <>
                      <DataList.Item align='center'>
                        <DataList.Label>Id конфигурации</DataList.Label>
                        <DataList.Value>e6rr-hui3-poj4-eifn</DataList.Value>
                      </DataList.Item>
                      <DataList.Item align='center'>
                        <DataList.Label>Версия конфигурации</DataList.Label>
                        <DataList.Value>1</DataList.Value>
                      </DataList.Item>
                    </>
                  )} */}
                </DataList.Root>
              ) : (
                <Skeleton width='100%' height='240px' />
              )}
            </Flex>
            {!!(fetcher.data?.data as any).normalizationConfig && (
              <Flex p='24px' pt='32px' direction='column' gapY='16px'>
                <Text weight='bold' size='3'>
                  JSON конфигурации
                </Text>
                <CodeEditor
                  value={JSON.stringify((fetcher.data as any).data.normalizationConfig)}
                  className='ui-CodeEditor-v-Json'
                  mode='json'
                  readOnly
                  height='500px'
                  setOptions={{
                    maxLines: 46,
                    minLines: 4,
                    showPrintMargin: false,
                    showGutter: true,
                  }}
                />
              </Flex>
            )}
          </Card>
        </Section>
      </Container>
    </main>
  )
}
