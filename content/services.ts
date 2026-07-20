export type ServiceKey =
  | "avaliacao"
  | "intervencao"
  | "neurofeedback"
  | "neuromodulacao";

export interface ServiceContent {
  key: ServiceKey;
  name: string;
  audience: string;
  shortDescription: string;
  quizCta: string;
  quizInterest: string;
  intro: string;
  image: string;
  covers: string[];
  process?: string[];
}

export const services: ServiceContent[] = [
  {
    key: "avaliacao",
    name: "Avaliação Integrada da Neuroaprendizagem",
    audience: "Crianças e adolescentes de 4 a 16 anos.",
    shortDescription: "Entenda as causas das dificuldades de aprendizagem e atenção.",
    quizCta: "Ver se a avaliação pode ser o primeiro passo",
    quizInterest: "avaliacao",
    image: "/photos/children.png",
    intro:
      "Antes de definir uma intervenção, é importante considerar o histórico, os ambientes em que as dificuldades aparecem e o impacto delas na rotina. A Avaliação Integrada da Neuroaprendizagem ajuda a organizar essas informações e contribui para a definição dos próximos passos.",
    covers: [
      "Aprendizagem",
      "Atenção",
      "Memória",
      "Leitura",
      "Escrita",
      "Matemática",
      "Organização",
      "Funções executivas",
      "Comportamento",
      "Desenvolvimento",
    ],
    process: [
      "Entrevista inicial",
      "Levantamento do histórico",
      "Aplicação dos procedimentos adequados",
      "Análise integrada",
      "Devolutiva",
      "Orientações",
      "Plano individualizado quando indicado",
    ],
  },
  {
    key: "intervencao",
    name: "Intervenção em Neuroaprendizagem",
    audience: "Crianças e adolescentes.",
    shortDescription: "Desenvolva leitura, escrita, atenção e organização.",
    quizCta: "Contar quais habilidades precisam de atenção",
    quizInterest: "intervencao",
    image: "/photos/space-room.png",
    intro:
      "A Intervenção em Neuroaprendizagem é planejada de acordo com as necessidades, as potencialidades e os objetivos de cada criança ou adolescente. Antes do início, a profissional verifica se já existem informações suficientes ou se uma avaliação mais ampla será necessária.",
    covers: [
      "Leitura",
      "Escrita",
      "Compreensão",
      "Matemática",
      "Atenção",
      "Memória",
      "Planejamento",
      "Organização",
      "Flexibilidade cognitiva",
      "Controle inibitório",
      "Autonomia",
    ],
  },
  {
    key: "neurofeedback",
    name: "Neurofeedback",
    audience: "Crianças, adolescentes, adultos e idosos.",
    shortDescription: "Treinamento cerebral não invasivo para foco e autorregulação.",
    quizCta: "Entender se o Neurofeedback pode fazer sentido",
    quizInterest: "neurofeedback",
    image: "/photos/space-neuro.png",
    intro:
      "O Neurofeedback é um treinamento não invasivo e sua indicação depende da análise individual das necessidades, do histórico e dos objetivos apresentados.",
    covers: [
      "Treinamento cerebral não invasivo",
      "Acompanhamento individual",
      "Objetivos definidos antes do início",
      "Processo de autorregulação",
      "Atenção e concentração",
      "Desempenho cognitivo",
    ],
  },
  {
    key: "neuromodulacao",
    name: "Programa de Neuromodulação",
    audience: "Crianças, adolescentes, adultos e idosos.",
    shortDescription: "Tecnologia aplicada ao funcionamento cerebral e à qualidade de vida.",
    quizCta: "Contar quais são meus objetivos",
    quizInterest: "neuromodulacao",
    image: "/photos/adults.png",
    intro:
      "O programa é individualizado e pode integrar diferentes recursos, conforme a análise profissional, com objetivos e frequência definidos e ajustados ao longo do processo.",
    covers: [
      "Funcionamento cerebral",
      "Aprendizado",
      "Desempenho",
      "Atenção",
      "Memória",
      "Autorregulação",
      "Qualidade de vida",
    ],
    process: [
      "Definição de objetivos",
      "Planejamento da frequência",
      "Acompanhamento da evolução",
      "Ajustes ao longo do processo",
    ],
  },
];

export const complementaryServices = [
  "Orientação familiar",
  "Consultoria escolar",
  "Relatórios",
  "Pareceres técnicos",
];

export const carePathway = [
  "Contato inicial",
  "Compreensão da demanda",
  "Avaliação da necessidade",
  "Planejamento individualizado",
  "Início do acompanhamento",
  "Observação e ajustes",
  "Devolutivas e orientações quando pertinentes",
];

export const needsList = [
  "Dificuldades de aprendizagem",
  "TDAH",
  "TEA",
  "Dislexia",
  "Discalculia",
  "Déficits de atenção",
  "Dificuldades de memória",
  "Dificuldades nas funções executivas",
  "Ansiedade",
  "Dificuldades de autorregulação",
  "Baixo desempenho escolar",
  "Baixo desempenho cognitivo",
  "Dificuldade de organização",
  "Dificuldade para iniciar ou concluir tarefas",
  "Interesse em estimulação cognitiva",
];
