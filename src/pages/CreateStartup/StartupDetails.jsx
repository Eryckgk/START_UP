
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Button from "../../components/Button/Button"

import { supabase } from "../../services/supabase"

import "./StartupDetails.css"

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
                "Explicar como seu produto resolve o problema."
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

function StartupDetails() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [startup, setStartup] = useState(null)

    const [goals, setGoals] = useState([])

    const [loading, setLoading] = useState(true)

    const [saving, setSaving] = useState(false)

    const [deleting, setDeleting] = useState(false)

    const [advancing, setAdvancing] = useState(false)

    const [editing, setEditing] = useState(false)

    const [error, setError] = useState("")

    async function loadStartup() {

        try {

            setLoading(true)
            setError("")

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

            const {
                data: goalsData,
                error: goalsError
            } = await supabase
                .from("startup_goals")
                .select("*")
                .eq("startup_id", id)
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

    function handleChange(event) {

        const {
            name,
            value
        } = event.target

        setStartup((previous) => ({
            ...previous,
            [name]: value
        }))
    }

    async function saveStartup() {

        try {

            setSaving(true)

            const {
                error: updateError
            } = await supabase
                .from("startups")
                .update({
                    name: startup.name,
                    category: startup.category,
                    problem: startup.problem,
                    audience: startup.audience,
                    solution: startup.solution,
                    business_model: startup.business_model,
                    stage: startup.stage
                })
                .eq("id", startup.id)

            if (updateError) {
                throw updateError
            }

            setEditing(false)

            alert("✅ Startup atualizada com sucesso!")

            await loadStartup()

        } catch (error) {

            console.error(
                "Erro ao atualizar startup:",
                error
            )

            alert(
                "❌ Não foi possível salvar as alterações."
            )

        } finally {

            setSaving(false)
        }
    }

    async function toggleGoal(goal) {

        try {

            const newCompletedState = !goal.completed

            const {
                error: goalError
            } = await supabase
                .from("startup_goals")
                .update({
                    completed: newCompletedState,
                    completed_at: newCompletedState
                        ? new Date().toISOString()
                        : null
                })
                .eq("id", goal.id)

            if (goalError) {
                throw goalError
            }

            setGoals((previous) =>
                previous.map((item) =>
                    item.id === goal.id
                        ? {
                              ...item,
                              completed:
                                  newCompletedState,
                              completed_at:
                                  newCompletedState
                                      ? new Date().toISOString()
                                      : null
                          }
                        : item
                )
            )

        } catch (error) {

            console.error(
                "Erro ao atualizar meta:",
                error
            )

            alert(
                "❌ Não foi possível atualizar a meta."
            )
        }
    }

    async function createGoalsForStage(
        startupId,
        stage
    ) {

        const newGoals = stageGoals[stage] || []

        if (newGoals.length === 0) {
            return
        }

        const goalsToInsert = newGoals.map((goal) => ({
            startup_id: startupId,

            title: goal.title,

            description: goal.description,

            stage,

            completed: false
        }))

        const {
            error: goalsError
        } = await supabase
            .from("startup_goals")
            .insert(goalsToInsert)

        if (goalsError) {
            throw goalsError
        }
    }

    async function advanceStage() {

        const currentStageIndex =
            stages.indexOf(startup.stage)

        const isLastStage =
            currentStageIndex === stages.length - 1

        if (isLastStage) {

            alert(
                "🎉 Sua startup já está na fase de Crescimento!"
            )

            return
        }

        const pendingGoals = goals.filter(
            (goal) => !goal.completed
        )

        if (pendingGoals.length > 0) {

            alert(
                `⚠️ Você ainda possui ${pendingGoals.length} meta(s) pendente(s). Conclua todas antes de avançar.`
            )

            return
        }

        const nextStage =
            stages[currentStageIndex + 1]

        try {

            setAdvancing(true)

            const {
                error: updateError
            } = await supabase
                .from("startups")
                .update({
                    stage: nextStage
                })
                .eq("id", startup.id)

            if (updateError) {
                throw updateError
            }

            await createGoalsForStage(
                startup.id,
                nextStage
            )

            alert(
                `🚀 Startup avançou para ${nextStage}!`
            )

            await loadStartup()

        } catch (error) {

            console.error(
                "Erro ao avançar startup:",
                error
            )

            alert(
                "❌ Não foi possível avançar a startup."
            )

        } finally {

            setAdvancing(false)
        }
    }

    async function deleteStartup() {

        const confirmed = window.confirm(
            "Tem certeza que deseja excluir esta startup? Essa ação não pode ser desfeita."
        )

        if (!confirmed) {
            return
        }

        try {

            setDeleting(true)

            const {
                error: deleteError
            } = await supabase
                .from("startups")
                .delete()
                .eq("id", startup.id)

            if (deleteError) {
                throw deleteError
            }

            alert(
                "🗑️ Startup excluída com sucesso."
            )

            navigate("/startups")

        } catch (error) {

            console.error(
                "Erro ao excluir startup:",
                error
            )

            alert(
                "❌ Não foi possível excluir a startup."
            )

        } finally {

            setDeleting(false)
        }
    }

    if (loading) {

        return (
            <div className="startup-details loading">

                <div className="loading-spinner">
                    🚀
                </div>

                <p>
                    Carregando startup...
                </p>

            </div>
        )
    }

    if (error || !startup) {

        return (
            <div className="startup-details error">

                <h2>
                    😕 Startup não encontrada
                </h2>

                <p>
                    {error ||
                        "Essa startup não existe ou não está disponível."}
                </p>

                <Button
                    onClick={() =>
                        navigate("/startups")
                    }
                >
                    ← Voltar para startups
                </Button>

            </div>
        )
    }

    const completedGoals =
        goals.filter(
            (goal) => goal.completed
        ).length

    const totalGoals = goals.length

    const progress =
        totalGoals === 0
            ? 0
            : Math.round(
                  (completedGoals / totalGoals) * 100
              )

    const currentStageIndex =
        stages.indexOf(startup.stage)

    const isLastStage =
        currentStageIndex === stages.length - 1

    const allGoalsCompleted =
        totalGoals > 0 &&
        completedGoals === totalGoals

    const nextStage =
        !isLastStage
            ? stages[currentStageIndex + 1]
            : null

    return (

        <div className="startup-details">

            {/* HEADER */}

            <header className="startup-details-header">

                <div>

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/startups")
                        }
                    >
                        ← Voltar
                    </button>

                    <h1>
                        {startup.name}
                    </h1>

                    <p>
                        {startup.category}
                    </p>

                </div>

                <div className="header-actions">

                    {!editing && (

                        <Button
                            variant="secondary"
                            onClick={() =>
                                setEditing(true)
                            }
                        >
                            ✏️ Editar
                        </Button>

                    )}

                    {editing && (

                        <>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setEditing(false)
                                    loadStartup()
                                }}
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="button"
                                onClick={saveStartup}
                                disabled={saving}
                            >
                                {saving
                                    ? "Salvando..."
                                    : "💾 Salvar"}
                            </Button>

                        </>

                    )}

                </div>

            </header>

            {/* PROGRESSO DA FASE */}

            <section className="startup-stage">

                <div className="stage-header">

                    <div>

                        <span className="stage-label">
                            FASE ATUAL
                        </span>

                        <h2>
                            {startup.stage}
                        </h2>

                    </div>

                    <strong>
                        {progress}%
                    </strong>

                </div>

                <div className="progress-bar">

                    <div
                        className="progress-bar-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <p>
                    {completedGoals} de{" "}
                    {totalGoals} metas concluídas
                </p>

            </section>

            {/* ETAPAS */}

            <section className="startup-roadmap">

                <h2>
                    🗺️ Jornada da startup
                </h2>

                <div className="roadmap">

                    {stages.map(
                        (stage, index) => {

                            const active =
                                index ===
                                currentStageIndex

                            const completed =
                                index <
                                currentStageIndex

                            return (

                                <div
                                    key={stage}
                                    className={
                                        `roadmap-stage ${
                                            active
                                                ? "active"
                                                : ""
                                        } ${
                                            completed
                                                ? "completed"
                                                : ""
                                        }`
                                    }
                                >

                                    <div className="roadmap-number">

                                        {completed
                                            ? "✓"
                                            : index + 1}

                                    </div>

                                    <span>
                                        {stage}
                                    </span>

                                </div>

                            )
                        }
                    )}

                </div>

            </section>

            {/* INFORMAÇÕES */}

            <section className="startup-information">

                <div className="section-title">

                    <h2>
                        📋 Informações
                    </h2>

                </div>

                {editing ? (

                    <div className="startup-edit-form">

                        <label>

                            Nome

                            <input
                                name="name"
                                value={startup.name}
                                onChange={handleChange}
                            />

                        </label>

                        <label>

                            Categoria

                            <select
                                name="category"
                                value={startup.category}
                                onChange={handleChange}
                            >

                                <option>
                                    Tecnologia
                                </option>

                                <option>
                                    Educação
                                </option>

                                <option>
                                    Finanças
                                </option>

                                <option>
                                    Saúde
                                </option>

                                <option>
                                    Sustentabilidade
                                </option>

                                <option>
                                    Inteligência Artificial
                                </option>

                            </select>

                        </label>

                        <label>

                            Problema

                            <textarea
                                name="problem"
                                value={startup.problem}
                                onChange={handleChange}
                            />

                        </label>

                        <label>

                            Público-alvo

                            <textarea
                                name="audience"
                                value={startup.audience}
                                onChange={handleChange}
                            />

                        </label>

                        <label>

                            Solução

                            <textarea
                                name="solution"
                                value={startup.solution}
                                onChange={handleChange}
                            />

                        </label>

                        <label>

                            Modelo de negócio

                            <textarea
                                name="business_model"
                                value={
                                    startup.business_model
                                }
                                onChange={handleChange}
                            />

                        </label>

                    </div>

                ) : (

                    <div className="startup-info-grid">

                        <article>

                            <span>
                                Problema
                            </span>

                            <p>
                                {startup.problem}
                            </p>

                        </article>

                        <article>

                            <span>
                                Público-alvo
                            </span>

                            <p>
                                {startup.audience}
                            </p>

                        </article>

                        <article>

                            <span>
                                Solução
                            </span>

                            <p>
                                {startup.solution}
                            </p>

                        </article>

                        <article>

                            <span>
                                Modelo de negócio
                            </span>

                            <p>
                                {startup.business_model}
                            </p>

                        </article>

                    </div>

                )}

            </section>

            {/* METAS */}

            <section className="startup-goals">

                <div className="section-title">

                    <div>

                        <span className="section-label">
                            DESENVOLVIMENTO
                        </span>

                        <h2>
                            🎯 Metas da fase
                        </h2>

                    </div>

                    <strong>
                        {completedGoals}/{totalGoals}
                    </strong>

                </div>

                <div className="goals-list">

                    {goals.length === 0 ? (

                        <div className="empty-goals">

                            <p>
                                Nenhuma meta cadastrada
                                para esta fase.
                            </p>

                        </div>

                    ) : (

                        goals.map((goal) => (

                            <article
                                key={goal.id}
                                className={
                                    `goal ${
                                        goal.completed
                                            ? "completed"
                                            : ""
                                    }`
                                }
                            >

                                <button
                                    className="goal-check"
                                    onClick={() =>
                                        toggleGoal(goal)
                                    }
                                    aria-label={
                                        goal.completed
                                            ? "Desmarcar meta"
                                            : "Concluir meta"
                                    }
                                >

                                    {goal.completed
                                        ? "✓"
                                        : ""}

                                </button>

                                <div className="goal-content">

                                    <h3>
                                        {goal.title}
                                    </h3>

                                    <p>
                                        {goal.description}
                                    </p>

                                </div>

                            </article>

                        ))

                    )}

                </div>

            </section>

            {/* AVANÇAR */}

            <section className="next-stage">

                {isLastStage ? (

                    <div className="completed-startup">

                        <span>
                            🏆
                        </span>

                        <div>

                            <h2>
                                Parabéns!
                            </h2>

                            <p>
                                Sua startup chegou à
                                fase de Crescimento.
                                Agora é hora de escalar
                                o negócio!
                            </p>

                        </div>

                    </div>

                ) : (

                    <>

                        <div>

                            <span className="section-label">
                                PRÓXIMA FASE
                            </span>

                            <h2>
                                {nextStage}
                            </h2>

                            {!allGoalsCompleted && (

                                <p>
                                    Complete todas as
                                    metas atuais para
                                    desbloquear esta fase.
                                </p>

                            )}

                            {allGoalsCompleted && (

                                <p>
                                    🎉 Todas as metas
                                    foram concluídas!
                                    Você pode avançar.
                                </p>

                            )}

                        </div>

                        <Button
                            onClick={advanceStage}
                            disabled={
                                !allGoalsCompleted ||
                                advancing
                            }
                        >
                            {advancing
                                ? "Avançando..."
                                : `Avançar para ${nextStage} →`}
                        </Button>

                    </>

                )}

            </section>

            {/* EXCLUIR */}

            <section className="danger-zone">

                <div>

                    <h2>
                        Zona de perigo
                    </h2>

                    <p>
                        Excluir esta startup removerá
                        também todas as suas metas.
                    </p>

                </div>

                <Button
                    variant="secondary"
                    onClick={deleteStartup}
                    disabled={deleting}
                >
                    {deleting
                        ? "Excluindo..."
                        : "🗑️ Excluir startup"}
                </Button>

            </section>

        </div>
    )
}

export default StartupDetails
