
import api from "./api"

/* =========================
   STORAGE
========================= */

const TOKEN_KEY = "startup_token"
const USER_KEY = "startup_user"

/* =========================
   LOGIN
========================= */

export async function login(email, password) {

    try {

        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        )

        if (response.token) {
            localStorage.setItem(
                TOKEN_KEY,
                response.token
            )
        }

        if (response.user) {
            localStorage.setItem(
                USER_KEY,
                JSON.stringify(response.user)
            )
        }

        return response

    } catch (error) {

        console.error(
            "Erro ao fazer login:",
            error
        )

        throw error
    }
}

/* =========================
   REGISTRO
========================= */

export async function register(userData) {

    try {

        const response = await api.post(
            "/auth/register",
            userData
        )

        return response

    } catch (error) {

        console.error(
            "Erro ao cadastrar usuário:",
            error
        )

        throw error
    }
}

/* =========================
   LOGOUT
========================= */

export function logout() {

    localStorage.removeItem(
        TOKEN_KEY
    )

    localStorage.removeItem(
        USER_KEY
    )
}

/* =========================
   TOKEN
========================= */

export function getToken() {

    return localStorage.getItem(
        TOKEN_KEY
    )
}

/* =========================
   USUÁRIO ATUAL
========================= */

export function getCurrentUser() {

    const user = localStorage.getItem(
        USER_KEY
    )

    if (!user) {
        return null
    }

    try {

        return JSON.parse(user)

    } catch (error) {

        console.error(
            "Erro ao recuperar usuário:",
            error
        )

        return null
    }
}

/* =========================
   AUTENTICAÇÃO
========================= */

export function isAuthenticated() {

    return Boolean(
        getToken()
    )
}

/* =========================
   ATUALIZAR USUÁRIO
========================= */

export function updateCurrentUser(user) {

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    )

    return user
}

/* =========================
   BUSCAR PERFIL
========================= */

export async function getProfile() {

    try {

        return await api.get(
            "/auth/me"
        )

    } catch (error) {

        console.error(
            "Erro ao buscar perfil:",
            error
        )

        throw error
    }
}

