import { useState } from "react"
import Button from "../../components/Button/Button"
import "./Communities.css"

function Communities() {

    const [joined, setJoined] = useState([])

    const communities = [
        {
            name: "Desenvolvedores",
            description:
                "Programação, tecnologia e desenvolvimento de produtos.",
            members: 1240
        },
        {
            name: "Inteligência Artificial",
            description:
                "IA, machine learning e automação.",
            members: 980
        },
        {
            name: "Empreendedorismo",
            description:
                "Ideias, negócios e criação de startups.",
            members: 2310
        },
        {
            name: "Design de Produtos",
            description:
                "UX, UI, prototipação e experiência do usuário.",
            members: 760
        }
    ]

    function toggleCommunity(name) {

        if (joined.includes(name)) {
            setJoined(
                joined.filter(
                    community => community !== name
                )
            )
        } else {
            setJoined([
                ...joined,
                name
            ])
        }
    }

    return (
        <div className="communities">


            <div className="communities-layout">


                <main className="communities-content">

                    <h1>Comunidades</h1>

                    <p>
                        Encontre pessoas que compartilham
                        os mesmos interesses.
                    </p>

                    <div className="communities-grid">

                        {communities.map((community) => {

                            const isJoined =
                                joined.includes(community.name)

                            return (
                                <article
                                    className="community-card"
                                    key={community.name}
                                >

                                    <div className="community-icon">
                                        👥
                                    </div>

                                    <h2>
                                        {community.name}
                                    </h2>

                                    <p>
                                        {community.description}
                                    </p>

                                    <span>
                                        👤 {community.members} membros
                                    </span>

                                    <Button
                                        variant={
                                            isJoined
                                                ? "secondary"
                                                : "primary"
                                        }
                                        onClick={() =>
                                            toggleCommunity(
                                                community.name
                                            )
                                        }
                                    >
                                        {isJoined
                                            ? "Participando"
                                            : "Participar"
                                        }
                                    </Button>

                                </article>
                            )
                        })}

                    </div>

                </main>

            </div>

        </div>
    )
}

export default Communities