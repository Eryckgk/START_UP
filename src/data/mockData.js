
/* =========================
   USUÁRIO ATUAL
========================= */

export const currentUser = {
    id: 1,
    name: "João Carlos",
    username: "@joaocarlos",
    email: "joao@startup.com",
    role: "Desenvolvedor Full Stack",
    bio: "Apaixonado por tecnologia, startups e criação de produtos.",
    followers: 348,
    following: 182,
    startups: 2,
    skills: [
        "JavaScript",
        "React",
        "Node.js",
        "PostgreSQL"
    ]
}

/* =========================
   USUÁRIOS
========================= */

export const users = [
    {
        id: 1,
        name: "João Carlos",
        username: "@joaocarlos",
        role: "Desenvolvedor Full Stack",
        skills: [
            "React",
            "Node.js",
            "PostgreSQL"
        ],
        followers: 348
    },

    {
        id: 2,
        name: "Ana Oliveira",
        username: "@anaoliveira",
        role: "Product Designer",
        skills: [
            "UI/UX",
            "Figma",
            "Design System"
        ],
        followers: 521
    },

    {
        id: 3,
        name: "Lucas Mendes",
        username: "@lucasmendes",
        role: "Engenheiro de Software",
        skills: [
            "Java",
            "Python",
            "AWS"
        ],
        followers: 289
    },

    {
        id: 4,
        name: "Marina Santos",
        username: "@marinasantos",
        role: "Especialista em Marketing",
        skills: [
            "Growth",
            "SEO",
            "Marketing"
        ],
        followers: 746
    },

    {
        id: 5,
        name: "Pedro Costa",
        username: "@pedrocosta",
        role: "Empreendedor",
        skills: [
            "Startups",
            "Vendas",
            "Negócios"
        ],
        followers: 613
    }
]

/* =========================
   STARTUPS
========================= */

export const startups = [
    {
        id: 1,
        name: "StartTech",
        description:
            "Plataforma para conectar talentos de tecnologia com startups em crescimento.",
        category: "Tecnologia",
        stage: "MVP",
        members: 5,
        likes: 128,
        founder: "João Carlos"
    },

    {
        id: 2,
        name: "EcoMarket",
        description:
            "Marketplace focado em produtos sustentáveis de pequenos produtores.",
        category: "Sustentabilidade",
        stage: "Validação",
        members: 3,
        likes: 94,
        founder: "Ana Oliveira"
    },

    {
        id: 3,
        name: "HealthFlow",
        description:
            "Solução digital para facilitar o gerenciamento de clínicas.",
        category: "HealthTech",
        stage: "Ideia",
        members: 2,
        likes: 76,
        founder: "Lucas Mendes"
    },

    {
        id: 4,
        name: "GameLab",
        description:
            "Comunidade para criação colaborativa de jogos independentes.",
        category: "Games",
        stage: "MVP",
        members: 7,
        likes: 183,
        founder: "Pedro Costa"
    }
]

/* =========================
   POSTS
========================= */

export const posts = [
    {
        id: 1,
        author: "João Carlos",
        username: "@joaocarlos",
        time: "2h",
        content:
            "Depois de algumas semanas trabalhando no MVP, finalmente colocamos a primeira versão da StartTech no ar! 🚀",
        likes: 128,
        comments: 24,
        startup: {
            name: "StartTech",
            category: "Tecnologia"
        }
    },

    {
        id: 2,
        author: "Ana Oliveira",
        username: "@anaoliveira",
        time: "5h",
        content:
            "Qual é a maior dificuldade de vocês ao criar um produto digital? Estou pesquisando para um novo projeto.",
        likes: 86,
        comments: 41
    },

    {
        id: 3,
        author: "Lucas Mendes",
        username: "@lucasmendes",
        time: "1d",
        content:
            "Nosso primeiro teste com usuários trouxe insights que mudaram completamente o produto. Validem antes de construir demais!",
        likes: 213,
        comments: 37,
        startup: {
            name: "HealthFlow",
            category: "HealthTech"
        }
    }
]

/* =========================
   COMUNIDADES
========================= */

export const communities = [
    {
        id: 1,
        name: "Inteligência Artificial",
        description:
            "Discussões, projetos e novidades sobre IA.",
        members: 2480,
        category: "Tecnologia"
    },

    {
        id: 2,
        name: "Programação",
        description:
            "Compartilhe código, projetos e experiências.",
        members: 5320,
        category: "Desenvolvimento"
    },

    {
        id: 3,
        name: "Empreendedorismo",
        description:
            "Estratégias e experiências para quem está construindo negócios.",
        members: 3910,
        category: "Negócios"
    },

    {
        id: 4,
        name: "Design de Produto",
        description:
            "UI, UX, prototipação e desenvolvimento de produtos.",
        members: 1740,
        category: "Design"
    },

    {
        id: 5,
        name: "Investimentos",
        description:
            "Conecte-se com investidores e aprenda sobre captação.",
        members: 2160,
        category: "Finanças"
    }
]

/* =========================
   ATIVIDADES
========================= */

export const activities = [
    {
        id: 1,
        type: "startup",
        text: "Você criou a startup StartTech.",
        time: "Hoje"
    },

    {
        id: 2,
        type: "like",
        text: "Ana Oliveira curtiu sua startup.",
        time: "Hoje"
    },

    {
        id: 3,
        type: "follow",
        text: "Pedro Costa começou a seguir você.",
        time: "Ontem"
    },

    {
        id: 4,
        type: "comment",
        text: "Lucas comentou no seu post.",
        time: "Ontem"
    }
]

