
import api from "./api"

/* =========================
   BUSCAR STARTUPS
========================= */

export async function getStartups(params = {}) {

    const query = new URLSearchParams()

    Object.entries(params).forEach(
        ([key, value]) => {

            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                query.append(
                    key,
                    value
                )
            }

        }
    )

    const queryString =
        query.toString()

    const endpoint =
        queryString
            ? `/startups?${queryString}`
            : "/startups"

    return await api.get(endpoint)
}

/* =========================
   BUSCAR UMA STARTUP
========================= */

export async function getStartup(id) {

    if (!id) {
        throw new Error(
            "ID da startup não informado."
        )
    }

    return await api.get(
        `/startups/${id}`
    )
}

/* =========================
   CRIAR STARTUP
========================= */

export async function createStartup(
    startupData
) {

    if (!startupData) {
        throw new Error(
            "Dados da startup não informados."
        )
    }

    return await api.post(
        "/startups",
        startupData
    )
}

/* =========================
   ATUALIZAR STARTUP
========================= */

export async function updateStartup(
    id,
    startupData
) {

    if (!id) {
        throw new Error(
            "ID da startup não informado."
        )
    }

    return await api.put(
        `/startups/${id}`,
        startupData
    )
}

/* =========================
   EXCLUIR STARTUP
========================= */

export async function deleteStartup(id) {

    if (!id) {
        throw new Error(
            "ID da startup não informado."
        )
    }

    return await api.remove(
        `/startups/${id}`
    )
}

/* =========================
   CURTIR STARTUP
========================= */

export async function likeStartup(id) {

    if (!id) {
        throw new Error(
            "ID da startup não informado."
        )
    }

    return await api.post(
        `/startups/${id}/like`
    )
}

/* =========================
   DESCURTIR STARTUP
========================= */

export async function unlikeStartup(id) {

    if (!id) {
        throw new Error(
            "ID da startup não informado."
        )
    }

    return await api.remove(
        `/startups/${id}/like`
    )
}

/* =========================
   PARTICIPAR DA STARTUP
========================= */

export async function joinStartup(id) {

    if (!id) {
        throw new Error(
            "ID da startup não informado."
        )
    }

    return await api.post(
        `/startups/${id}/join`
    )
}

/* =========================
   SAIR DA STARTUP
========================= */

export async function leaveStartup(id) {

    if (!id) {
        throw new Error(
            "ID da startup não informado."
        )
    }

    return await api.remove(
        `/startups/${id}/join`
    )
}

/* =========================
   BUSCAR POR CATEGORIA
========================= */

export async function getStartupsByCategory(
    category
) {

    if (!category) {
        return getStartups()
    }

    return getStartups({
        category
    })
}

/* =========================
   BUSCAR POR ETAPA
========================= */

export async function getStartupsByStage(
    stage
) {

    if (!stage) {
        return getStartups()
    }

    return getStartups({
        stage
    })
}

/* =========================
   PESQUISAR STARTUPS
========================= */

export async function searchStartups(
    search
) {

    if (!search?.trim()) {
        return getStartups()
    }

    return getStartups({
        search: search.trim()
    })
}

/* =========================
   STARTUPS DO USUÁRIO
========================= */

export async function getMyStartups() {

    return await api.get(
        "/startups/me"
    )
}

