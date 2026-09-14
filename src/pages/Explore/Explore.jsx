import { useState } from "react"

import StartupCard from "../../components/StartupCard/StartupCard"
import UserCard from "../../components/UserCard/UserCard"

import "./Explore.css"

function Explore() {

    const [filter, setFilter] = useState("startups")
    const [search, setSearch] = useState("")

    const startups = [
        {
            name: "FinTech Pro",
            description: "Gestão financeira inteligente para empresas.",
            category: "Finanças",
            stage: "MVP",
            members: 5,
            likes: 120
        },
        {
            name: "CodeLab",
            description: "Plataforma de aprendizado de programação.",
            category: "Educação",
            stage: "Desenvolvimento",
            members: 3,
            likes: 89
        },
        {
            name: "GreenFuture",
            description: "Soluções tecnológicas para sustentabilidade.",
            category: "Meio Ambiente",
            stage: "Ideia",
            members: 2,
            likes: 64
        }
    ]

    const users = [
        {
            name: "Marina Costa",
            username: "@marina",
            role: "Product Designer",
            skills: ["Figma", "UX", "UI"],
            followers: 420
        },
        {
            name: "Pedro Lima",
            username: "@pedrolima",
            role: "Desenvolvedor Backend",
            skills: ["Java", "Node.js", "SQL"],
            followers: 280
        }
    ]

    return (
        <div className="explore">

            <h1>Explorar</h1>

            <p className="explore-subtitle">
                Descubra startups, pessoas e oportunidades.
            </p>

            <div className="explore-tabs">

                <button
                    className={
                        filter === "startups"
                            ? "active"
                            : ""
                    }
                    onClick={() => setFilter("startups")}
                >
                    🚀 Startups
                </button>

                <button
                    className={
                        filter === "people"
                            ? "active"
                            : ""
                    }
                    onClick={() => setFilter("people")}
                >
                    👥 Pessoas
                </button>

            </div>

            {search && (
                <div className="explore-search">
                    Resultados para:
                    <strong> "{search}"</strong>
                </div>
            )}

            {filter === "startups" && (
                <div className="explore-grid">
                    {startups.map((startup) => (
                        <StartupCard
                            key={startup.name}
                            {...startup}
                        />
                    ))}
                </div>
            )}

            {filter === "people" && (
                <div className="explore-users">
                    {users.map((user) => (
                        <UserCard
                            key={user.username}
                            {...user}
                        />
                    ))}
                </div>
            )}

        </div>
    )
}

export default Explore