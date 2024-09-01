import { useState } from 'react'
import { useQuery } from 'react-query'

import { type Props, type Story } from '~/ui/storybook'

import * as Viewer from '../'
import { Explorer, Path } from '../../../types/explorer'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [paths, setPath] = useState<Path[]>([{ type: postgresMock.type, name: postgresMock.name }])
    const { data, isFetching } = useQuery([paths], () => getMock(paths), { keepPreviousData: true })

    return (
      <div style={{ width: '100%', height: '100%', border: '1px solid red' }}>
        <Viewer.Root context={{}} paths={paths} loading={isFetching} onPathChange={setPath} data={data} {...state}>
          <Viewer.Breadscrums />
        </Viewer.Root>
      </div>
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

  getName: (): string => Viewer.NAME,
} satisfies Story<State>

function getMock(paths: Path[]): Promise<Explorer> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [, tablePath] = paths
      if (tablePath) resolve(tableListMock.find((item) => item.name === tablePath.name) as Explorer)
      return resolve(postgresMock)
    }, 1000)
  })
}

const tableListMock: Explorer[] = Array(7)
  .fill(undefined)
  .map((_, i) => {
    const tableMock: Explorer = {
      paths: [
        { type: 'postgres', name: 'postgres-Mock' },
        { type: 'table', name: `table-${i}` },
      ],
      total: 7,
      name: `table-${i}`,
      type: 'table',
      items: Array(7)
        .fill(undefined)
        .map((_, k) => ({
          name: `row-${i}${k}`,
          type: 'row',
          data: {
            atr1: `atr-${i}${k}1`,
            atr2: `atr-${i}${k}2`,
            atr3: `atr-${i}${k}3`,
          },
        })),
    }
    return tableMock
  })

const postgresMock: Explorer = {
  total: 1,
  paths: [{ type: 'postgres', name: 'postgres-Mock' }],
  name: 'postgres-Mock',
  type: 'postgres',
  items: Array(7)
    .fill(undefined)
    .map((_, i) => ({
      name: `table-${i}`,
      type: 'table',
      data: {},
    })),
}
