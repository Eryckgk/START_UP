import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Post from "../../components/Post/Post"
import StartupCard from "../../components/StartupCard/StartupCard"
import Button from "../../components/Button/Button"
import "./Profile.css"

function Profile() {

    return (
        <div className="profile">

            <Navbar user="João" />

            <div className="profile-layout">

                <Sidebar activePage="profile" />

                <main className="profile-content">

                    <section className="profile-header">

                        <div className="profile-avatar">
                            J
                        </div>

                        <div className="profile-info">

                            <h1>João Carlos</h1>

                            <span>@joaocarlos</span>

                            <p>
                                Desenvolvedor apaixonado por tecnologia,
                                startups e criação de produtos.
                            </p>

                            <div className="profile-stats">

                                <span>
                                    <strong>128</strong>
                                    seguidores
                                </span>

                                <span>
                                    <strong>84</strong>
                                    seguindo
                                </span>

                                <span>
                                    <strong>3</strong>
                                    startups
                                </span>

                            </div>

                        </div>

                        <Button variant="outline">
                            Editar perfil
                        </Button>

                    </section>

                    <section className="profile-section">

                        <h2>Minhas startups</h2>

                        <div className="profile-startups">

                            <StartupCard
                                name="StartTech"
                                description="Soluções simples para problemas complexos."
                                category="Tecnologia"
                                stage="MVP"
                                members={4}
                                likes={103}
                            />

                            <StartupCard
                                name="StudyUp"
                                description="Ferramenta para estudantes organizarem seus estudos."
                                category="Educação"
                                stage="Ideia"
                                members={2}
                                likes={58}
                            />

                        </div>

                    </section>

                    <section className="profile-section">

                        <h2>Publicações</h2>

                        <Post
                            author="João Carlos"
                            username="@joaocarlos"
                            time="1d"
                            content="Hoje comecei a trabalhar em uma nova ideia de startup."
                            likes={31}
                            comments={6}
                        />

                    </section>

                </main>

            </div>

        </div>
    )
}

export default Profile