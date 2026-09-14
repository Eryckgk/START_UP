import { useState } from "react"
import "./Messages.css"

function Messages() {

    const [selected, setSelected] = useState(0)
    const [message, setMessage] = useState("")

    const conversations = [
        {
            name: "Ana Silva",
            lastMessage: "Vamos conversar sobre a startup?",
            messages: [
                {
                    sender: "Ana Silva",
                    text: "Oi! Vi sua startup no Explore."
                },
                {
                    sender: "Você",
                    text: "Sério? O que achou?"
                },
                {
                    sender: "Ana Silva",
                    text: "Gostei bastante! Vamos conversar sobre a startup?"
                }
            ]
        },
        {
            name: "Carlos Oliveira",
            lastMessage: "Mandei o MVP para você.",
            messages: [
                {
                    sender: "Carlos Oliveira",
                    text: "Mandei o MVP para você."
                }
            ]
        }
    ]

    const currentConversation =
        conversations[selected]

    function sendMessage(event) {

        event.preventDefault()

        if (!message.trim()) {
            return
        }

        console.log("Mensagem:", message)

        setMessage("")
    }

    return (
        <div className="messages">

            <div className="messages-layout">

                <main className="messages-content">

                    <div className="conversation-list">

                        <h2>Mensagens</h2>

                        {conversations.map(
                            (conversation, index) => (
                                <button
                                    key={conversation.name}
                                    className={
                                        selected === index
                                            ? "conversation active"
                                            : "conversation"
                                    }
                                    onClick={() =>
                                        setSelected(index)
                                    }
                                >

                                    <div className="message-avatar">
                                        {conversation.name.charAt(0)}
                                    </div>

                                    <div>

                                        <strong>
                                            {conversation.name}
                                        </strong>

                                        <span>
                                            {conversation.lastMessage}
                                        </span>

                                    </div>

                                </button>
                            )
                        )}

                    </div>

                    <section className="chat">

                        <header className="chat-header">

                            <div className="message-avatar">
                                {currentConversation.name.charAt(0)}
                            </div>

                            <strong>
                                {currentConversation.name}
                            </strong>

                        </header>

                        <div className="chat-messages">

                            {currentConversation.messages.map(
                                (msg, index) => (
                                    <div
                                        key={index}
                                        className={
                                            msg.sender === "Você"
                                                ? "chat-message own"
                                                : "chat-message"
                                        }
                                    >
                                        {msg.text}
                                    </div>
                                )
                            )}

                        </div>

                        <form
                            className="chat-input"
                            onSubmit={sendMessage}
                        >

                            <input
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                placeholder="Digite uma mensagem..."
                            />

                            <button>
                                Enviar
                            </button>

                        </form>

                    </section>

                </main>

            </div>

        </div>
    )
}

export default Messages