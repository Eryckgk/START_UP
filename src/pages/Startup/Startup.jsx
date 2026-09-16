
import {
    useEffect,
    useState
} from "react"

import {
    useNavigate,
    useParams
} from "react-router-dom"

import Button from "../../components/Button/Button"

import useAuth from "../../hooks/useAuth"

import { supabase } from "../../services/supabase"

import "./Startup.css"


const stages = [

    "Ideia",
    "Validação",
    "MVP",
    "Lançamento",
    "Crescimento"

]


const stageGoals = {

    Ideia: [
        {
            title: "Definir o problema",
            description:
                "Descrever claramente qual problema sua startup resolve."
        },
        {
            title: "Definir o público-alvo",
            description:
                "Identificar quem possui esse problema."
        },
        {
            title: "Definir a solução",
            description:
                "Explicar como sua startup resolve o problema."
        }
    ],

    Validação: [
        {
            title: "Conversar com usuários",
            description:
                "Entrevistar pessoas que fazem parte do público-alvo."
        },
        {
            title: "Validar o problema",
            description:
                "Descobrir se o problema realmente existe e é relevante."
        },
        {
            title: "Validar a solução",
            description:
                "Verificar se os usuários demonstram interesse na solução."
        }
    ],

    MVP: [
        {
            title: "Criar o protótipo",
            description:
                "Criar a primeira versão funcional do produto."
        },
        {
            title: "Implementar a funcionalidade principal",
            description:
                "Desenvolver aquilo que realmente resolve o problema."
        },
        {
            title: "Testar com usuários",
            description:
                "Colocar o MVP nas mãos de usuários reais."
        }
    ],

    Lançamento: [
        {
            title: "Publicar o produto",
            description:
                "Disponibilizar o produto para usuários."
        },
        {
            title: "Conseguir os primeiros usuários",
            description:
                "Atrair os primeiros usuários reais."
        },
        {
            title: "Coletar feedback",
            description:
                "Registrar problemas, sugestões e necessidades."
        }
    ],

    Crescimento: [
        {
            title: "Aumentar usuários ativos",
            description:
                "Criar estratégias para aumentar a utilização do produto."
        },
        {
            title: "Melhorar retenção",
            description:
                "Fazer com que os usuários continuem utilizando o produto."
        },
        {
            title: "Aumentar receita",
            description:
                "Criar estratégias para tornar o negócio sustentável."
        }
    ]

}


