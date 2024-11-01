import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

export const NAME = 'linkMenu-LinkMenu'

export default function Component(props: Props): JSX.Element {
  return <div className={c(props.className, NAME)}>linkMenu-LinkMenu</div>
}

Component.displayName = NAME
