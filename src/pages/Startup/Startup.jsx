import UserCard from "../../components/UserCard/UserCard"
import Button from "../../components/Button/Button"

import "./Startup.css"

function Startup() {

    return (

        <div className="startup-page">

            <section className="startup-hero">

                <div className="startup-big-icon">
                    🚀
                </div>

                <div className="startup-title">

                    <span>
                        TECNOLOGIA
                    </span>

                    <h1>
                        StartTech
                    </h1>

                    <p>
                        Soluções tecnológicas simples para
                        problemas complexos de empresas.
                    </p>

                </div>

                <Button>
                    + Participar
                </Button>

            </section>

            <div className="startup-grid">

                <div>

                    <section className="startup-box">

                        <h2>
                            Sobre a startup
                        </h2>

                        <p>
                            A StartTech nasceu com o objetivo
                            de ajudar pequenas empresas a
                            automatizar processos utilizando
                            tecnologia acessível.
                        </p>

                    </section>

                    <section className="startup-box">

                        <h2>
                            Problema
                        </h2>

                        <p>
                            Pequenos negócios possuem
                            processos manuais que consomem
                            tempo e dinheiro.
                        </p>

                    </section>

                    <section className="startup-box">

                        <h2>
                            Solução
                        </h2>

                        <p>
                            Uma plataforma simples para
                            automatizar tarefas repetitivas
                            e acompanhar os resultados.
                        </p>

                    </section>

                    <section className="startup-box">

                        <h2>
                            Roadmap
                        </h2>

                        <div className="roadmap">

                            <div className="roadmap-item done">

                                <strong>
                                    Ideia
                                </strong>

                                <span>
                                    Concluído
                                </span>

                            </div>

                            <div className="roadmap-item done">

                                <strong>
                                    Validação
                                </strong>

                                <span>
                                    Concluído
                                </span>

                            </div>

                            <div className="roadmap-item active">

                                <strong>
                                    MVP
                                </strong>

                                <span>
                                    Em andamento
                                </span>

                            </div>

                            <div className="roadmap-item">

                                <strong>
                                    Lançamento
                                </strong>

                                <span>
                                    Pendente
                                </span>

                            </div>

                        </div>

                    </section>

                </div>

                <aside>

                    <div className="startup-box">

                        <h2>
                            Equipe
                        </h2>

                        <UserCard
                            name="João Carlos"
                            username="@joaocarlos"
                            role="Founder"
                            skills={[
                                "React",
                                "Node.js"
                            ]}
                            followers={128}
                        />

                        <br />

                        <UserCard
                            name="Ana Silva"
                            username="@anasilva"
                            role="Product Designer"
                            skills={[
                                "UI",
                                "UX"
                            ]}
                            followers={310}
                        />

                    </div>

                </aside>

            </div>

        </div>

    )

}

export default Startup