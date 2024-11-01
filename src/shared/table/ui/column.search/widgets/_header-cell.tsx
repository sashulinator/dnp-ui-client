import Button from '~/shared/button'
import { RenderCounter } from '~/shared/debug'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
// TODO убрать зависимость от where
import { type FilterConfig, FilterConfigurator, toFilter, toFilterConfig } from '~/slices/where'
import { type Dictionary, assertDefined } from '~/utils/core'
import { add } from '~/utils/dictionary'

import { type RenderHeaderProps } from '../../column/models/column'
import { type Context } from '../models/contex'

export function HeaderCell<TItem extends Dictionary, TContext extends Context<TItem>>({
  accessorKey,
  context,
  name,
}: RenderHeaderProps<TItem, TContext>): JSX.Element {
  assertDefined(context)
  const searchFilter = context.searchFilter?.[accessorKey]
  const filterConfig = toFilterConfig(searchFilter)

  return (
    <Flex width='100%' justify='between' gap='4' align='center'>
      <RenderCounter style={{ transform: 'translateY(0)' }} />
      <FilterConfigurator.Root filterConfig={filterConfig} onFilterConfigChange={handleFilterConfigChange}>
        <Flex width='100%'>
          <FilterConfigurator.Input placeholder={name} style={{ width: '100%' }} />
        </Flex>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button color={searchFilter ? 'amber' : 'gray'} square={true} size='1' variant='ghost'>
              <Icon name='Filter' />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <FilterConfigurator.ClearDropdownMenuItem
              onClick={() => {
                context?.setSearchFilter((s) => {
                  const clone = { ...s }
                  delete clone[accessorKey]
                  return clone
                })
              }}
            />
            <FilterConfigurator.NotModeDropdownMenuItem />
            <DropdownMenu.Label>
              <Text size='1'>Строковый</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.CaseSensitiveModeDropdownMenuItem />
            <FilterConfigurator.StartsWithTypeDropdownMenuItem />
            <FilterConfigurator.EndsWithTypeDropdownMenuItem />
            <FilterConfigurator.ContainsTypeDropdownMenuItem />
            <FilterConfigurator.MatchTypeDropdownMenuItem />
            <DropdownMenu.Label>
              <Text size='1'>Числовой</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.EqualsTypeDropdownMenuItem />
            <FilterConfigurator.GtTypeDropdownMenuItem />
            <FilterConfigurator.GteTypeDropdownMenuItem />
            <FilterConfigurator.LtTypeDropdownMenuItem />
            <FilterConfigurator.LteTypeDropdownMenuItem />
            <DropdownMenu.Label>
              <Text size='1'>Шаблоны</Text>
            </DropdownMenu.Label>
            <FilterConfigurator.EmptyTemplateDropdownMenuItem />
            <FilterConfigurator.NotEmptyTemplateDropdownMenuItem />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </FilterConfigurator.Root>
    </Flex>
  )

  /**
   * private
   */

  function handleFilterConfigChange(filterConfig: FilterConfig) {
    const searchFilterToAdd = add({}, accessorKey, toFilter(filterConfig))
    context?.setSearchFilter((s) => ({ ...s, ...searchFilterToAdd }))
  }
}
