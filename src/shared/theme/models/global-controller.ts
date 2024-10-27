import { createController } from '~dnp/shared/controller'

import { type ThemeName, themeName } from './theme-name'

const LOCAL_STORAGE_KEY = 'theme'

type State = {
  name: ThemeName
}

export const globalController = createController<State>({
  name: themeName[localStorage.getItem(LOCAL_STORAGE_KEY) as ThemeName] || themeName.default,
})

globalController.subscribe((state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, state.name)
})
