import { setCSSVar } from '~/utils/dom'
import { createAtom } from '~/utils/store'

const NAME = 'nav-width'

export const navWidthAtom = createAtom(0)

navWidthAtom.subscribe((width) => {
  localStorage.setItem(NAME, width.toString())
  setCSSVar('dnp-nav-width', width)
})

navWidthAtom.set(Number(localStorage.getItem(NAME)) || 300)
