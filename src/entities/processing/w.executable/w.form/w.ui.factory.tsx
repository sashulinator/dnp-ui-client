import { type ReactNode, createElement } from 'react'

import { MatrixField, TypedIntegerField, TypedStringField } from '~/shared/form'
import Text from '~/shared/text'
import { type Any } from '~/utils/core'

import { type ExecutableModel } from '../models'

interface Props {
  executableModel: ExecutableModel | undefined
  columns: { name: string; display: string }[]
  name: string
}
const NAME = ''

export default function Component(props: Props): ReactNode {
  const { name, columns, executableModel } = props

  if (!executableModel) {
    return <Text color='red'>Такой процедуры не существует</Text>
  }

  return (
    executableModel?.params.map((p, i) => {
      const component =
        p.component.name === 'Number'
          ? TypedIntegerField
          : p.component.name === 'Matrix'
            ? MatrixField
            : TypedStringField

      return createElement(component as Any, {
        key: i,
        name: `${name}.params.${p.name}`,
        label: p.display,
        columns,
        ...p.component.props,
        ...p.component.singleModeProps,
      })
    }) ?? null
  )
}

Component.displayName = NAME
