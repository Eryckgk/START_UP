import "./Sidebar.css"

function Sidebar({ activePage = "home", onNavigate }) {

    const menuItems = [
        {
            id: "home",
            icon: "🏠",
            label: "Início"
        },
        {
            id: "explore",
            icon: "🔎",
            label: "Explorar"
        },
        {
            id: "startups",
            icon: "🚀",
            label: "Startups"
        },
        {
            id: "communities",
            icon: "👥",
            label: "Comunidades"
        },
        {
            id: "messages",
            icon: "💬",
            label: "Mensagens"
        },
        {
            id: "dashboard",
            icon: "📊",
            label: "Dashboard"
        }
    ]

    return (
        <aside className="sidebar">

            <div className="sidebar-create">
                <button onClick={() => onNavigate?.("create-startup")}>
                    <span>＋</span>
                    Criar Startup
                </button>
            </div>

            <nav className="sidebar-menu">

                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={
                            activePage === item.id
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                        onClick={() => onNavigate?.(item.id)}
                    >
                        <span className="sidebar-icon">
                            {item.icon}
                        </span>

                        <span>
                            {item.label}
                        </span>
                    </button>
                ))}

            </nav>

            <div className="sidebar-bottom">

                <button className="sidebar-item">
                    <span className="sidebar-icon">⚙️</span>
                    Configurações
                </button>

                <button className="sidebar-item">
                    <span className="sidebar-icon">❓</span>
                    Ajuda
                </button>

            </div>

        </aside>
    )
}

export default Sidebar