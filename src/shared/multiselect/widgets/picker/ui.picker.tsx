import { useMemo } from 'react'

import Button from '~/shared/button'
import Flex, { type FlexProps } from '~/shared/flex'
import Icon from '~/shared/icon'
import { push, remove, swap } from '~/utils/list'

import { context, useContext } from './context'
import type { Option } from './types'

export interface RootProps {
  className?: string | undefined
  value: string[]
  options: Option[]
  onValueChange: (value: string[]) => void
  children: React.ReactNode
}

const NAME = 'ui-multiselect-w-picker'

export function Root(props: RootProps): JSX.Element {
  const { value, onValueChange, options } = props

  return <context.Provider value={{ value, onValueChange, options }}>{props.children}</context.Provider>
}
Root.displayName = NAME

export type ValueListProps = FlexProps

export function ValueList(props: ValueListProps): JSX.Element {
  const { ...flexProps } = props
  const { value, options, onValueChange } = useContext()

  const valueOptions = useMemo(() => {
    return value.map((v) => options.find((o) => o.value === v) as Option)
  }, [value, options])

  return (
    <Flex {...flexProps} direction='column'>
      {valueOptions.map((o, i, arr) => {
        return (
          <Button
            key={o?.value}
            asChild={true}
            onClick={() => {
              onValueChange(remove(value.indexOf(o.value), value))
            }}
            variant={'outline'}
            style={{
              border: '0',
              height: 'auto',
              minHeight: 'var(--space-6)',
              boxShadow: 'none',
              color: 'inherit',
            }}
          >
            <a>
              <Flex gap='4'>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onValueChange(swap(i, i - 1, value))
                  }}
                  disabled={i === 0}
                  size='1'
                  variant='ghost'
                  round={true}
                >
                  <Icon name='ChevronUp' />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onValueChange(swap(i, i + 1, value))
                  }}
                  disabled={i === arr.length - 1}
                  variant='ghost'
                  size='1'
                  round={true}
                >
                  <Icon name='ChevronDown' />
                </Button>
              </Flex>
              <Flex width='100%' style={{ textAlign: 'left' }}>
                {o?.display}
              </Flex>
            </a>
          </Button>
        )
      })}
    </Flex>
  )
}

export type OptionListProps = FlexProps & {
  hidePicked?: boolean | undefined
}

export function OptionList(props: OptionListProps): JSX.Element {
  const { hidePicked, ...flexProps } = props
  const { value, options, onValueChange } = useContext()

  return (
    <Flex {...flexProps} direction='column'>
      {options.map((o) => {
        const picked = value.includes(o.value)

        if (hidePicked && picked) return null

        return (
          <Button
            key={o?.value}
            onClick={() => {
              onValueChange(picked ? remove(value.indexOf(o.value), value) : push(o.value, value))
            }}
            variant={picked ? 'solid' : 'outline'}
            style={{
              border: '0',
              height: 'auto',
              minHeight: 'var(--space-6)',
              boxShadow: 'none',
              color: 'inherit',
            }}
          >
            <Flex width='100%' style={{ textAlign: 'left' }}>
              {o?.display}
            </Flex>
          </Button>
        )
      })}
    </Flex>
  )
}
