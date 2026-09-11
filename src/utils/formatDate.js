
export function formatDate(
    date,
    options = {}
) {

    if (!date) {
        return ""
    }

    const parsedDate =
        new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return ""
    }

    const defaultOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }

    return parsedDate.toLocaleDateString(
        "pt-BR",
        {
            ...defaultOptions,
            ...options
        }
    )
}

export function formatDateTime(date) {

    if (!date) {
        return ""
    }

    const parsedDate =
        new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return ""
    }

    return parsedDate.toLocaleString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    )
}

export function formatRelativeDate(date) {

    if (!date) {
        return ""
    }

    const parsedDate =
        new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return ""
    }

    const now = new Date()

    const difference =
        now.getTime() - parsedDate.getTime()

    const seconds =
        Math.floor(difference / 1000)

    const minutes =
        Math.floor(seconds / 60)

    const hours =
        Math.floor(minutes / 60)

    const days =
        Math.floor(hours / 24)

    if (seconds < 60) {
        return "agora"
    }

    if (minutes < 60) {
        return `há ${minutes} min`
    }

    if (hours < 24) {
        return `há ${hours}h`
    }

    if (days < 7) {
        return `há ${days}d`
    }

    return formatDate(parsedDate)
}

export default formatDate

