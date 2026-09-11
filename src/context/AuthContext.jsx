
import { createContext, useEffect, useState } from "react"
import {
    login as loginService,
    register as registerService,
    logout as logoutService,
    getCurrentUser,
    isAuthenticated
} from "../services/auth"

export const AuthContext = createContext(null)

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const savedUser = getCurrentUser()

        if (savedUser && isAuthenticated()) {
            setUser(savedUser)
        }

        setLoading(false)

    }, [])

    async function login(email, password) {

        setLoading(true)

        try {

            const response = await loginService(
                email,
                password
            )

            const loggedUser =
                response?.user || getCurrentUser()

            setUser(loggedUser)

            return response

        } finally {
            setLoading(false)
        }
    }

    async function register(userData) {

        setLoading(true)

        try {

            const response =
                await registerService(userData)

            return response

        } finally {
            setLoading(false)
        }
    }

    function logout() {

        logoutService()

        setUser(null)
    }

    const value = {
        user,
        setUser,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

