/**
 * api
 */

import * as create from './api/create'
import * as explorerFetchList from './api/explore'
import * as explorerCreate from './api/explorer-create'
import * as explorerRemove from './api/explorer-remove'
import * as explorerUpdate from './api/explorer-update'
import * as fetchList from './api/fetch-list'
import * as getByKn from './api/get-by-kn'
import * as update from './api/update'

export const api = {
  fetchList,
  getByKn,
  update,
  create,
  explorerFetchList,
  explorerCreate,
  explorerUpdate,
  explorerRemove,
}

/**
 * types
 */

export {
  type OperationalTable,
  type BaseOperationalTable,
  type UpdateOperationalTable,
  type CreateOperationalTable,
  type OperationalTableRelations,
  type TableSchema,
  type TableSchemaItem,
  operationalTableSchema,
  createOperationalTableSchema,
  updateOperationalTableSchema,
  baseOperationalTableSchema,
  operationalTableRelationsSchema,
} from './types/operational-table'

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
