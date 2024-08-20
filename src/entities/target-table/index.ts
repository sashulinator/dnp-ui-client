/**
 * api
 */

import * as create from './api/create'
import * as fetchList from './api/fetch-list'
import * as getByKn from './api/get-by-kn'
import * as update from './api/update'

export const api = {
  fetchList,
  getByKn,
  update,
  create,
}

/**
 * types
 */

export {
  type TargetTable,
  type BaseTargetTable,
  type UpdateTargetTable,
  type CreateTargetTable,
  type TargetTableRelations,
  targetTableSchema,
  createTargetTableSchema,
  updateTargetTableSchema,
  baseTargetTableSchema,
  targetTableRelationsSchema,
} from './types/target-table'

/**
 * ui
 */

export { default as Item, type ItemProps } from './ui/item'
export { default as Icon } from './ui/icon'
export {
  default as Form,
  type FormProps,
  type Values as FormValues,
  defaultValues,
  fromValues as fromFormValues,
  toValues as toFormValues,
} from './ui/form'
