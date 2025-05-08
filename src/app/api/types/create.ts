export type Create<T> = Omit<T, 'id' | 'createdBy' | 'updatedBy' | 'createdAt' | 'updatedAt'>
