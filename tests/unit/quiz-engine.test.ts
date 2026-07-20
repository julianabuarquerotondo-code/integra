import { describe, expect, it } from "vitest";
import { evaluateQuiz, resolveBranch } from "@/lib/quiz/engine";
import type { QuizAnswers } from "@/lib/quiz/types";

function baseAnswers(overrides: Partial<QuizAnswers>): QuizAnswers {
  const { ageGroup, branch } = resolveBranch(overrides.age ?? 10);
  return {
    age: overrides.age ?? 10,
    ageGroup,
    branch,
    ...overrides,
  };
}

describe("resolveBranch", () => {
  it("classifica menores de 4 anos", () => {
    expect(resolveBranch(3)).toEqual({ ageGroup: "under_four", branch: "under_four" });
  });
  it("classifica crianças e adolescentes", () => {
    expect(resolveBranch(4)).toEqual({ ageGroup: "child_teen", branch: "A" });
    expect(resolveBranch(16)).toEqual({ ageGroup: "child_teen", branch: "A" });
  });
  it("classifica adultos", () => {
    expect(resolveBranch(17)).toEqual({ ageGroup: "adult", branch: "B" });
    expect(resolveBranch(59)).toEqual({ ageGroup: "adult", branch: "B" });
  });
  it("classifica idosos", () => {
    expect(resolveBranch(60)).toEqual({ ageGroup: "elderly", branch: "C" });
    expect(resolveBranch(90)).toEqual({ ageGroup: "elderly", branch: "C" });
  });
});

describe("evaluateQuiz — regras prioritárias", () => {
  it("Regra 1: menos de 4 anos retorna under_four_contact", () => {
    const answers = baseAnswers({ age: 2 });
    expect(evaluateQuiz(answers).resultKey).toBe("under_four_contact");
  });

  it("Regra 2: mudança repentina em idoso retorna health_evaluation_first mesmo com interesse explícito", () => {
    const answers = baseAnswers({
      age: 70,
      c2_motivations: ["interesse_neurofeedback", "indicacao_medica"],
      c6_suddenChange: "sim",
      c8_goal: "conhecer_neurofeedback",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("health_evaluation_first");
  });
});

describe("evaluateQuiz — crianças e adolescentes", () => {
  it("prioriza Avaliação quando há sinais em várias áreas e sem avaliação prévia", () => {
    const answers = baseAnswers({
      age: 8,
      a2_motivations: [
        "dificuldades_escola",
        "desatencao",
        "desenvolvimento_diferente",
        "mudancas_comportamento",
      ],
      a3_duration: "mais_1_ano",
      a4_schoolPerformance: "queda_recente",
      a8_environments: ["casa", "escola", "situacoes_sociais"],
      a9_schoolConcern: "sim_mais_de_uma",
      a10_priorDiagnosis: "nunca_realizou",
      a11_familyGoal: "avaliacao_especializada",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("assessment");
  });

  it("prioriza Intervenção com dificuldade acadêmica clara e avaliação anterior", () => {
    const answers = baseAnswers({
      age: 9,
      a5_learningDifficulties: ["leitura", "escrita", "matematica"],
      a6_attentionOrganization: ["dificuldade_concluir"],
      a10_priorDiagnosis: "avaliacao_anterior",
      a11_familyGoal: "desenvolver_habilidades",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("intervention");
  });
});

describe("evaluateQuiz — adultos", () => {
  it("interesse explícito em Neurofeedback com foco em atenção", () => {
    const answers = baseAnswers({
      age: 30,
      b2_motivations: ["interesse_neurofeedback", "dificuldade_atencao", "dificuldade_concentracao"],
      b7_goal: "conhecer_neurofeedback",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("neurofeedback");
  });

  it("respostas variadas e sem sinal dominante retornam conversa inicial", () => {
    const answers = baseAnswers({
      age: 35,
      b2_motivations: ["cansaco_mental"],
      b7_goal: "compreender_servico",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("initial_conversation");
  });
});

describe("evaluateQuiz — idosos", () => {
  it("mudança repentina retorna conversa inicial e orientação para avaliação de saúde", () => {
    const answers = baseAnswers({
      age: 68,
      c6_suddenChange: "sim",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("health_evaluation_first");
  });

  it("sem sinais suficientes retorna conversa inicial", () => {
    const answers = baseAnswers({
      age: 65,
      c2_motivations: ["esquecimentos"],
      c6_suddenChange: "nao",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("initial_conversation");
  });

  it("interesse explícito em Neuromodulação com indicação médica", () => {
    const answers = baseAnswers({
      age: 72,
      c2_motivations: ["interesse_neuromodulacao", "indicacao_medica", "esquecimentos"],
      c6_suddenChange: "nao",
      c8_goal: "conhecer_neuromodulacao",
    });
    expect(evaluateQuiz(answers).resultKey).toBe("neuromodulation");
  });
});

describe("evaluateQuiz — pontuação abaixo do limite / empate", () => {
  it("empate entre duas categorias cai em conversa inicial", () => {
    const answers = baseAnswers({
      age: 40,
      b2_motivations: ["interesse_neurofeedback", "interesse_neuromodulacao"],
    });
    const outcome = evaluateQuiz(answers);
    expect(outcome.scores.neurofeedback).toBe(outcome.scores.neuromodulation);
    expect(outcome.resultKey).toBe("initial_conversation");
  });
});
