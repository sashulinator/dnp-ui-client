import type { BaseDictionaryTable, CreateDictionaryTable } from '../../../models/dictionary-table'

type FormDictionaryTable = CreateDictionaryTable & Partial<BaseDictionaryTable>

export type Values = FormDictionaryTable
