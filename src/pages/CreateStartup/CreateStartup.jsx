import { useState } from "react"

import Button from "../../components/Button/Button"

import "./CreateStartup.css"

function CreateStartup() {

    const [step, setStep] = useState(1)

    const [startup, setStartup] = useState({
        name: "",
        category: "",
        problem: "",
        audience: "",
        solution: "",
        businessModel: "",
        stage: "Ideia"
    })

    function handleChange(event) {
        const { name, value } = event.target

        setStartup({
            ...startup,
            [name]: value
        })
    }

    function nextStep() {
        if (step < 4) {
            setStep(step + 1)
        }
    }

    function previousStep() {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()

        console.log("Startup criada:", startup)

        alert("Startup criada com sucesso!")
    }

    return (
        <div className="create-startup">

            <div className="create-header">
                <h1>🚀 Criar Startup</h1>

                <p>
                    Transforme sua ideia em um projeto real.
                </p>
            </div>

            <div className="create-progress">
                {[1, 2, 3, 4].map((number) => (
                    <div
                        key={number}
                        className={
                            step >= number
                                ? "progress-step active"
                                : "progress-step"
                        }
                    >
                        {number}
                    </div>
                ))}
            </div>

            <form
                className="startup-form"
                onSubmit={handleSubmit}
            >

                {step === 1 && (
                    <div>
                        <h2>Comece pela ideia</h2>

                        <label>
                            Nome da startup

                            <input
                                name="name"
                                value={startup.name}
                                onChange={handleChange}
                                placeholder="Ex: StartTech"
                                required
                            />
                        </label>

                        <label>
                            Categoria

                            <select
                                name="category"
                                value={startup.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Selecione
                                </option>

                                <option>Tecnologia</option>
                                <option>Educação</option>
                                <option>Finanças</option>
                                <option>Saúde</option>
                                <option>Sustentabilidade</option>
                                <option>Inteligência Artificial</option>
                            </select>
                        </label>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2>Qual problema você resolve?</h2>

                        <label>
                            Problema

                            <textarea
                                name="problem"
                                value={startup.problem}
                                onChange={handleChange}
                                placeholder="Descreva o problema..."
                                required
                            />
                        </label>

                        <label>
                            Público-alvo

                            <textarea
                                name="audience"
                                value={startup.audience}
                                onChange={handleChange}
                                placeholder="Quem possui esse problema?"
                                required
                            />
                        </label>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2>Como sua startup resolve?</h2>

                        <label>
                            Solução

                            <textarea
                                name="solution"
                                value={startup.solution}
                                onChange={handleChange}
                                placeholder="Descreva sua solução..."
                                required
                            />
                        </label>

                        <label>
                            Modelo de negócio

                            <textarea
                                name="businessModel"
                                value={startup.businessModel}
                                onChange={handleChange}
                                placeholder="Como sua startup ganhará dinheiro?"
                                required
                            />
                        </label>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h2>Última etapa</h2>

                        <label>
                            Estágio atual

                            <select
                                name="stage"
                                value={startup.stage}
                                onChange={handleChange}
                            >
                                <option>Ideia</option>
                                <option>Validação</option>
                                <option>MVP</option>
                                <option>Lançamento</option>
                                <option>Crescimento</option>
                            </select>
                        </label>

                        <div className="startup-summary">
                            <h3>Resumo</h3>

                            <p>
                                <strong>Nome:</strong>{" "}
                                {startup.name}
                            </p>

                            <p>
                                <strong>Categoria:</strong>{" "}
                                {startup.category}
                            </p>

                            <p>
                                <strong>Problema:</strong>{" "}
                                {startup.problem}
                            </p>

                            <p>
                                <strong>Solução:</strong>{" "}
                                {startup.solution}
                            </p>
                        </div>
                    </div>
                )}

                <div className="form-actions">

                    {step > 1 && (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={previousStep}
                        >
                            ← Voltar
                        </Button>
                    )}

                    {step < 4 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                        >
                            Próximo →
                        </Button>
                    ) : (
                        <Button type="submit">
                            🚀 Criar Startup
                        </Button>
                    )}

                </div>

            </form>

        </div>
    )
}

export default CreateStartup