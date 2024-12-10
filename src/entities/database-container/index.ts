import * as dcdatabase from './dcdatabase/api.v1'
import * as dcservice from './dcservice/api.v1'

export const api = {
  dcservice,
  dcdatabase,
}

export type {
  Schema,
  UpdateSchema,
  CreateSchema,
  FlatTable,
  Table,
  CreateTable,
  UpdateTable,
  Column,
  CreateColumn,
  UpdateColumn,
} from './models'
