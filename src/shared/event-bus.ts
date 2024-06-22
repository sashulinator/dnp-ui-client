import { Emitter } from '~/utils/emitter'

type Events = {
  setTheme: 'dark' | 'light'
}

export const eventBus = new Emitter<Events>()
