
import { useCallback, useEffect, useState } from "react"

function useFetch(
    fetchFunction,
    options = {}
) {

    const {
        immediate = true,
        initialData = null
    } = options

    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(immediate)
    const [error, setError] = useState(null)

    const execute = useCallback(
        async (...args) => {

            setLoading(true)
            setError(null)

            try {

                const result =
                    await fetchFunction(...args)

                setData(result)

                return result

            } catch (err) {

                setError(err)

                throw err

            } finally {

                setLoading(false)
            }

        },
        [fetchFunction]
    )

    useEffect(() => {

        if (!immediate) {
            return
        }

        execute().catch(() => {})

    }, [execute, immediate])

    return {
        data,
        setData,
        loading,
        error,
        execute,
        refetch: execute
    }
}

export default useFetch

