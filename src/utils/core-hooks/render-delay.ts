import { useState } from 'react'

import { useOnMount } from './on-mount'

export function useRenderDelay(ms: number) {
  const [isDelayed, setIsDelayed] = useState(true)

  useOnMount(() => {
    setTimeout(() => setIsDelayed(false), ms)
  })

  return { isDelayed, isRender: !isDelayed }
}
