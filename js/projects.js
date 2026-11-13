/* ==========================================================
   PROJETOS
   ----------------------------------------------------------
   Para ADICIONAR um projeto: copie um bloco { ... } abaixo,
   cole onde quiser na lista (a ordem aqui é a ordem no site)
   e troque os campos.

   Campos:
     id          identificador único, sem espaços (ex.: "meu-projeto")
     title       nome do projeto
     kind        "site" ou "sistema"
     status      "no-ar" | "mvp" | "prototipo" | "demo"
     tagline     uma linha que aparece na lista
     description lista de parágrafos (texto do modal)
     features    (opcional) lista de destaques
     tech        (opcional) lista de tecnologias
     url         (opcional) link do site no ar — cria o botão "Abrir site"
     links       (opcional) links extras: [{ label: "Repositório", url: "https://..." }]
     cover       (opcional) imagem de capa da lista. Se faltar, usa a 1ª imagem de "media"
     media       (opcional) fotos e vídeos, em ordem (veja abaixo)
     hidden      true = o projeto fica guardado aqui mas NÃO aparece no site

   Fotos e vídeos:
     1. Copie os arquivos para  assets/projects/<pasta-do-projeto>/
     2. Liste em "media", por exemplo:

     media: [
       { type: "image",   src: "assets/projects/meu-projeto/tela-inicial.jpg", caption: "Página inicial" },
       { type: "video",   src: "assets/projects/meu-projeto/demo.mp4", poster: "assets/projects/meu-projeto/demo.jpg", caption: "Sistema em uso" },
       { type: "youtube", id: "dQw4w9WgXcQ", caption: "Apresentação" }   // id = o que vem depois de v= no link
     ]

   Dica: vídeo .mp4 (H.264) toca em qualquer navegador. Prefira arquivos
   leves (até uns 10 MB) ou use "youtube" para vídeos longos.
   ========================================================== */
