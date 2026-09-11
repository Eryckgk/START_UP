
import { useEffect, useState } from "react"

function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {

        try {

            const storedValue =
                localStorage.getItem(key)

            if (storedValue === null) {
                return initialValue
            }

            return JSON.parse(storedValue)

        } catch (error) {

            console.error(
                "Erro ao ler localStorage:",
                error
            )

            return initialValue
        }
    })

    useEffect(() => {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            )

        } catch (error) {

            console.error(
                "Erro ao salvar no localStorage:",
                error
            )
        }

    }, [key, value])

    function removeValue() {

        try {

            localStorage.removeItem(key)

            setValue(initialValue)

        } catch (error) {

            console.error(
                "Erro ao remover localStorage:",
                error
            )
        }
    }

    return [
        value,
        setValue,
        removeValue
    ]
}

export default useLocalStorage

