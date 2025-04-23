import { ScrollArea } from '@radix-ui/themes'

import Card from '~/shared/card'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import DcserviceForm from './index'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm(
      {
        // eslint-disable-next-line no-console
        onSubmit: console.log,
      },
      {
        values: true,
      },
    )

    const formState = form.getState()

    return (
      <Flex height='100%' width='100%' p='8' gap='4' style={{ position: 'relative' }}>
        <Flex width='1024px' direction='column' gap='4' pb='300px'>
          <Form form={form} component={DcserviceForm} {...state} />
          <button disabled={!formState.dirty || formState.invalid}>Submit</button>
        </Flex>
        <Flex
          height='200px'
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            width: '90%',
          }}
        >
          <Card style={{ width: '100%' }}>
            <ScrollArea>
              <code style={{ whiteSpace: 'pre-wrap', width: '50%' }}>
                {JSON.stringify(form.getState()?.values, null, 2)}
              </code>
            </ScrollArea>
          </Card>
        </Flex>
      </Flex>
    )
  },

  controls: [
    // {
    //   name: 'name',
    //   input: 'input',
    //   defaultValue: '',
    // },
    // {
    //   name: 'name',
    //   input: 'select',
    //   options: [],
    //   defaultValue: '',
    // },
    // { name: 'name', input: 'checkbox', defaultValue: false },
  ],

  getName: (): string => DcserviceForm.displayName,
} satisfies Story<State>
