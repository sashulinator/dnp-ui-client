import { useState } from 'react'

import { type Id, generateId } from '../core'

export type GenerateNewId = () => void

export function useId(): [Id, GenerateNewId] {
  const [id, setId] = useState(generateId)
  return [id, () => setId(generateId())]
}
