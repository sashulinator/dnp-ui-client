import Button, { DangerButton } from '~/shared/button'
import Flex from '~/shared/flex'
import { Field, FieldArray, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import TextArea from '~/shared/text-area'
import TextInput from '~/shared/text-input'

export type Values = {
  name: string
  icon: string
  link: { url: string }
  description: string
  children?: Values[]
}

export interface Props {
  name: string
  isRoot?: boolean | undefined
}

export const NAME = 'linkMenu-formMenu-w-Item'

export default function Component(props: Props): JSX.Element {
  const { name, isRoot = true } = props
  const form = useForm()

  return (
    <Flex direction={'column'} width='100%' ml={isRoot ? '0' : '8'} p='1'>
      <FieldArray name={`${name}.children`}>
        {({ fields }) => {
          return (
            <Flex direction={'column'} width='100%'>
              {fields.map((name, idx) => {
                const formName = `${name}.` as ''

                return (
                  <Flex key={name} width='100%'>
                    <Flex direction='column'>
                      <Flex width='700px' direction={'column'} position='relative' gap='1'>
                        <Flex
                          gap='1'
                          direction='column'
                          style={{ top: '0px', right: '-50px' }}
                          position='absolute'
                          align='center'
                        >
                          <DangerButton variant='soft' round={true} onClick={() => fields.remove(idx)}>
                            <Icon name='Trash' />
                          </DangerButton>
                          <Button
                            disabled={idx === 0}
                            variant='soft'
                            round={true}
                            onClick={() => fields.swap(idx, idx - 1)}
                          >
                            <Icon name='ChevronUp' />
                          </Button>
                          <Button
                            disabled={idx === (fields.length || 0) - 1}
                            variant='soft'
                            round={true}
                            onClick={() => fields.swap(idx, idx + 1)}
                          >
                            <Icon name='ChevronDown' />
                          </Button>
                          <Flex
                            style={{
                              borderRadius: '50%',
                              border: '1px var(--gray-3) solid',
                              minWidth: '32px',
                              minHeight: '32px',
                            }}
                            justify='center'
                            align='center'
                          >
                            <Icon name={(form?.getFieldState(`${formName}icon`)?.value as string) || ''} />
                          </Flex>
                        </Flex>
                        <Field.default<Values['name']> name={`${formName}name`}>
                          {({ input }) => <TextInput placeholder='Название' {...input} />}
                        </Field.default>

                        <Field.default<Values['link']['url']> name={`${formName}link.url`}>
                          {({ input }) => <TextInput placeholder='Ссылка' {...input} />}
                        </Field.default>

                        <Field.default<Values['description']> name={`${formName}description`}>
                          {({ input }) => <TextInput placeholder='Описание' {...input} />}
                        </Field.default>

                        <Field.default<Values['icon']> name={`${formName}icon`}>
                          {({ input }) => <TextArea rows={5} placeholder='Описание' {...input} />}
                        </Field.default>
                      </Flex>
                      <Component isRoot={false} name={name} />
                    </Flex>
                  </Flex>
                )
              })}
              <Flex>
                <Button onClick={() => fields.push({})}>Добавить</Button>
              </Flex>
            </Flex>
          )
        }}
      </FieldArray>
    </Flex>
  )
}

Component.toFormValues = (linkMenu: Values[]): { root: { children: Values[] } } => {
  return {
    root: { children: linkMenu as Values[] },
  }
}

Component.toLinkMenu = (values: { root: { children: Values[] } }): Values[] => {
  return values.root.children as Values[]
}

Component.displayName = NAME
