export type Update<T> = Omit<T, 'createdBy' | 'updatedBy' | 'createAt' | 'updateAt'>
