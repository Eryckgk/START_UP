import { useState } from "react"

import Post from "../../components/Post/Post"
import StartupCard from "../../components/StartupCard/StartupCard"
import UserCard from "../../components/UserCard/UserCard"

import "./Home.css"

function Home() {

    const [search, setSearch] = useState("")

    const posts = [
        {
            author: "Ana Silva",
            username: "@anasilva",
            time: "2h",
            content:
                "Estou criando uma plataforma para ajudar pequenos negócios a utilizarem inteligência artificial no dia a dia.",
            likes: 42,
            comments: 8
        },
        {
            author: "Carlos Oliveira",
            username: "@carlos",
            time: "4h",
            content:
                "Acabei de lançar o primeiro MVP da minha startup! Agora começa a fase de validação.",
            likes: 76,
            comments: 15
        }
    ]

    const startups = [
        {
            name: "IA Fácil",
            description:
                "Ferramentas de inteligência artificial para pequenos negócios.",
            category: "Inteligência Artificial",
            stage: "MVP",
            members: 4,
            likes: 92
        },
        {
            name: "EcoTech",
            description:
                "Tecnologia para diminuir desperdícios em empresas.",
            category: "Sustentabilidade",
            stage: "Ideia",
            members: 2,
            likes: 47
        }
    ]

    return (
        <div className="home">
            <section className="home-welcome">
                <div>
                    <h1>Olá, João! 👋</h1>
                    <p>
                        O que você vai construir hoje?
                    </p>
                </div>

                {search && (
                    <span>
                        Pesquisando por: "{search}"
                    </span>
                )}
            </section>

            <section className="home-feed">

                <div className="home-main">

                    <div className="section-title">
                        <h2>Seu feed</h2>
                    </div>

                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            {...post}
                        />
                    ))}

                </div>

                <aside className="home-right">

                    <div className="home-widget">

                        <h3>
                            🚀 Startups em destaque
                        </h3>

                        {startups.map((startup) => (
                            <StartupCard
                                key={startup.name}
                                {...startup}
                            />
                        ))}

                    </div>

                    <div className="home-widget">

                        <h3>
                            👥 Pessoas para conhecer
                        </h3>

                        <UserCard
                            name="Lucas Santos"
                            username="@lucasdev"
                            role="Desenvolvedor Full Stack"
                            skills={[
                                "React",
                                "Node.js"
                            ]}
                            followers={320}
                        />

                    </div>

                </aside>

            </section>
        </div>
    )
}

export default Home