function Startup() {

    const {
        id
    } = useParams()

    const navigate = useNavigate()

    const {
        user,
        loading: authLoading
    } = useAuth()


    const [startups, setStartups] =
        useState([])

    const [startup, setStartup] =
        useState(null)

    const [goals, setGoals] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState("")


    // ==========================================
    // LISTAR STARTUPS
    // ==========================================

    async function loadStartups() {

        if (!user) {
            return
        }

        try {

            setLoading(true)

            setError("")


            const {
                data,
                error
            } = await supabase

                .from("startups")

                .select("*")

                .eq("user_id", user.id)

                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                )


            if (error) {
                throw error
            }


            setStartups(data || [])

        } catch (error) {

            console.error(
                "Erro ao carregar startups:",
                error
            )

            setError(
                "Não foi possível carregar suas startups."
            )

        } finally {

            setLoading(false)

        }

    }


    // ==========================================
    // CARREGAR STARTUP
    // ==========================================

    async function loadStartup() {

        if (!id) {
            return
        }

        try {

            setLoading(true)

            setError("")


            // --------------------------
            // STARTUP
            // --------------------------

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


            // --------------------------
            // METAS
            // --------------------------

            const {
                data: goalsData,
                error: goalsError
            } = await supabase

                .from("startup_goals")

                .select("*")

                .eq(
                    "startup_id",
                    id
                )

                .eq(
                    "stage",
                    startupData.stage
                )

                .order(
                    "created_at",
                    {
                        ascending: true
                    }
                )


            if (goalsError) {
                throw goalsError
            }


            setStartup(
                startupData
            )

            setGoals(
                goalsData || []
            )

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


    // ==========================================
    // EFFECT
    // ==========================================

    useEffect(() => {

        if (authLoading) {
            return
        }

        if (!user) {

            setLoading(false)

            setError(
                "Usuário não autenticado."
            )

            return

        }


        if (id) {

            loadStartup()

        } else {

            loadStartups()

        }

    }, [
        id,
        user,
        authLoading
    ])


    // ==========================================
    // LOADING
    // ==========================================

    if (
        loading ||
        authLoading
    ) {

        return (

            <div className="startup-page">

                <div className="startup-box">

                    <h2>
                        🚀 Carregando startups...
                    </h2>

                </div>

            </div>

        )

    }


    // ==========================================
    // LISTA
    // ==========================================

    if (!id) {

        return (

            <div className="startup-page">

                <section className="startup-box">

                    <div className="startup-goals-header">

                        <div>

                            <h1>
                                🚀 Minhas Startups
                            </h1>

                            <span className="startup-count">
                                {startups.length}{" "}
                                {startups.length === 1
                                    ? "startup"
                                    : "startups"}
                            </span>

                        </div>

                    </div>


                    {error && (

                        <div className="login-message login-error">

                            {error}

                        </div>

                    )}


                    {startups.length === 0 ? (

                        <div className="startup-box">

                            <h2>
                                Você ainda não criou nenhuma startup.
                            </h2>

                            <p>
                                Crie sua primeira startup
                                e comece a transformar sua ideia
                                em realidade! 🚀
                            </p>


                            <Button
                                onClick={() =>
                                    navigate(
                                        "/create-startup"
                                    )
                                }
                            >
                                🚀 Criar minha primeira startup
                            </Button>

                        </div>

                    ) : (

                        <div className="startup-grid">

                            {startups.map(
                                startupItem => (

                                    <div
                                        key={
                                            startupItem.id
                                        }

                                        className="startup-box"

                                        style={{
                                            cursor: "pointer"
                                        }}

                                        onClick={() =>
                                            navigate(
                                                `/startups/${startupItem.id}`
                                            )
                                        }
                                    >

                                        <span>
                                            {
                                                startupItem.category
                                            }
                                        </span>


                                        <h2>
                                            {
                                                startupItem.name
                                            }
                                        </h2>


                                        <p>
                                            {
                                                startupItem.solution
                                            }
                                        </p>


                                        <strong>
                                            Estágio:{" "}
                                            {
                                                startupItem.stage
                                            }
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        )

    }


    // ==========================================
    // ERRO DOS DETALHES
    // ==========================================

    if (
        error ||
        !startup
    ) {

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
                            navigate(
                                "/startups"
                            )
                        }
                    >
                        ← Voltar
                    </Button>

                </div>

            </div>

        )

    }


    // ==========================================
    // PROGRESSO
    // ==========================================

    const currentStageIndex =
        stages.indexOf(
            startup.stage
        )


    const completedGoals =
        goals.filter(
            goal =>
                goal.completed
        ).length


    const totalGoals =
        goals.length


    const progress =
        totalGoals === 0
            ? 0
            : Math.round(
                (
                    completedGoals /
                    totalGoals
                ) * 100
            )


    // ==========================================
    // DETALHES
    // ==========================================

    return (

        <div className="startup-page">


            <section className="startup-hero">

                <div className="startup-big-icon">
                    🚀
                </div>


                <div className="startup-title">

                    <span>
                        {
                            startup.category
                        }
                    </span>


                    <h1>
                        {
                            startup.name
                        }
                    </h1>


                    <p>
                        {
                            startup.solution
                        }
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


                    <section className="startup-box">

                        <h2>
                            Sobre a startup
                        </h2>

                        <p>
                            {
                                startup.solution
                            }
                        </p>

                    </section>


                    <section className="startup-box">

                        <h2>
                            Problema
                        </h2>

                        <p>
                            {
                                startup.problem
                            }
                        </p>

                    </section>


                    <section className="startup-box">

                        <h2>
                            Público-alvo
                        </h2>

                        <p>
                            {
                                startup.audience
                            }
                        </p>

                    </section>


                    <section className="startup-box">

                        <h2>
                            Modelo de negócio
                        </h2>

                        <p>
                            {
                                startup.business_model
                            }
                        </p>

                    </section>


                    <section className="startup-box">

                        <h2>
                            Roadmap
                        </h2>


                        <div className="roadmap">

                            {stages.map(
                                (
                                    stage,
                                    index
                                ) => {

                                    const completed =
                                        index <
                                        currentStageIndex


                                    const active =
                                        index ===
                                        currentStageIndex


                                    return (

                                        <div

                                            key={stage}

                                            className={`
                                                roadmap-item
                                                ${
                                                    completed
                                                        ? "done"
                                                        : ""
                                                }
                                                ${
                                                    active
                                                        ? "active"
                                                        : ""
                                                }
                                            `}

                                        >

                                            <strong>
                                                {stage}
                                            </strong>

                                            <span>

                                                {completed

                                                    ? "Concluído"

                                                    : active

                                                    ? "Em andamento"

                                                    : "Pendente"

                                                }

                                            </span>

                                        </div>

                                    )

                                }
                            )}

                        </div>

                    </section>


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
                                    width:
                                        `${progress}%`
                                }}
                            />

                        </div>


                        <div className="startup-goals">

                            {goals.length === 0 ? (

                                <p>
                                    Nenhuma meta cadastrada.
                                </p>

                            ) : (

                                goals.map(
                                    goal => (

                                        <div

                                            key={
                                                goal.id
                                            }

                                            className={
                                                goal.completed
                                                    ? "goal completed"
                                                    : "goal"
                                            }

                                        >

                                            <span>

                                                {
                                                    goal.completed
                                                        ? "✓"
                                                        : "○"
                                                }

                                            </span>


                                            <div>

                                                <strong>
                                                    {
                                                        goal.title
                                                    }
                                                </strong>

                                                <p>
                                                    {
                                                        goal.description
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    )
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

