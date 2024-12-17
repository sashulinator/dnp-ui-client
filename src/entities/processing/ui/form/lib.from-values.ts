import { type Proccessing } from '../../models'
import { type Values } from './ui.new-form'

export function fromValues(values: Values): Proccessing {
  //

  return {
    name: values.name,
    configs: Object.values(values.configs),
  }
}
