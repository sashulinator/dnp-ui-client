import { type Create } from '~/lib/api'

import { type NormalizationConfig } from '../../../../../../../dnp-ui-client/src/entities/normalization-config/types/normalization-config'

export const defaultValues: Create<NormalizationConfig> = {
  name: '',
  v: 1,
  data: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sdk: {
      'storage-provider': 'mixed',
      'write-mode': 'overwrite',
      'procedure-config': {
        'dnp-feature-collector-config': {
          features: [
            {
              column: '',
              transform: [
                {
                  type: '',
                },
              ],
            },
          ],
        },
      },

      'provider-config': {},

      dnp: {
        'main-contour': 'TEST',
        contour: 'TEST',
        format: 'dd.MM.yyyy',
        'report-dt': '01.01.1991',
        'config-tables-path': 's3a://dnp-case-1/configtables',
        'config-tables-max-size': 300,
      },

      'universal-services': [
        'ru.datatech.sdk.service.dataframe.DFactory',
        'ru.datatech.sdk.service.configtables.ConfigTablesFactory',
        'ru.datatech.sdk.service.procedure.ProcedureConfigFactory',
      ],
    },

    executables: [
      {
        'computable-config': {
          'computable-name': '',
          version: '0.0.1',
        },
        'sdk-config': {
          'sdk-name': 'risk-engine-corp-sdk',
          version: '1.1.2',
        },
      },
    ],

    'preload-jars': [{ name: 'dnp-common/artifacts/functions/DnpFunctions', version: '0.0.1' }],

    'driver-universal-services': ['ru.datatech.functions.DnpStringFunctions', 'ru.datatech.functions.DnpTaxFunctions'],

    spark: { 'app.name': 'dnp-demo-dev' },
  },
}
