import "./StartupCard.css"

function StartupCard({
    name = "Minha Startup",
    description = "Descrição da startup",
    category = "Tecnologia",
    stage = "Ideia",
    members = 1,
    likes = 0,
    onClick
}) {

    return (
        <article className="startup-card">

            <div className="startup-card-header">

                <div className="startup-logo">
                    🚀
                </div>

                <div className="startup-info">

                    <h3>{name}</h3>

                    <span className="startup-category">
                        {category}
                    </span>

                </div>

            </div>

            <p className="startup-description">
                {description}
            </p>

            <div className="startup-stage">
                <span>Etapa</span>

                <strong>
                    {stage}
                </strong>
            </div>

            <div className="startup-stats">

                <span>
                    👥 {members} membros
                </span>

                <span>
                    ❤️ {likes}
                </span>

            </div>

            <button
                className="startup-card-button"
                onClick={onClick}
            >
                Ver startup →
            </button>

        </article>
    )
}

export default StartupCard