import { useState } from 'react'

export type Update = () => void

export function useForceUpdate(): Update {
  const [, setUpdate] = useState({})

  return () => setUpdate({})
}
