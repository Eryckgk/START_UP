import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import StartupCard from "../../components/StartupCard/StartupCard"
import "./Dashboard.css"

function Dashboard() {

    return (
        <div className="dashboard">

            <Navbar user="João" />

            <div className="dashboard-layout">

                <Sidebar activePage="dashboard" />

                <main className="dashboard-content">

                    <header className="dashboard-header">

                        <div>
                            <h1>Dashboard</h1>

                            <p>
                                Acompanhe seus projetos e sua evolução.
                            </p>
                        </div>

                    </header>

                    <section className="dashboard-stats">

                        <div className="dashboard-stat">
                            <span>🚀</span>
                            <strong>3</strong>
                            <p>Startups</p>
                        </div>

                        <div className="dashboard-stat">
                            <span>👥</span>
                            <strong>128</strong>
                            <p>Seguidores</p>
                        </div>

                        <div className="dashboard-stat">
                            <span>💡</span>
                            <strong>17</strong>
                            <p>Ideias</p>
                        </div>

                        <div className="dashboard-stat">
                            <span>🤝</span>
                            <strong>42</strong>
                            <p>Conexões</p>
                        </div>

                    </section>

                    <section className="dashboard-section">

                        <h2>
                            Progresso das startups
                        </h2>

                        <div className="dashboard-startups">

                            <StartupCard
                                name="StartTech"
                                description="Automação para pequenas empresas."
                                category="Tecnologia"
                                stage="MVP"
                                members={4}
                                likes={103}
                            />

                            <StartupCard
                                name="StudyUp"
                                description="Organização inteligente de estudos."
                                category="Educação"
                                stage="Validação"
                                members={2}
                                likes={58}
                            />

                        </div>

                    </section>

                    <section className="dashboard-section">

                        <h2>
                            Atividade recente
                        </h2>

                        <div className="activity-list">

                            <div>
                                <span>🚀</span>
                                <p>
                                    Você criou a startup
                                    <strong> StartTech</strong>.
                                </p>
                            </div>

                            <div>
                                <span>👥</span>
                                <p>
                                    Ana Silva entrou na sua equipe.
                                </p>
                            </div>

                            <div>
                                <span>❤️</span>
                                <p>
                                    Sua publicação recebeu
                                    12 novos likes.
                                </p>
                            </div>

                            <div>
                                <span>💬</span>
                                <p>
                                    Você recebeu uma nova mensagem.
                                </p>
                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    )
}

export default Dashboard