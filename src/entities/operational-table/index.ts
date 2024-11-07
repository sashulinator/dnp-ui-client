/**
 * api
 */
import * as create from './api/create'
import * as explorer from './api/explorer'
import * as fetchList from './api/fetch-list'
import * as getByKn from './api/get-by-kn'
import * as update from './api/update'

export const api = {
  fetchList,
  getByKn,
  update,
  create,
  explorer,
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
  type Column,
  type Row,
  operationalTableSchema,
  createOperationalTableSchema,
  updateOperationalTableSchema,
  baseOperationalTableSchema,
  operationalTableRelationsSchema,
  rowSchema,
} from './types/operational-table'

/**
 * ui
 */

export { SYSNAME, NAME } from './constants/name'
export { default as ExplorerViewer } from './ui/explorer-viewer'
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
