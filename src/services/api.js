
const API_URL = "http://localhost:3000/api"

async function request(endpoint, options = {}) {

    const token = localStorage.getItem("startup_token")

    const config = {
        method: options.method || "GET",

        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },

        ...options
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    if (
        config.body &&
        typeof config.body !== "string"
    ) {
        config.body = JSON.stringify(config.body)
    }

    try {

        const response = await fetch(
            `${API_URL}${endpoint}`,
            config
        )

        const contentType =
            response.headers.get("content-type")

        const data = contentType?.includes("application/json")
            ? await response.json()
            : await response.text()

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

/* =========================
   MÉTODOS HTTP
========================= */

export function get(endpoint) {
    return request(endpoint, {
        method: "GET"
    })
}

export function post(endpoint, data) {
    return request(endpoint, {
        method: "POST",
        body: data
    })
}

export function put(endpoint, data) {
    return request(endpoint, {
        method: "PUT",
        body: data
    })
}

export function patch(endpoint, data) {
    return request(endpoint, {
        method: "PATCH",
        body: data
    })
}

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

