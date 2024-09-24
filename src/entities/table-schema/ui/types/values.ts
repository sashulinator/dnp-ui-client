import type { BaseDictionaryTable, CreateDictionaryTable } from '~/common/entities/dictionary-table'

type FormDictionaryTable = CreateDictionaryTable & Partial<BaseDictionaryTable>

export type Values = FormDictionaryTable
