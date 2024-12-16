import { useState } from "react"

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback()
    } catch (error) {
      setIsError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}