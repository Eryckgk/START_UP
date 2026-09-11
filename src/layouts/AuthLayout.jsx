
import { Outlet } from "react-router-dom"
import "./AuthLayout.css"

function AuthLayout() {
    return (
        <div className="auth-layout">

            <div className="auth-layout-brand">

                <div className="auth-brand-logo">
                    <span>START</span>
                    <strong>_UP</strong>
                </div>

                <div className="auth-brand-content">
                    <span className="auth-brand-badge">
                        🚀 Plataforma para empreendedores
                    </span>

                    <h1>
                        Transforme sua ideia
                        <span> em realidade.</span>
                    </h1>

                    <p>
                        Encontre pessoas, ideias, conhecimento e
                        oportunidades para construir a próxima grande startup.
                    </p>
                </div>

                <div className="auth-brand-features">

                    <div className="auth-feature">
                        <span>💡</span>

                        <div>
                            <strong>Compartilhe ideias</strong>
                            <p>Mostre suas ideias para a comunidade.</p>
                        </div>
                    </div>

                    <div className="auth-feature">
                        <span>🤝</span>

                        <div>
                            <strong>Encontre parceiros</strong>
                            <p>Conecte-se com pessoas que complementam suas habilidades.</p>
                        </div>
                    </div>

                    <div className="auth-feature">
                        <span>🚀</span>

                        <div>
                            <strong>Crie sua startup</strong>
                            <p>Transforme uma ideia em um projeto real.</p>
                        </div>
                    </div>

                </div>

            </div>

            <main className="auth-layout-content">
                <Outlet />
            </main>

        </div>
    )
}

export default AuthLayout

