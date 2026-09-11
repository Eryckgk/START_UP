import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Button from "../../components/Button/Button"
import useAuth from "../../hooks/useAuth"

import "./Register.css"

function Register() {

    const navigate = useNavigate()
    const { register } = useAuth()

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    function handleChange(event) {

        const { name, value } = event.target

        setFormData((current) => ({
            ...current,
            [name]: value
        }))

        setError("")
        setSuccess("")
    }

    async function handleSubmit(event) {

        event.preventDefault()

        setError("")
        setSuccess("")

        if (!formData.name.trim()) {
            setError("Digite seu nome.")
            return
        }

        if (!formData.username.trim()) {
            setError("Digite seu nome de usuário.")
            return
        }

        if (!formData.email.trim()) {
            setError("Digite seu e-mail.")
            return
        }

        if (!formData.email.includes("@")) {
            setError("Digite um e-mail válido.")
            return
        }

        if (formData.password.length < 6) {
            setError("A senha precisa ter pelo menos 6 caracteres.")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem.")
            return
        }

        setLoading(true)

        try {

            const users =
                JSON.parse(
                    localStorage.getItem("startup_users") || "[]"
                )

            const emailAlreadyExists =
                users.some(
                    (user) =>
                        user.email.toLowerCase() ===
                        formData.email.toLowerCase()
                )

            if (emailAlreadyExists) {
                throw new Error(
                    "Este e-mail já está cadastrado."
                )
            }

            const usernameAlreadyExists =
                users.some(
                    (user) =>
                        user.username.toLowerCase() ===
                        formData.username.toLowerCase()
                )

            if (usernameAlreadyExists) {
                throw new Error(
                    "Este nome de usuário já está cadastrado."
                )
            }

            const newUser = {
                id: Date.now(),

                name: formData.name.trim(),

                username: formData.username
                    .trim()
                    .startsWith("@")
                    ? formData.username.trim()
                    : `@${formData.username.trim()}`,

                email: formData.email.trim().toLowerCase(),

                password: formData.password,

                role: "Empreendedor",

                bio: "",

                followers: 0,

                following: 0,

                startups: 0,

                skills: [],

                createdAt: new Date().toISOString()
            }

            users.push(newUser)

            localStorage.setItem(
                "startup_users",
                JSON.stringify(users)
            )

            /*
             * Mantemos a função do AuthContext disponível
             * para quando o backend for conectado.
             */
            try {
                await register(newUser)
            } catch {
                /*
                 * Enquanto não existe backend,
                 * o cadastro local continua funcionando.
                 */
            }

            setSuccess(
                "Conta criada com sucesso! Redirecionando..."
            )

            setTimeout(() => {
                navigate("/login")
            }, 1200)

        } catch (err) {

            setError(
                err.message ||
                "Não foi possível criar a conta."
            )

        } finally {

            setLoading(false)
        }
    }

    return (
        <div className="register-container">

            <div className="register-card">

                <div className="register-header">

                    <div className="register-logo">
                        START<span>_UP</span>
                    </div>

                    <h1>
                        Criar sua conta
                    </h1>

                    <p>
                        Entre para a comunidade de empreendedores.
                    </p>

                </div>

                {error && (
                    <div className="register-message register-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="register-message register-success">
                        {success}
                    </div>
                )}

                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >

                    <div className="register-field">

                        <label htmlFor="name">
                            Nome completo
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Digite seu nome"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />

                    </div>

                    <div className="register-field">

                        <label htmlFor="username">
                            Nome de usuário
                        </label>

                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="ex: joaocarlos"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                        />

                    </div>

                    <div className="register-field">

                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="voce@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />

                    </div>

                    <div className="register-field">

                        <label htmlFor="password">
                            Senha
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mínimo de 6 caracteres"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                    </div>

                    <div className="register-field">

                        <label htmlFor="confirmPassword">
                            Confirmar senha
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Digite a senha novamente"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Criando conta..."
                            : "Criar conta"
                        }
                    </Button>

                </form>

                <div className="register-footer">

                    <span>
                        Já possui uma conta?
                    </span>

                    <Link to="/login">
                        Entrar
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Register