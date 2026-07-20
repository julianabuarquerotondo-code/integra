import type { QuizResultKey } from "./types";

export interface ResultCopy {
  key: QuizResultKey;
  label: string;
  title: string;
  description: string;
  nextStepLabel: string;
  orientativeNotice: string;
}

const defaultNotice =
  "Este resultado é orientativo e não representa diagnóstico ou indicação definitiva.";

export const resultCopy: Record<QuizResultKey, ResultCopy> = {
  assessment: {
    key: "assessment",
    label: "Avaliação Integrada da Neuroaprendizagem",
    title: "Uma avaliação pode ser o melhor ponto de partida",
    description:
      "As respostas indicam aspectos relacionados à aprendizagem, atenção, organização, comportamento ou desenvolvimento que merecem ser compreendidos de forma mais ampla. Antes de definir uma intervenção, é importante considerar o histórico, os ambientes em que as dificuldades aparecem e o impacto delas na rotina. A Avaliação Integrada da Neuroaprendizagem pode ajudar a organizar essas informações e contribuir para a definição dos próximos passos.",
    nextStepLabel: "Serviço para conhecer primeiro: Avaliação Integrada da Neuroaprendizagem",
    orientativeNotice: defaultNotice,
  },
  intervention: {
    key: "intervention",
    label: "Intervenção em Neuroaprendizagem",
    title: "Um acompanhamento individualizado pode fazer sentido",
    description:
      "As respostas demonstram dificuldades relacionadas a habilidades importantes para a aprendizagem, como leitura, escrita, matemática, atenção, memória, organização ou realização de tarefas. A Intervenção em Neuroaprendizagem é planejada de acordo com as necessidades, as potencialidades e os objetivos de cada criança ou adolescente. Antes do início, a profissional verificará se já existem informações suficientes ou se uma avaliação mais ampla será necessária.",
    nextStepLabel: "Serviço para conhecer primeiro: Intervenção em Neuroaprendizagem",
    orientativeNotice: defaultNotice,
  },
  neurofeedback: {
    key: "neurofeedback",
    label: "Neurofeedback",
    title: "Vale conhecer o Neurofeedback em uma conversa inicial",
    description:
      "As respostas indicam objetivos relacionados à atenção, concentração, organização ou autorregulação. O Neurofeedback é um treinamento não invasivo e sua indicação depende da análise individual das necessidades, do histórico e dos objetivos apresentados.",
    nextStepLabel: "Serviço para conhecer primeiro: Neurofeedback",
    orientativeNotice: defaultNotice,
  },
  neuromodulation: {
    key: "neuromodulation",
    label: "Programa de Neuromodulação",
    title: "Vale conhecer o Programa de Neuromodulação",
    description:
      "As respostas indicam objetivos relacionados ao funcionamento cognitivo, à memória, à atenção, ao desempenho ou à estimulação de habilidades. O programa é individualizado e pode integrar diferentes recursos, conforme a análise profissional.",
    nextStepLabel: "Serviço para conhecer primeiro: Programa de Neuromodulação",
    orientativeNotice: defaultNotice,
  },
  initial_conversation: {
    key: "initial_conversation",
    label: "Conversa inicial com o Instituto",
    title: "Uma conversa inicial é o melhor próximo passo",
    description:
      "As respostas não apontam para uma única área predominante ou ainda existem informações que precisam ser compreendidas com mais cuidado. A conversa inicial permitirá conhecer melhor a situação e orientar sobre qual serviço pode fazer mais sentido.",
    nextStepLabel: "Próximo passo: Conversa inicial com o Instituto",
    orientativeNotice: defaultNotice,
  },
  health_evaluation_first: {
    key: "health_evaluation_first",
    label: "Conversa inicial e orientação para avaliação de saúde",
    title: "É importante conversar com um serviço de saúde",
    description:
      "Mudanças repentinas na atenção, memória ou funcionamento diário precisam ser avaliadas por um serviço de saúde antes da definição de programas de estimulação, Neurofeedback ou Neuromodulação. O Instituto poderá esclarecer dúvidas sobre seus serviços, mas o questionário não substitui essa avaliação.",
    nextStepLabel: "Próximo passo: conversa inicial e orientação para avaliação de saúde",
    orientativeNotice: defaultNotice,
  },
  under_four_contact: {
    key: "under_four_contact",
    label: "Conversa direta com o Instituto",
    title: "Vamos conversar diretamente sobre esse caso",
    description:
      "Para essa faixa etária, o melhor caminho é conversar diretamente com o Instituto para verificar quais atendimentos estão disponíveis.",
    nextStepLabel: "Próximo passo: conversa direta com o Instituto",
    orientativeNotice: defaultNotice,
  },
};
