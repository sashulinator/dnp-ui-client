import { Badge } from '@radix-ui/themes'

import { useState } from 'react'

import Button from '~/shared/button'
import Card from '~/shared/card'
import Flex from '~/shared/flex'
import { Checkbox, TreeCheckbox } from '~/shared/form'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'

import { buildInitialValues } from '../lib/build-initial-values'
import { buildTree } from '../lib/build-tree'
import type { Columns, Tree } from '../models'

export interface Props {
  className?: string | undefined
  tree: Tree
}

const NAME = 'dnp-e-analytics-RunForm'

export default function Component(props: Props): JSX.Element {
  return (
    <Flex direction='column' width='100%' className={c(props.className, NAME)}>
      {Object.values(props.tree.services).map((service) => {
        return (
          <Flex key={service.id} gap='2' direction='column'>
            <Flex gap='2' align='center'>
              <Flex asChild={true} align='center' gap='2'>
                <HighlightedText asChild color='amber'>
                  <label>
                    <TreeCheckbox name={`${service.id}`} />
                    <Icon name='Postgres' />
                    {service.display}
                  </label>
                </HighlightedText>
              </Flex>
              <Text size='1' color='gray'>{`${service.host}:${service.port}`}</Text>
            </Flex>
            {Object.values(service.databases).map((database) => {
              return (
                <Flex key={database.id} gap='2' direction='column' ml='2'>
                  <Flex gap='2' align='center'>
                    <Flex asChild={true} align='center' gap='2'>
                      <HighlightedText asChild color='green'>
                        <label>
                          <TreeCheckbox name={`${service.id}.${database.id}`} />
                          <Icon name='Database' />
                          {database.display}
                        </label>
                      </HighlightedText>
                    </Flex>
                    <Text size='1' color='gray'>
                      {database.name}
                    </Text>
                  </Flex>
                  {Object.values(database.schemas).map((schema) => {
                    return (
                      <Flex key={schema.id} gap='2' direction='column' ml='2'>
                        <Flex gap='2' align='center'>
                          <Flex asChild={true} align='center' gap='2'>
                            <HighlightedText asChild color='lime'>
                              <label>
                                <TreeCheckbox name={`${service.id}.${database.id}.${schema.id}`} />
                                <Icon name='DatabaseSchema' />
                                {schema.display}
                              </label>
                            </HighlightedText>
                          </Flex>
                          <Text size='1' color='gray'>
                            {schema.name}
                          </Text>
                        </Flex>
                        {Object.values(schema.tables).map((table) => {
                          return (
                            <Card key={table.id} asChild>
                              <Flex gap='2' width='100%'>
                                <Flex width='100%'>
                                  <Flex ml='2' gap='2' direction='column' width='100%'>
                                    <Flex gap='2' width='100%'>
                                      <Flex direction='column' height='100%'>
                                        <Flex width='300px'>
                                          <Flex wrap='nowrap' asChild={true} align='center' gap='2'>
                                            <HighlightedText asChild>
                                              <label>
                                                <TreeCheckbox
                                                  name={`${service.id}.${database.id}.${schema.id}.${table.id}`}
                                                />
                                                <Icon style={{ minWidth: '15', maxWidth: '15' }} name='Table' />
                                                <span style={{ wordBreak: 'break-all' }}>{table.display}</span>
                                              </label>
                                            </HighlightedText>
                                          </Flex>
                                        </Flex>
                                        <Flex ml='calc(var(--space-8) + var(--space-1))'>
                                          <Text size='1' color='gray' style={{ wordBreak: 'break-all' }}>
                                            {table.name}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <_Columns
                                        columns={table.columns}
                                        serviceId={service.id}
                                        databaseId={database.id}
                                        schemaId={schema.id}
                                        tableId={table.id}
                                      />
                                    </Flex>
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Card>
                          )
                        })}
                      </Flex>
                    )
                  })}
                </Flex>
              )
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}

type _ColumnsProps = {
  columns: Columns
  serviceId: string
  databaseId: string
  schemaId: string
  tableId: string
}

function _Columns(props: _ColumnsProps) {
  const { columns, serviceId, databaseId, schemaId, tableId } = props
  const [expanded, setExpanded] = useState(false)

  return (
    <Flex gap='2' wrap='nowrap' width='100%' justify='between'>
      <Flex>
        {expanded ? (
          <Flex direction='column' gap='4'>
            {Object.values(columns).map((column) => {
              return (
                <Flex key={column.id} direction='column' gap='2'>
                  <Flex gap='2' wrap='wrap'>
                    <Badge color='violet' size='1'>
                      <TreeCheckbox size='1' name={`${serviceId}.${databaseId}.${schemaId}.${tableId}.${column.id}`} />
                      {column.display}
                    </Badge>
                    {Object.values(column.actions).map((action) => {
                      return (
                        <Badge key={action.id} color='amber' size='1'>
                          <Checkbox
                            size='1'
                            name={`${serviceId}.${databaseId}.${schemaId}.${tableId}.${column.id}._${action.id}`}
                          />
                          {action.display}
                        </Badge>
                      )
                    })}
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
        ) : (
          <Flex gap='2' wrap='wrap'>
            {Object.values(columns).map((column) => {
              return (
                <Badge key={column.id} color='violet' size='1'>
                  <TreeCheckbox size='1' name={`${serviceId}.${databaseId}.${schemaId}.${tableId}.${column.id}`} />
                  {column.display}
                </Badge>
              )
            })}
          </Flex>
        )}
      </Flex>
      <Button variant='ghost' round={true} onClick={() => setExpanded((s) => !s)}>
        <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} />
      </Button>
    </Flex>
  )
}

Component.buildTree = buildTree
Component.buildInitialValues = buildInitialValues
Component.displayName = NAME
