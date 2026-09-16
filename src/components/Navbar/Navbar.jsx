
import "./Navbar.css"

import useAuth from "../../hooks/useAuth"

function Navbar({ onSearch }) {

    const { user } = useAuth()

    const username =
        user?.user_metadata?.username ||
        user?.user_metadata?.name ||
        user?.email?.split("@")[0] ||
        "Usuário"

    const avatarLetter =
        username
            .replace("@", "")
            .charAt(0)
            .toUpperCase()


    return (

        <header className="navbar">

            <div className="navbar-logo">

                <span>
                    START
                </span>

                <strong>
                    _UP
                </strong>

            </div>


            <div className="navbar-search">

                <input
                    type="text"
                    placeholder="Pesquisar startups, pessoas ou ideias..."
                    onChange={(event) =>
                        onSearch?.(
                            event.target.value
                        )
                    }
                />

            </div>


            <div className="navbar-actions">


                <button
                    className="navbar-icon"
                    title="Notificações"
                >
                    🔔
                </button>


                <button
                    className="navbar-icon"
                    title="Mensagens"
                >
                    💬
                </button>


                <div className="navbar-user">


                    <div className="user-avatar">

                        {avatarLetter}

                    </div>


                    <span>

                        {username}

                    </span>


                </div>


            </div>

        </header>

    )
}

export default Navbar

