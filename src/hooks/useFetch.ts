import { useEffect, useState } from 'react'

interface FetchState<T> {
    data: T | null
    isLoading: boolean
    error: string | null
}

export const useFetch = <T>(fetcher: () => Promise<T>): FetchState<T> => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const load = async (): Promise<void> => {
            setIsLoading(true)
            setError(null)

            try {
                const result = await fetcher()
                setData(result)

            } catch(err) {
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                setIsLoading(false)                                
            }
        }
        load()
    }, [fetcher])

    return { data, isLoading, error }
}