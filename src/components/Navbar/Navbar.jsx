import "./Navbar.css"

function Navbar({ user = "Usuário", onSearch }) {
    return (
        <header className="navbar">

            <div className="navbar-logo">
                <span>START</span>
                <strong>_UP</strong>
            </div>

            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Pesquisar startups, pessoas ou ideias..."
                    onChange={(event) => onSearch?.(event.target.value)}
                />
            </div>

            <div className="navbar-actions">

                <button className="navbar-icon" title="Notificações">
                    🔔
                </button>

                <button className="navbar-icon" title="Mensagens">
                    💬
                </button>

                <div className="navbar-user">
                    <div className="user-avatar">
                        {user.charAt(0).toUpperCase()}
                    </div>

                    <span>{user}</span>
                </div>

            </div>

        </header>
    )
}

export default Navbar