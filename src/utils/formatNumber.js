
export function formatNumber(
    number,
    decimals = 1
) {

    if (
        number === null ||
        number === undefined ||
        Number.isNaN(Number(number))
    ) {
        return "0"
    }

    const value = Number(number)

    if (value < 1000) {
        return String(value)
    }

    if (value < 1000000) {

        const formatted =
            (value / 1000)
                .toFixed(decimals)
                .replace(".", ",")

        return `${formatted} mil`
    }

    if (value < 1000000000) {

        const formatted =
            (value / 1000000)
                .toFixed(decimals)
                .replace(".", ",")

        return `${formatted} mi`
    }

    const formatted =
        (value / 1000000000)
            .toFixed(decimals)
            .replace(".", ",")

    return `${formatted} bi`
}

export function formatCurrency(
    value,
    currency = "BRL"
) {

    if (
        value === null ||
        value === undefined ||
        Number.isNaN(Number(value))
    ) {
        return "R$ 0,00"
    }

    return Number(value).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency
        }
    )
}

export default formatNumber

