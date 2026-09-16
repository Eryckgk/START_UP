
import { supabase } from "./supabase"

const API_URL = "http://localhost:3000/api"


async function request(endpoint, options = {}) {

    // =========================
    // PEGA A SESSÃO DO SUPABASE
    // =========================

    const {
        data: { session }
    } = await supabase.auth.getSession()

    const token = session?.access_token


    // =========================
    // CONFIGURAÇÃO
    // =========================

    const config = {

        method: options.method || "GET",

        headers: {

            "Content-Type": "application/json",

            ...(options.headers || {})

        },

        ...options

    }


    // =========================
    // TOKEN
    // =========================

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`

    }


    // =========================
    // BODY
    // =========================

    if (
        config.body &&
        typeof config.body !== "string"
    ) {

        config.body = JSON.stringify(
            config.body
        )

    }


    // =========================
    // REQUISIÇÃO
    // =========================

    try {

        const response = await fetch(
            `${API_URL}${endpoint}`,
            config
        )


        const contentType =
            response.headers.get("content-type")


        const data =
            contentType?.includes("application/json")
                ? await response.json()
                : await response.text()


        // =========================
        // ERRO
        // =========================

        if (!response.ok) {

            const message =
                data?.message ||
                data?.error ||
                "Ocorreu um erro na requisição."

            throw new Error(message)

        }


        return data

    } catch (error) {

        console.error(
            "Erro na API:",
            error
        )

        throw error

    }
}


// =========================
// GET
// =========================

export function get(endpoint) {

    return request(endpoint, {
        method: "GET"
    })

}


// =========================
// POST
// =========================

export function post(endpoint, data) {

    return request(endpoint, {

        method: "POST",

        body: data

    })

}


// =========================
// PUT
// =========================

export function put(endpoint, data) {

    return request(endpoint, {

        method: "PUT",

        body: data

    })

}


// =========================
// PATCH
// =========================

export function patch(endpoint, data) {

    return request(endpoint, {

        method: "PATCH",

        body: data

    })

}


// =========================
// DELETE
// =========================

export function remove(endpoint) {

    return request(endpoint, {

        method: "DELETE"

    })

}


export default {

    get,
    post,
    put,
    patch,
    remove

}
