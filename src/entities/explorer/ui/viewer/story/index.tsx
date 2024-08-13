import { type Story, type Props } from '~/ui/storybook'

import { useState } from 'react'
import { useQuery } from 'react-query'
import Viewer, { NAME } from '../'
import { Explorer, Path } from '../../../types/explorer'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [paths, setPath] = useState<Path[]>([{ type: jdbcMock.type, name: jdbcMock.name }])
    const { data, isFetching } = useQuery([paths], () => getMock(paths), { keepPreviousData: true })

    return (
      <div style={{ width: '100%', height: '100%', border: '1px solid red' }}>
        <Viewer paths={paths} loading={isFetching} onPathChange={setPath} data={data} {...state} />
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

  getName: (): string => NAME,
} satisfies Story<State>

function getMock(paths: Path[]): Promise<Explorer> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [, tablePath] = paths
      if (tablePath) resolve(tableListMock.find((item) => item.name === tablePath.name) as Explorer)
      return resolve(jdbcMock)
    }, 1000)
  })
}

const tableListMock: Explorer[] = Array(7)
  .fill(undefined)
  .map((_, i) => {
    const tableMock: Explorer = {
      paths: [
        { type: 'jdbc', name: 'jdbc-Mock' },
        { type: 'table', name: `table-${i}` },
      ],
      total: 7,
      name: `table-${i}`,
      type: 'table',
      items: Array(7)
        .fill(undefined)
        .map((_, k) => ({
          name: `record-${i}${k}`,
          type: 'record',
          data: {
            atr1: `atr-${i}${k}1`,
            atr2: `atr-${i}${k}2`,
            atr3: `atr-${i}${k}3`,
          },
        })),
    }
    return tableMock
  })

const jdbcMock: Explorer = {
  total: 1,
  paths: [{ type: 'jdbc', name: 'jdbc-Mock' }],
  name: 'jdbc-Mock',
  type: 'jdbc',
  items: Array(7)
    .fill(undefined)
    .map((_, i) => ({
      name: `table-${i}`,
      type: 'table',
      data: {},
    })),
}