window.PROJECTS = [
  {
    id: "villaggio-ilha-bela",
    title: "Villaggio Ilha Bela",
    kind: "site",
    status: "no-ar",
    tagline: "Site de pousada em Itamaracá, PE",
    description: [
      "Site da pousada Villaggio Ilha Bela, em Itamaracá (PE). Publicado em servidor próprio, com domínio e certificado SSL configurados."
    ],
    tech: ["VPS Linux", "Nginx", "SSL"],
    url: "https://priveilhabela.com.br",
    cover: "",
    media: [
      { type: "image",   src: "assets/projects/villaggio-ilha-bela/pagina-inicia.png", caption: "Página inicial" },
      { type: "image",   src: "assets/projects/villaggio-ilha-bela/informacao.png", caption: "Página de Informacao" },
    ]
  },
  {
    id: "chegahoje",
    title: "ChegaHoje",
    kind: "site",
    status: "no-ar",
    tagline: "Site de entregas por moto na região de Recife",
    description: [
      "Site da ChegaHoje, empresa de entregas de moto. Refeito do zero com sistema totalmente novo, mais rápido, com SEO trabalhado (robots, sitemap e Core Web Vitals)."
    ],
    tech: ["Site e Sistema", "SEO", "Core Web Vitals", "Banco de dados"],
    url: "https://chegahoje.com.br",
    cover: "",
    media: [
       { type: "image",   src: "assets/projects/chegahoje/antes.png", caption: "Página inicial antes" },
       { type: "image",   src: "assets/projects/chegahoje/Depois.png", caption: "Página inicial depois" },
    ]
  },
  {
    id: "pousada-verde-mares",
    title: "Pousada Verde Mares",
    kind: "site",
    status: "demo",
    tagline: "Site de pousada em Maragogi, AL",
    description: [
      "Site da pousada verde Mares, em Maragogi (AL). Feito como demonstração, com link para o booking, airbnb, e whatsapp."
    ],
    tech: ["JavaScript", "HTML", "Css"],
    cover: "",
    media: [
      { type: "image",   src: "assets/projects/pousada-verde-mares/pagina-inicial.png", caption: "Página inicial" },
    ]
  },
  {
    id: "pousada-sal-mar",
    title: "Pousada Sal e Mar",
    kind: "site",
    status: "demo",
    tagline: "Site de pousada em Ipojuca, PE",
    description: [
      "Site da pousada sal e Mar, em Ipojuca (PE). Feito como demonstração, com link para o booking, airbnb, e whatsapp."
    ],
    tech: ["JavaScript", "HTML", "Css"],
    cover: "",
    media: [
      { type: "image",   src: "assets/projects/pousada-sal-mar/pagina-inicial.png", caption: "Página inicial" },
      { type: "image",   src: "assets/projects/pousada-sal-mar/informacoes.png", caption: "Página de informacao" },
    ]
  },
  {
    id: "oticas-fidelizacao",
    title: "Fidelização para óticas",
    kind: "sistema",
    status: "mvp",
    tagline: "Recompra e relacionamento com clientes de óticas",
    description: [
      "MVP de um sistema para óticas acompanharem seus clientes e lembrarem a hora da recompra.",
      "Pensado para redes: cada loja e cada vendedor têm o próprio acesso, e o gestor pode reatribuir clientes quando a equipe muda."
    ],
    features: [
      "Várias lojas dentro da mesma ótica",
      "Login por vendedor e visão do gestor",
      "Lembretes de recompra conforme a validade do grau"
    ],
    cover: "",
    media: [],
    hidden: true
  },
  {
    id: "rr-refrigeracao",
    title: "RR Refrigeração",
    kind: "sistema",
    status: "mvp",
    tagline: "Vendas, estoque e financeiro para loja de refrigeração",
    description: [
      "Sistema de gestão para a RR Refrigeração. Registra vendas, controla o estoque e acompanha o financeiro em um só lugar."
    ],
    features: [
      "Nova venda: busca do produto por SKU, quantidade e forma de pagamento, inclusive Pix",
      "Nome e CPF/CNPJ do cliente, opcionais, para a nota",
      "Controle de estoque",
      "Módulo financeiro"
    ],
    tech: ["Django", "Pix", "Postgres"],
    cover: "",
    media: [
      { type: "image",   src: "assets/projects/rr-refrigeracao/listadeitens.png", caption: "Lista de Itens" },
      { type: "image",   src: "assets/projects/rr-refrigeracao/pagina-pagamento.png", caption: "Pagina de pagamento" },
    ]
  },
  {
    id: "clinica-psicologa",
    title: "Gestão de clínica",
    kind: "sistema",
    status: "prototipo",
    tagline: "Pacientes e anamnese para psicóloga",
    description: [
      "Protótipo de aplicativo de gestão clínica para uma psicóloga, com lista de pacientes, cadastro e anamnese."
    ],
    features: ["Lista de pacientes", "Cadastro de paciente", "Anamnese"],
    cover: "",
    media: [
      { type: "image",   src: "assets/projects/clinica-psicologa/anamnese.png", caption: "Anamnese" },
      { type: "image",   src: "assets/projects/clinica-psicologa/cadastro.png", caption: "Cadastro" },
      { type: "image",   src: "assets/projects/clinica-psicologa/lista.png", caption: "Lista de pacientes" },
    ]
  },
  {
    id: "sergio-aeromotor",
    title: "Sérgio Aeromotor",
    kind: "site",
    status: "demo",
    tagline: "Site em versão de demonstração",
    description: [
      "Versão de demonstração do site Sérgio Aeromotor."
    ],
    cover: "",
    media: [
      { type: "image",   src: "assets/projects/sergio-aeromotor/pagina-inicial.png", caption: "Pagina inicial" },
      { type: "image",   src: "assets/projects/sergio-aeromotor/informacao.png", caption: "Seção de informacao" },
      { type: "image",   src: "assets/projects/sergio-aeromotor/contato.png", caption: "Seção de contato" },
    ]
  },

  {
    id: "sitio-espaco-verde",
    title: "Sítio Espaço Verde",
    kind: "site",
    status: "demo",   // troque para "no-ar" e preencha url quando publicar
    tagline: "Site de sítio ecológico e educação ambiental",
    description: [
      "Site do Sítio Ecológico Espaço Verde, com foco em educação ambiental, lazer e ecoturismo."
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    // url: "https://...",
    cover: "",
    media: [
      // { type: "image", src: "assets/projects/sitio-espaco-verde/pagina-inicial.png", caption: "Página inicial" },
    ]
  },

  /* ---- Guardado, não aparece no site (troque hidden para false) ---- */
  {
    id: "pastel-da-mary",
    title: "Pastel da Mary",
    kind: "sistema",
    status: "mvp",
    tagline: "Cardápio e pedidos para pastelaria",
    description: [
      "Sistema de pedidos para a Pastel da Mary: cardápio, carrinho e o \"monte seu pastel\", em que o preço muda conforme os ingredientes escolhidos.",
      "Painel administrativo para acompanhar pedidos, confirmar pagamentos e editar produtos e ingredientes."
    ],
    features: [
      "Cliente faz o pedido sem precisar de cadastro",
      "Monte seu pastel com soma automática dos ingredientes",
      "Status do pedido: recebido, preparando, pronto e entregue",
      "Painel com total de pedidos e faturamento"
    ],
    tech: ["Django"],
    cover: "",
    media: [
      { type: "image",   src: "assets/projects/pastel-da-mary/pagina-inicial.png", caption: "Pagina inicial" },
    ],
    // hidden: true
  }
];
