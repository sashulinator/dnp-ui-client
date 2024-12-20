import Button, { DangerButton } from '~/shared/button'
import Flex from '~/shared/flex'
import { FieldArray, TypedStringField } from '~/shared/form'

export type Values = {
  name: string
  icon: string
  link: string
  description: string
  children?: Values[]
}

export interface Props {
  name: string
}

export const NAME = 'linkMenu-formMenu-w-Item'

export default function Component(props: Props): JSX.Element {
  const { name } = props
  const formName = `${name}.` as ''
  return (
    <Flex width='300px' direction={'column'} gap='1'>
      <TypedStringField<Values, 'name'>
        testValueType={TypedStringField.testValueType}
        name={`${formName}name`}
        placeholder='Название'
      />
      <TypedStringField<Values, 'icon'>
        testValueType={TypedStringField.testValueType}
        name={`${formName}icon`}
        placeholder='Иконка'
      />
      <TypedStringField<Values, 'link'>
        testValueType={TypedStringField.testValueType}
        name={`${formName}link`}
        placeholder='Ссылка'
      />
      <TypedStringField<Values, 'description'>
        testValueType={TypedStringField.testValueType}
        name={`${formName}description`}
        placeholder='Описание'
      />
      <Flex direction={'column'} width='100%' ml='3' p='1'>
        <FieldArray name={`${formName}children`}>
          {({ fields }) => {
            return (
              <Flex direction={'column'} width='100%'>
                {fields.map((name, idx) => (
                  <Flex width='100%' key={idx}>
                    <Component key={idx} name={name} />
                    <Flex ml='5' position='relative'>
                      <DangerButton onClick={() => fields.remove(idx)}>Удалить</DangerButton>
                    </Flex>
                  </Flex>
                ))}
                <Flex p='1'>
                  <Button onClick={() => fields.push({})}>Добавить</Button>
                </Flex>
              </Flex>
            )
          }}
        </FieldArray>
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
