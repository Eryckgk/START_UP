
/* =========================
   EMAIL
========================= */

export function isValidEmail(email) {

    if (!email) {
        return false
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(
        String(email).trim()
    )
}

/* =========================
   SENHA
========================= */

export function isValidPassword(password) {

    if (!password) {
        return false
    }

    return password.length >= 6
}

/* =========================
   CONFIRMAR SENHA
========================= */

export function passwordsMatch(
    password,
    confirmPassword
) {

    return (
        password === confirmPassword
    )
}

/* =========================
   NOME
========================= */

export function isValidName(name) {

    if (!name) {
        return false
    }

    return (
        String(name).trim().length >= 3
    )
}

/* =========================
   USERNAME
========================= */

export function isValidUsername(
    username
) {

    if (!username) {
        return false
    }

    const usernameRegex =
        /^[a-zA-Z0-9_]{3,20}$/

    return usernameRegex.test(
        String(username).trim()
    )
}

/* =========================
   CAMPO OBRIGATÓRIO
========================= */

export function isRequired(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return false
    }

    return String(value).trim().length > 0
}

/* =========================
   STARTUP
========================= */

export function validateStartup(
    startup
) {

    const errors = {}

    if (!isRequired(startup?.name)) {
        errors.name =
            "O nome da startup é obrigatório."
    }

    if (!isRequired(startup?.category)) {
        errors.category =
            "Selecione uma categoria."
    }

    if (!isRequired(startup?.problem)) {
        errors.problem =
            "Descreva o problema que sua startup resolve."
    }

    if (!isRequired(startup?.audience)) {
        errors.audience =
            "Informe o público-alvo."
    }

    if (!isRequired(startup?.solution)) {
        errors.solution =
            "Descreva a solução."
    }

    if (!isRequired(startup?.businessModel)) {
        errors.businessModel =
            "Informe o modelo de negócio."
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    }
}

/* =========================
   LOGIN
========================= */

export function validateLogin(
    email,
    password
) {

    const errors = {}

    if (!isValidEmail(email)) {
        errors.email =
            "Informe um e-mail válido."
    }

    if (!isValidPassword(password)) {
        errors.password =
            "A senha deve ter pelo menos 6 caracteres."
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    }
}

/* =========================
   CADASTRO
========================= */

export function validateRegister(
    data
) {

    const errors = {}

    if (!isValidName(data?.name)) {
        errors.name =
            "Informe seu nome completo."
    }

    if (!isValidUsername(data?.username)) {
        errors.username =
            "O usuário deve ter entre 3 e 20 caracteres e usar apenas letras, números ou _. "
    }

    if (!isValidEmail(data?.email)) {
        errors.email =
            "Informe um e-mail válido."
    }

    if (!isValidPassword(data?.password)) {
        errors.password =
            "A senha deve ter pelo menos 6 caracteres."
    }

    if (
        !passwordsMatch(
            data?.password,
            data?.confirmPassword
        )
    ) {
        errors.confirmPassword =
            "As senhas não coincidem."
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    }
}
