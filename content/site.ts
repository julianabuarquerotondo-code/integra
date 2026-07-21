export const siteConfig = {
  name: "Instituto Integra+",
  shortName: "Integra+",
  tagline: "Neuroaprendizagem, Psicopedagogia e Neuromodulação",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  professionalName: "Vanessa Rotondo",
  professionalTitle: "Psicopedagoga especializada em Neuromodulação e Neuroaprendizagem",
  specializations: ["Neuroaprendizagem", "Neuromodulação"],
  registrations: [] as string[],
  experienceSummary:
    "O trabalho une conhecimento técnico, escuta atenta e tecnologia para compreender profundamente cada caso e transformar dificuldades em novas possibilidades de aprendizagem, desenvolvimento e qualidade de vida.",
  personalMessage:
    "Acredito que cada pessoa carrega uma história única, e é a partir dela que construímos, juntos, o caminho mais adequado para o seu desenvolvimento.",

  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511995881553",
  whatsappDisplay: "(11) 99588-1553",
  phone: "(11) 99588-1553",
  address: "R. Piracema, 216, Santa Terezinha",
  city: "São Paulo, SP",
  postalCode: "02460-040",
  openingHours: "Segunda a sexta, das 8h às 18h",
  inPersonCare: true,
  onlineCare: "[INFORMAR SE HÁ ATENDIMENTO ON-LINE]",

  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/institutointegramais/",
  professionalInstagramUrl: "https://www.instagram.com/psicovanessa/",
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "",

  whatsappMessages: {
    scheduleEvaluation:
      "Olá! Gostaria de agendar uma avaliação no Instituto Integra+. Poderiam me orientar sobre os próximos passos?",
    underFour:
      "Olá! Estou buscando atendimento para uma criança com menos de 4 anos e gostaria de saber quais atendimentos estão disponíveis no Instituto Integra+.",
  },
} as const;

export const navigation = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Quiz", href: "/quiz" },
  { label: "Contato", href: "/contato" },
] as const;

export const ctaCopy = {
  discoveryMain: "Descubra seu próximo passo",
  discoveryVariants: [
    "Por onde começar?",
    "Faça a triagem rápida",
    "Conte o que você percebe",
    "Encontre o primeiro passo",
    "Veja o que combina com você",
  ],
  direct: "Agende uma avaliação",
  quizDuration: "3 minutos.",
  quizDisclaimer: "Triagem informativa. Não substitui avaliação profissional.",
} as const;

export const audiences = [
  {
    title: "Crianças e adolescentes",
    description: "Aprendizagem, atenção, comportamento e desempenho escolar.",
  },
  {
    title: "Adultos",
    description: "Foco, memória, organização e desempenho no dia a dia.",
  },
  {
    title: "Pessoas idosas",
    description: "Memória, estimulação cognitiva e qualidade de vida.",
  },
] as const;

export const perceivedNeeds = [
  "Dificuldade para aprender ou acompanhar a escola",
  "Desatenção ou dificuldade de concentração",
  "Esquecimentos frequentes",
  "Dificuldade de organização",
  "Dificuldade para iniciar ou concluir tarefas",
  "Ansiedade ou dificuldade de autorregulação",
  "Queda no desempenho escolar ou cognitivo",
  "Interesse em estimular habilidades cognitivas",
] as const;

export const howItWorksSteps = [
  {
    title: "Conte o que está acontecendo",
    description: "Fale conosco ou responda à triagem rápida.",
  },
  {
    title: "Compreendemos sua demanda",
    description: "Organizamos as informações para o primeiro contato.",
  },
  {
    title: "Você recebe uma orientação",
    description: "Explicamos qual serviço pode fazer mais sentido.",
  },
  {
    title: "Começamos o planejamento",
    description: "Um plano individualizado, construído para o seu caso.",
  },
] as const;

export const differentials = [
  "Atendimento individualizado",
  "Avaliação especializada",
  "Planejamento sob medida",
  "Tecnologia com objetivo claro",
  "Acompanhamento próximo",
  "Participação da família e da escola",
] as const;

export const missionVisionValues = {
  mission:
    "Promover o desenvolvimento da aprendizagem e do funcionamento cognitivo por meio de avaliação, intervenção e tecnologia aplicadas de forma individualizada, ética e responsável.",
  vision:
    "Ser referência em neuroaprendizagem e neuromodulação, unindo conhecimento, inovação e cuidado em cada fase da vida.",
  values: ["Individualidade", "Ética", "Acolhimento", "Conhecimento", "Inovação"],
} as const;

export const aboutHistory = `O Instituto Integra+ nasceu do desejo de oferecer um espaço de escuta verdadeira e desenvolvimento individualizado para quem enfrenta desafios de aprendizagem, atenção, memória ou desempenho cognitivo.

Aqui, conhecimento especializado e tecnologia caminham lado a lado com o cuidado humano, resultando em um plano construído especialmente para cada pessoa, em cada fase da vida.`;
