
import { supabase } from "./supabase"


// =========================
// LOGIN
// =========================

export async function login(email, password) {

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        })

    if (error) {

        console.error(
            "Erro ao fazer login:",
            error
        )

        throw error
    }

    return data.user
}


// =========================
// REGISTRO
// =========================

export async function register(userData) {

    const {
        email,
        password,
        ...profileData
    } = userData

    const { data, error } =
        await supabase.auth.signUp({
            email,
            password,
            options: {
                data: profileData
            }
        })

    if (error) {

        console.error(
            "Erro ao cadastrar usuário:",
            error
        )

        throw error
    }

    return data.user
}


// =========================
// LOGOUT
// =========================

export async function logout() {

    const { error } =
        await supabase.auth.signOut()

    if (error) {

        console.error(
            "Erro ao fazer logout:",
            error
        )

        throw error
    }
}


// =========================
// TOKEN
// =========================

export async function getToken() {

    const {
        data: { session }
    } = await supabase.auth.getSession()

    return session?.access_token || null
}


// =========================
// USUÁRIO ATUAL
// =========================

export async function getCurrentUser() {

    const {
        data: { user },
        error
    } = await supabase.auth.getUser()

    if (error) {
        return null
    }

    return user
}


// =========================
// AUTENTICAÇÃO
// =========================

export async function isAuthenticated() {

    const {
        data: { session }
    } = await supabase.auth.getSession()

    return Boolean(session)
}


// =========================
// ATUALIZAR USUÁRIO
// =========================

export async function updateCurrentUser(userData) {

    const {
        data,
        error
    } = await supabase.auth.updateUser({
        data: userData
    })

    if (error) {

        console.error(
            "Erro ao atualizar usuário:",
            error
        )

        throw error
    }

    return data.user
}


// =========================
// BUSCAR PERFIL
// =========================

export async function getProfile() {

    const user = await getCurrentUser()

    if (!user) {
        throw new Error(
            "Usuário não autenticado."
        )
    }

    return user
}

