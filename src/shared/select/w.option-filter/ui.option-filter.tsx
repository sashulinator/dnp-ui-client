import { useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Select from '~/shared/select'
import SelectMultiple from '~/shared/select-multiple'
import { c } from '~/utils/core'

import type { Option } from '../v.input'

export interface Props {
  className?: string | undefined
  onSubmit: (selectedOptions: Option[], eventName: string) => void
  options: Option[]
}

const ALL = 'all' // все
const INCLUDE = 'include' // только лишь
const EXCEPT = 'except' // все кроме

const NAME = 'select-w-OptionFilter'

export default function Component(props: Props): JSX.Element {
  const [filterName, setFilterName] = useState(ALL)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterName(event.target.value)
  }

  const handleSubmit = () => {
    const filterFunction = (option: Option) => {
      const isSelected = selectedOptions.includes(option.value)
      if (filterName === INCLUDE) {
        return isSelected
      } else if (filterName === EXCEPT) {
        return !isSelected
      }
      return true // для ALL
    }

    props.onSubmit(props.options.filter(filterFunction), filterName)
  }

  return (
    <div className={c(props.className, NAME)}>
      <Flex>
        <Flex mr='1'>
          <Select.Root
            onValueChange={(value) => handleSelectChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}
            value={filterName}
          >
            <Select.Trigger className={c(props.className, NAME)} />
            <Select.Content>
              <Select.Item value={ALL}>Все</Select.Item>
              <Select.Item value={EXCEPT}>Все кроме</Select.Item>
              <Select.Item value={INCLUDE}>Только лишь</Select.Item>
            </Select.Content>
          </Select.Root>
          {filterName === EXCEPT || filterName === INCLUDE ? (
            <Flex ml='1' width='400px'>
              <SelectMultiple
                onValueChange={setSelectedOptions}
                value={selectedOptions}
                options={props.options.map((option) => ({ value: option.value, display: option.display as string }))}
              />
            </Flex>
          ) : null}
        </Flex>
        <Button onClick={handleSubmit}>Запустить</Button>
      </Flex>
    </div>
  )
}

Component.displayName = NAME
