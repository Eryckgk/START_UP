import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Button from "../../components/Button/Button"

import { supabase } from "../../services/supabase"

import "./Startup.css"

const stages = [
    "Ideia",
    "Validação",
    "MVP",
    "Lançamento",
    "Crescimento"
]

function Startup() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [startup, setStartup] = useState(null)

    const [goals, setGoals] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    async function loadStartup() {

        try {

            setLoading(true)

            setError("")

            // BUSCAR STARTUP
            const {
                data: startupData,
                error: startupError
            } = await supabase
                .from("startups")
                .select("*")
                .eq("id", id)
                .single()

            if (startupError) {
                throw startupError
            }

            // BUSCAR METAS
            const {
                data: goalsData,
                error: goalsError
            } = await supabase
                .from("startup_goals")
                .select("*")
                .eq("startup_id", id)
                .eq("stage", startupData.stage)
                .order("created_at", {
                    ascending: true
                })

            if (goalsError) {
                throw goalsError
            }

            setStartup(startupData)

            setGoals(goalsData || [])

        } catch (error) {

            console.error(
                "Erro ao carregar startup:",
                error
            )

            setError(
                "Não foi possível carregar essa startup."
            )

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        loadStartup()

    }, [id])

    if (loading) {

        return (
            <div className="startup-page">

                <div className="startup-box">

                    <h2>
                        🚀 Carregando startup...
                    </h2>

                </div>

            </div>
        )
    }

    if (error || !startup) {

        return (
            <div className="startup-page">

                <div className="startup-box">

                    <h2>
                        😕 Startup não encontrada
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Button
                        onClick={() =>
                            navigate("/startups")
                        }
                    >
                        ← Voltar
                    </Button>

                </div>

            </div>
        )
    }

    const currentStageIndex =
        stages.indexOf(startup.stage)

    const completedGoals =
        goals.filter(
            (goal) => goal.completed
        ).length

    const totalGoals =
        goals.length

    const progress =
        totalGoals === 0
            ? 0
            : Math.round(
                  (completedGoals /
                      totalGoals) *
                      100
              )

    return (

        <div className="startup-page">

            {/* HERO */}

            <section className="startup-hero">

                <div className="startup-big-icon">
                    🚀
                </div>

                <div className="startup-title">

                    <span>
                        {startup.category}
                    </span>

                    <h1>
                        {startup.name}
                    </h1>

                    <p>
                        {startup.solution}
                    </p>

                </div>

                <Button
                    onClick={() =>
                        navigate(
                            `/startups/${startup.id}/details`
                        )
                    }
                >
                    ⚙️ Gerenciar
                </Button>

            </section>

            <div className="startup-grid">

                <div>

                    {/* SOBRE */}

                    <section className="startup-box">

                        <h2>
                            Sobre a startup
                        </h2>

                        <p>
                            {startup.solution}
                        </p>

                    </section>

                    {/* PROBLEMA */}

                    <section className="startup-box">

                        <h2>
                            Problema
                        </h2>

                        <p>
                            {startup.problem}
                        </p>

                    </section>

                    {/* PÚBLICO */}

                    <section className="startup-box">

                        <h2>
                            Público-alvo
                        </h2>

                        <p>
                            {startup.audience}
                        </p>

                    </section>

                    {/* MODELO DE NEGÓCIO */}

                    <section className="startup-box">

                        <h2>
                            Modelo de negócio
                        </h2>

                        <p>
                            {startup.business_model}
                        </p>

                    </section>

                    {/* ROADMAP */}

                    <section className="startup-box">

                        <h2>
                            Roadmap
                        </h2>

                        <div className="roadmap">

                            {stages.map(
                                (stage, index) => {

                                    const completed =
                                        index <
                                        currentStageIndex

                                    const active =
                                        index ===
                                        currentStageIndex

                                    return (

                                        <div
                                            key={stage}
                                            className={
                                                `roadmap-item ${
                                                    completed
                                                        ? "done"
                                                        : ""
                                                } ${
                                                    active
                                                        ? "active"
                                                        : ""
                                                }`
                                            }
                                        >

                                            <strong>
                                                {stage}
                                            </strong>

                                            <span>

                                                {completed
                                                    ? "Concluído"
                                                    : active
                                                    ? "Em andamento"
                                                    : "Pendente"}

                                            </span>

                                        </div>

                                    )
                                }
                            )}

                        </div>

                    </section>

                    {/* METAS */}

                    <section className="startup-box">

                        <div className="startup-goals-header">

                            <div>

                                <h2>
                                    🎯 Metas
                                </h2>

                                <span>
                                    {completedGoals} de{" "}
                                    {totalGoals}
                                </span>

                            </div>

                            <strong>
                                {progress}%
                            </strong>

                        </div>

                        <div className="startup-progress">

                            <div
                                style={{
                                    width: `${progress}%`
                                }}
                            />

                        </div>

                        <div className="startup-goals">

                            {goals.map(
                                (goal) => (

                                    <div
                                        key={goal.id}
                                        className={
                                            goal.completed
                                                ? "goal completed"
                                                : "goal"
                                        }
                                    >

                                        <span>

                                            {goal.completed
                                                ? "✓"
                                                : "○"}

                                        </span>

                                        <div>

                                            <strong>
                                                {goal.title}
                                            </strong>

                                            <p>
                                                {
                                                    goal.description
                                                }
                                            </p>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </section>

                </div>

            </div>

        </div>
    )
}

export default Startup