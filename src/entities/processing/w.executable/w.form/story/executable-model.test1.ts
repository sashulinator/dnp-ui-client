import { type ExecutableModel } from '../../models'

export const testExecutableModel: ExecutableModel = {
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
