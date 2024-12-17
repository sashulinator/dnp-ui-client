import { type ExecutableDesign } from '../../models'

export const testExecutableDesign: ExecutableDesign = {
  name: 'dnp-common/artifacts/procedures/Test',
  display: 'Тест',
  params: [
    {
      name: 'test',
      display: 'Тест',
      component: {
        name: 'string',
      },
    },
  ],
}
