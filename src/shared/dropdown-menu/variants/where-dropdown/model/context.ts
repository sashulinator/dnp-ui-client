import { createContext, useContext } from 'react'

export interface ContextProps {
  accessorKey: string
  searchValue: string
  isActive: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (callback: (s: any) => any) => void
}

export const WhereDropdownContext = createContext<ContextProps | undefined>(undefined)

export const useWhereDropdownContext = () => {
  const context = useContext(WhereDropdownContext)
  if (!context) {
    throw new Error('ErrorProvider')
  }
  return context
}
