
import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import Button from "../../components/Button/Button"

import { supabase } from "../../services/supabase"

import "./Register.css"

function Register() {

    const navigate = useNavigate()

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

        const {
            name,
            value
        } = event.target

        setFormData(current => ({
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

        // =========================
        // VALIDAÇÕES
        // =========================

        const name = formData.name.trim()
        const username = formData.username.trim()
        const email = formData.email.trim().toLowerCase()
        const password = formData.password
        const confirmPassword = formData.confirmPassword

        if (!name) {
            setError("Digite seu nome.")
            return
        }

        if (!username) {
            setError("Digite seu nome de usuário.")
            return
        }

        if (!email) {
            setError("Digite seu e-mail.")
            return
        }

        if (!email.includes("@")) {
            setError("Digite um e-mail válido.")
            return
        }

        if (password.length < 6) {
            setError(
                "A senha precisa ter pelo menos 6 caracteres."
            )
            return
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.")
            return
        }

        setLoading(true)

        try {

            const formattedUsername =
                username.startsWith("@")
                    ? username
                    : `@${username}`

            // =========================
            // CRIAR USUÁRIO NO SUPABASE
            // =========================

            const {
                data,
                error: authError
            } = await supabase.auth.signUp({

                email,

                password,

                options: {

                    data: {

                        name,

                        username:
                            formattedUsername,

                        role:
                            "Empreendedor"

                    }

                }

            })

            console.log(
                "SUPABASE SIGN UP DATA:",
                data
            )

            console.log(
                "SUPABASE SIGN UP ERROR:",
                authError
            )

            // =========================
            // ERRO
            // =========================

            if (authError) {
                throw authError
            }

            // =========================
            // VERIFICAÇÃO
            // =========================

            if (!data.user) {

                throw new Error(
                    "O Supabase não retornou o usuário criado."
                )

            }

            // =========================
            // SUCESSO
            // =========================

            if (data.session) {

                setSuccess(
                    "Conta criada com sucesso!"
                )

            } else {

                setSuccess(
                    "Conta criada! Verifique seu e-mail para confirmar a conta."
                )

            }

            setFormData({
                name: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

            // Vai para login depois de um pequeno intervalo
            setTimeout(() => {
                navigate("/login")
            }, 1800)

        } catch (err) {

            console.error(
                "ERRO COMPLETO NO CADASTRO:",
                err
            )

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
                            required
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
                            required
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
                            required
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
                            minLength={6}
                            required
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
                            minLength={6}
                            required
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

