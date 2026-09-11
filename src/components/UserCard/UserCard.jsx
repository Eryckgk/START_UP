import { useState } from "react"
import "./UserCard.css"

function UserCard({
    name = "Usuário",
    username = "@usuario",
    role = "Desenvolvedor",
    skills = [],
    followers = 0
}) {

    const [following, setFollowing] = useState(false)

    return (
        <article className="user-card">

            <div className="user-card-header">

                <div className="user-card-avatar">
                    {name.charAt(0).toUpperCase()}
                </div>

                <div className="user-card-info">

                    <h3>{name}</h3>

                    <span>{username}</span>

                </div>

            </div>

            <div className="user-card-role">
                {role}
            </div>

            {skills.length > 0 && (
                <div className="user-card-skills">

                    {skills.map((skill) => (
                        <span key={skill}>
                            {skill}
                        </span>
                    ))}

                </div>
            )}

            <div className="user-card-footer">

                <span>
                    👥 {followers} seguidores
                </span>

                <button
                    className={following ? "following" : ""}
                    onClick={() => setFollowing(!following)}
                >
                    {following ? "Seguindo" : "Seguir"}
                </button>

            </div>

        </article>
    )
}

export default UserCard