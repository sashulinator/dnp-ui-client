import Button, { DangerButton } from '~/shared/button'
import { Input } from '~/shared/file'
import Flex from '~/shared/flex'
import Form, { Card, Column, Field, FieldArray, Row, Select, TypedField, useCreateForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const NAME = 'demoForm'

export default function Component(props: Props): JSX.Element {
  const form = useCreateForm(
    {
      onSubmit: console.log,
      initialValues: {
        functions: [{ name: 'analytics' }],
      },
    },
    {
      values: true,
    },
  )

  return (
    <div className={c(props.className, NAME)}>
      <Form form={form}>
        {() => {
          return (
            <Flex width='100%' direction='column' gap='4'>
              <Row>
                <Flex width='100%' maxWidth='50%'>
                  <TypedField
                    rootProps={{ width: '100%' }}
                    name={`source`}
                    label='Входные данные'
                    multiple
                    options={[
                      {
                        value: 'cars',
                        display: 'Автомобили',
                      },
                      {
                        value: 'med',
                        display: 'Med',
                      },
                      {
                        value: 'employees',
                        display: 'Работники',
                      },
                      {
                        value: 'tableWithoutColumns-0',
                        display: 'tableWithoutColumns-0',
                      },
                      {
                        value: 'tableWithoutColumns-1',
                        display: 'tableWithoutColumns-1',
                      },
                      {
                        value: 'tableWithoutColumns-2',
                        display: 'tableWithoutColumns-2',
                      },
                      {
                        value: 'tableWithoutColumns-3',
                        display: 'tableWithoutColumns-3',
                      },
                      {
                        value: 'tableWithoutColumns-4',
                        display: 'tableWithoutColumns-4',
                      },
                    ]}
                    component={Select}
                  />
                </Flex>
                <Flex width='100%' maxWidth='50%'>
                  <TypedField
                    rootProps={{ width: '100%' }}
                    name={`target`}
                    label='Результат'
                    multiple
                    options={[
                      {
                        value: 'prof',
                        display: 'Аналитика таблицы "Автомобили"',
                      },
                      {
                        value: 'prof',
                        display: 'Аналитика таблицы "Cубьекты РФ"',
                      },
                      {
                        value: 'prof',
                        display: 'Аналитика таблицы "Med"',
                      },
                    ]}
                    component={Select}
                  />
                </Flex>
              </Row>
              <FieldArray name='functions' subscription={{ value: true }}>
                {({ fields }) => {
                  return (
                    <Flex width='100%' direction='column'>
                      <Flex width='100%' direction='column' gap='4'>
                        {fields.map((name, index) => {
                          return (
                            <Card asChild key={`${index}${name}`}>
                              <Flex width='100%'>
                                <Column justify='between'>
                                  <Row justify='between'>
                                    <Flex width='300px'>
                                      <TypedField
                                        rootProps={{ width: '100%' }}
                                        name={`${name}.name`}
                                        label='Функция'
                                        options={[
                                          {
                                            value: 'analytics',
                                            display: 'Расчет метрик профилирования',
                                          },
                                          {
                                            value: 'metaMigration',
                                            display: 'Мета миграция',
                                          },
                                        ]}
                                        component={Select}
                                      />
                                    </Flex>
                                    <Flex>
                                      <DangerButton variant='outline' round={true}>
                                        <Icon name='Trash' onClick={() => fields.remove(index)} />
                                      </DangerButton>
                                    </Flex>
                                  </Row>
                                  {form?.getFieldState(`${name}.name`)?.value === 'analytics' ? (
                                    <AnaliticsSubform name={name} />
                                  ) : form?.getFieldState(`${name}.name`)?.value === 'metaMigration' ? (
                                    'Тут будет форма для метамиграции'
                                  ) : (
                                    'UNKNOWN'
                                  )}
                                </Column>
                              </Flex>
                            </Card>
                          )
                        })}
                      </Flex>
                      <Flex mt='6'>
                        <Button onClick={() => fields.push({ name: '' })}>Добавить обработку</Button>
                      </Flex>
                    </Flex>
                  )
                }}
              </FieldArray>
            </Flex>
          )
        }}
      </Form>
    </div>
  )
}

Component.displayName = NAME

function AnaliticsSubform(props: { name: string }): JSX.Element {
  return (
    <Column>
      <Row>
        <Flex width='100%' maxWidth='50%'>
          <TypedField
            rootProps={{ width: '100%' }}
            name={`${props.name}.source`}
            label='Справочники'
            multiple
            options={[
              {
                value: 'med',
                display: 'Med',
              },
              {
                value: 'rfSubject',
                display: 'Субьекты РФ',
              },
              {
                value: 'cars',
                display: 'Автомобили',
              },
            ]}
            component={Select}
          />
        </Flex>
      </Row>
      <Row>
        <Field type='object' name={`${props.name}.file`}>
          {({ input }) => {
            const value = input?.value as { file: File | null } | undefined

            return (
              <Flex align='center' gap='2'>
                <Input accept='*' onFileChange={(_, fileList) => input.onChange({ file: fileList?.[0] })}>
                  Прикрепить Настроечную таблицу
                </Input>
                <Flex>{value?.file?.name}</Flex>
              </Flex>
            )
          }}
        </Field>
      </Row>
    </Column>
  )
}
