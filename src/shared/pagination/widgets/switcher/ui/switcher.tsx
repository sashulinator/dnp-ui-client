import './switcher.scss'

import { CSSProperties, useEffect, useState } from 'react'

import Button from '~/shared/button'
import Icon from '~/shared/icon'
import Spinner from '~/shared/spinner'
import TextField from '~/shared/text-field'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  totalPages: number
  currentPage: number
  onChange: (newPage: number) => void
  loading?: boolean | undefined
  root?: React.HTMLAttributes<HTMLDivElement>
}

const displayName = 'ui-Pagination-w-Switcher'

/**
 * ui-Pagination-w-Switcher
 */
export default function Component(props: Props): JSX.Element {
  const totalPages = props.totalPages

  const [localCurrentPage, setLocalCurrentPage] = useState(props.currentPage)
  useEffect(() => setLocalCurrentPage(props.currentPage), [props.currentPage])

  if (props.currentPage < 1) {
    throw Error('Page cannot be less than 1')
  }

  return (
    <div {...props.root} className={c(props.className, displayName)}>
      <Button variant='soft' round={true} disabled={props.currentPage === 1} onClick={handleChange(1)}>
        <Icon name='DoubleChevronLeft' />
      </Button>
      <Button
        variant='soft'
        round={true}
        disabled={props.currentPage === 1}
        onClick={handleChange(props.currentPage - 1)}
      >
        <Icon name='ChevronLeft' />
      </Button>
      <TextField.Root
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
        variant='soft'
        round={true}
        disabled={props.currentPage >= totalPages}
        onClick={handleChange(props.currentPage + 1)}
      >
        <Icon name='ChevronRight' />
      </Button>
      <Button variant='soft' round={true} disabled={props.currentPage >= totalPages} onClick={handleChange(totalPages)}>
        <Icon name='DoubleChevronRight' />
      </Button>
      {props.loading && <Spinner size='2' />}
    </div>
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
