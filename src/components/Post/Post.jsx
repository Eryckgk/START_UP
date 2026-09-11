import { useState } from "react"
import "./Post.css"

function Post({
    author = "Usuário",
    username = "@usuario",
    time = "Agora",
    content = "",
    likes = 0,
    comments = 0,
    startup = null
}) {

    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likes)

    function handleLike() {
        setLiked(!liked)

        setLikeCount(
            liked
                ? likeCount - 1
                : likeCount + 1
        )
    }

    return (
        <article className="post">

            <div className="post-header">

                <div className="post-avatar">
                    {author.charAt(0).toUpperCase()}
                </div>

                <div className="post-author">

                    <strong>{author}</strong>

                    <span>
                        {username} · {time}
                    </span>

                </div>

                <button className="post-more">
                    ⋯
                </button>

            </div>

            {startup && (
                <div className="post-startup">

                    <span className="post-startup-icon">
                        🚀
                    </span>

                    <div>
                        <strong>{startup.name}</strong>

                        <span>
                            {startup.category}
                        </span>
                    </div>

                </div>
            )}

            <div className="post-content">
                {content}
            </div>

            <div className="post-actions">

                <button
                    className={liked ? "liked" : ""}
                    onClick={handleLike}
                >
                    {liked ? "❤️" : "♡"} {likeCount}
                </button>

                <button>
                    💬 {comments}
                </button>

                <button>
                    ↗ Compartilhar
                </button>

            </div>

        </article>
    )
}

export default Post