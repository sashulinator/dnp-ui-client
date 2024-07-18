import { useEffect, useState } from 'react'

type Options = {
  dependencies?: unknown[]
  isEnabled?: boolean | undefined
}

export function useAsync<T>(initData: T | undefined, promise: () => Promise<T>, options: Options) {
  const [data, setData] = useState<T | undefined>(initData)
  const [error, setError] = useState<unknown>(null)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState<undefined | boolean>(undefined)

  const { dependencies = [], isEnabled = true } = options

  useEffect(() => {
    if (!isEnabled) return

    setIsPending(true)

    promise()
      .then((ret) => {
        setData(ret)
        setError(null)
        setIsSuccess(true)
      })
      .catch((err) => {
        setData(undefined)
        setError(err)
      })
      .finally(() => setIsPending(false))
  }, [...dependencies, isEnabled])

  return { isPending, error, data, isSuccess, isError: Boolean(error) }
}
