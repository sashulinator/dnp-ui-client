import { BaseDictionaryTable, CreateDictionaryTable } from '../../../types/dictionary-table'

type FormDictionaryTable = CreateDictionaryTable & Partial<BaseDictionaryTable>

export type Values = FormDictionaryTable
