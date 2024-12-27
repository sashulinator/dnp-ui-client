import './switcher.scss'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Spinner from '~/shared/spinner'
import TextInput from '~/shared/text-input'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  totalPages: number
  currentPage: number
  onChange: (newPage: number) => void
  loading?: boolean | undefined
  root?: React.HTMLAttributes<HTMLDivElement>
}

const displayName = 'pagination-Pagination-w-Switcher'

/**
 * dnp-pagination-Pagination-w-Switcher
 */
export default function Component(props: Props): JSX.Element {
  const totalPages = props.totalPages

  const [localCurrentPage, setLocalCurrentPage] = useState(props.currentPage)
  useEffect(() => setLocalCurrentPage(props.currentPage), [props.currentPage])

  if (props.currentPage < 1) {
    throw Error('Page cannot be less than 1')
  }

  return (
    <Flex {...props.root} className={c(props.className, displayName)} gap='4'>
      <Button variant='ghost' round={true} disabled={props.currentPage === 1} onClick={handleChange(1)}>
        <Icon name='DoubleChevronLeft' />
      </Button>
      <Button
        variant='ghost'
        round={true}
        disabled={props.currentPage === 1}
        onClick={handleChange(props.currentPage - 1)}
      >
        <Icon name='ChevronLeft' />
      </Button>
      <TextInput
        color={localCurrentPage > totalPages || localCurrentPage < 1 ? 'red' : undefined}
        className='input'
        onKeyUp={(e) => {
          if (e.key !== 'Enter') return
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleChange(Number((e.target as any).value))()
        }}
        onChange={(e) => {
          setLocalCurrentPage(Number(e.target.value))
        }}
        onBlur={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleChange(Number((e.target as any).value))()
        }}
        style={{ width: '50px', textAlign: 'center', '--text-field-border-width': '0' } as CSSProperties}
        value={localCurrentPage}
        onFocus={(): void => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          ;(document.activeElement as any)?.select()
        }}
        autoComplete='off'
      />
      <Button
        variant='ghost'
        round={true}
        disabled={props.currentPage >= totalPages}
        onClick={handleChange(props.currentPage + 1)}
      >
        <Icon name='ChevronRight' />
      </Button>
      <Button
        variant='ghost'
        round={true}
        disabled={props.currentPage >= totalPages}
        onClick={handleChange(totalPages)}
      >
        <Icon name='DoubleChevronRight' />
      </Button>
      {props.loading && <Spinner size='2' />}
    </Flex>
  )

  function handleChange(newPage: number) {
    return () => {
      if (newPage !== props.currentPage && props.onChange && newPage >= 1 && newPage <= totalPages) {
        props.onChange?.(newPage)
      }
    }
  }
}

Component.displayName = displayName
