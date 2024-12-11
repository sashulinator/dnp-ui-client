import { type Proccessing } from '../../models'
import { type Values } from './ui.new-form'

export function toValues(processing: Proccessing): Values {
  return {
    ...processing,
    inputTables: JSON.stringify(processing.inputTables),
  }
}
