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
  type DictionaryTable,
  type BaseDictionaryTable,
  type UpdateDictionaryTable,
  type CreateDictionaryTable,
  type DictionaryTableRelations,
  type TableSchema,
  type TableSchemaItem,
  type Row,
  dictionaryTableModel as dictionaryTableSchema,
  createDictionaryTableModel as createDictionaryTableSchema,
  updateDictionaryTableModel as updateDictionaryTableSchema,
  baseDictionaryTableModel as baseDictionaryTableSchema,
  dictionaryTableRelationsModel as dictionaryTableRelationsSchema,
  rowSchema,
} from './types/dictionary-table'

/**
 * ui
 */

export { SLICE_NAME as SYSNAME, NAME } from './constants/name'
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
