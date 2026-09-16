import { createContext, useEffect, useState } from "react"

import { supabase } from "../services/supabase"

export const AuthContext = createContext(null)

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadSession() {
            const {
                data: { session }
            } = await supabase.auth.getSession()

            setUser(session?.user ?? null)
            setLoading(false)
        }

        loadSession()

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    async function login(email, password) {
        setLoading(true)

        try {
            const { data, error } =
                await supabase.auth.signInWithPassword({
                    email,
                    password
                })

            if (error) {
                throw error
            }

            setUser(data.user)

            return data
        } finally {
            setLoading(false)
        }
    }

    async function register(userData) {
        setLoading(true)

        try {
            const {
                email,
                password,
                ...metadata
            } = userData

            const { data, error } =
                await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: metadata
                    }
                })

            if (error) {
                throw error
            }

            setUser(data.user ?? null)

            return data
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        await supabase.auth.signOut()
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