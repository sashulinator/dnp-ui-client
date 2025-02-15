import { Dctable } from '~/entities/database-container'

import { type Proccessing } from '../types'
import { type Config, type Values } from './ui.new-form'

export function toValues(processing: Proccessing): Values {
  const configs = processing.configs.reduce<Record<string, Config>>((acc, config) => {
    acc[Dctable.buildFqn(config.inputDctableLocator)] = config
    return acc
  }, {})

  return {
    ...processing,
    configs,
    multiConfig: configs[0],
  }
}
