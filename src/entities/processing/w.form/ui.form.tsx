import { APP } from '~/app/constants.app'
import { FieldArray, TypedStringField } from '~/shared/form'
import { c } from '~/utils/core'

import { SLICE } from '../constants'
import { type ExecutableDesign } from '../w.executable'

export { ExecutableDesign }

export interface Props {
  name: string
  className?: string | undefined
  executableDesigns: ExecutableDesign[]
}

const NAME = `${APP}-${SLICE}-w-NewForm`

export default function Component(props: Props): JSX.Element {
  return (
    <div className={c(props.className, NAME)}>
      <FieldArray name={`${props.name}.executables`}>
        {({ fields }) => fields.map((name, index) => <Executable key={index} name={name} />)}
      </FieldArray>
    </div>
  )
}

Component.displayName = NAME

type DnpTableStatsProps = { name: string }

function Executable(props: DnpTableStatsProps) {
  const { name } = props

  return (
    <div>
      <TypedStringField testValueType={TypedStringField.testValueType} name={`${name}.name`} />
    </div>
  )
}
