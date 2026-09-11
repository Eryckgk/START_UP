
import { useCallback, useState } from "react"
import {
    getStartup,
    createStartup,
    updateStartup,
    deleteStartup,
    likeStartup,
    unlikeStartup,
    joinStartup,
    leaveStartup
} from "../services/startups"

function useStartup(startupId = null) {

    const [startup, setStartup] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadStartup = useCallback(
        async (id = startupId) => {

            if (!id) {
                return null
            }

            setLoading(true)
            setError(null)

            try {

                const data =
                    await getStartup(id)

                setStartup(data)

                return data

            } catch (err) {

                setError(err)

                throw err

            } finally {

                setLoading(false)
            }
        },
        [startupId]
    )

    const addStartup = useCallback(
        async (startupData) => {

            setLoading(true)
            setError(null)

            try {

                const data =
                    await createStartup(startupData)

                setStartup(data)

                return data

            } catch (err) {

                setError(err)

                throw err

            } finally {

                setLoading(false)
            }
        },
        []
    )

    const editStartup = useCallback(
        async (id, startupData) => {

            setLoading(true)
            setError(null)

            try {

                const data =
                    await updateStartup(
                        id,
                        startupData
                    )

                setStartup(data)

                return data

            } catch (err) {

                setError(err)

                throw err

            } finally {

                setLoading(false)
            }
        },
        []
    )

    const removeStartup = useCallback(
        async (id) => {

            setLoading(true)
            setError(null)

            try {

                await deleteStartup(id)

                setStartup(null)

            } catch (err) {

                setError(err)

                throw err

            } finally {

                setLoading(false)
            }
        },
        []
    )

    const toggleLike = useCallback(
        async (id, liked) => {

            try {

                const data = liked
                    ? await unlikeStartup(id)
                    : await likeStartup(id)

                if (startup) {
                    setStartup((current) => ({
                        ...current,
                        ...data
                    }))
                }

                return data

            } catch (err) {

                setError(err)

                throw err
            }
        },
        [startup]
    )

    const join = useCallback(
        async (id) => {

            try {

                const data =
                    await joinStartup(id)

                if (startup) {
                    setStartup((current) => ({
                        ...current,
                        ...data
                    }))
                }

                return data

            } catch (err) {

                setError(err)

                throw err
            }
        },
        [startup]
    )

    const leave = useCallback(
        async (id) => {

            try {

                const data =
                    await leaveStartup(id)

                if (startup) {
                    setStartup((current) => ({
                        ...current,
                        ...data
                    }))
                }

                return data

            } catch (err) {

                setError(err)

                throw err
            }
        },
        [startup]
    )

    return {
        startup,
        setStartup,
        loading,
        error,
        loadStartup,
        addStartup,
        editStartup,
        removeStartup,
        toggleLike,
        join,
        leave
    }
}

export default useStartup

