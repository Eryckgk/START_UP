import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Button from "../../components/Button/Button"
import useAuth from "../../hooks/useAuth"

import "./Login.css"

function Login() {

    const navigate = useNavigate()
    const { setUser } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    function handleSubmit(event) {

        event.preventDefault()

        setError("")

        const emailClean = email.trim().toLowerCase()

        if (!emailClean) {
            setError("Digite seu e-mail.")
            return
        }

        if (!password) {
            setError("Digite sua senha.")
            return
        }

        setLoading(true)

        try {

            const savedUsers =
                localStorage.getItem("startup_users")

            const users = savedUsers
                ? JSON.parse(savedUsers)
                : []

            const user = users.find(
                (item) =>
                    item.email?.toLowerCase() === emailClean &&
                    item.password === password
            )

            if (!user) {

                setError(
                    "E-mail ou senha incorretos."
                )

                setLoading(false)

                return
            }

            /* =========================
               CRIA SESSÃO
            ========================= */

            const token =
                `startup-${user.id}-${Date.now()}`

            localStorage.setItem(
                "startup_token",
                token
            )

            localStorage.setItem(
                "startup_user",
                JSON.stringify(user)
            )

            /* =========================
               ATUALIZA CONTEXTO
            ========================= */

            setUser(user)

            /* =========================
               VAI PARA HOME
            ========================= */

            navigate("/", {
                replace: true
            })

        } catch (error) {

            console.error(
                "Erro no login:",
                error
            )

            setError(
                "Não foi possível realizar o login."
            )

        } finally {

            setLoading(false)
        }
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-logo">
                        START<span>_UP</span>
                    </div>

                    <h1>
                        Bem-vindo de volta
                    </h1>

                    <p>
                        Entre na sua conta para continuar.
                    </p>

                </div>

                {error && (
                    <div className="login-message login-error">
                        {error}
                    </div>
                )}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="login-field">

                        <label htmlFor="login-email">
                            E-mail
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            placeholder="voce@email.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                        />

                    </div>

                    <div className="login-field">

                        <label htmlFor="login-password">
                            Senha
                        </label>

                        <input
                            id="login-password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                        />

                    </div>

                    <div className="login-options">

                        <label className="login-remember">

                            <input
                                type="checkbox"
                            />

                            <span>
                                Lembrar de mim
                            </span>

                        </label>

                        <button
                            type="button"
                            className="login-forgot"
                            onClick={() =>
                                alert(
                                    "Recuperação de senha será adicionada posteriormente."
                                )
                            }
                        >
                            Esqueci minha senha
                        </button>

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Entrando..."
                            : "Entrar"
                        }
                    </Button>

                </form>

                <div className="login-footer">

                    <span>
                        Ainda não possui uma conta?
                    </span>

                    <Link to="/register">
                        Criar conta
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Login