import { type Proccessing } from '../../models'
import { type Config, type Values } from './ui.new-form'

export function toValues(processing: Proccessing): Values {
  const configs = processing.configs.reduce<Record<string, Config>>((acc, config) => {
    acc[`${config.inputTable}${config.inputTable}`] = config
    return acc
  }, {})

  return {
    ...processing,
    configs,
  }
}
