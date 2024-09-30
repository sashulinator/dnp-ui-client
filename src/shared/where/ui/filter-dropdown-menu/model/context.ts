import { createContext } from 'react'

import { type FilterConfig } from '../../../models/filter-config'

export interface ContextProps {
  filterConfig: FilterConfig
  onFilterChange: (filterConfig: FilterConfig) => void
}

export const context = createContext<ContextProps | undefined>(undefined)
