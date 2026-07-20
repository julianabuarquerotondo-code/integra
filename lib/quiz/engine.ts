import type { QuizAnswers, QuizResultKey, ScoreBreakdown } from "./types";

const TRIVIAL_VALUES = new Set(["sem_dificuldades", "nao_certeza", "sem_dificuldade"]);

function meaningful(list: string[] | undefined): string[] {
  return (list ?? []).filter((v) => !TRIVIAL_VALUES.has(v));
}

function includes(list: string[] | undefined, value: string): boolean {
  return (list ?? []).includes(value);
}

/**
 * Determina a idade/branch a partir da idade informada.
 */
export function resolveBranch(age: number): {
  ageGroup: QuizAnswers["ageGroup"];
  branch: QuizAnswers["branch"];
} {
  if (age < 4) return { ageGroup: "under_four", branch: "under_four" };
  if (age <= 16) return { ageGroup: "child_teen", branch: "A" };
  if (age <= 59) return { ageGroup: "adult", branch: "B" };
  return { ageGroup: "elderly", branch: "C" };
}

function scoreChildTeen(a: QuizAnswers): ScoreBreakdown {
  const multipleMotivations = meaningful(a.a2_motivations).length >= 2;
  const multipleEnvironments =
    meaningful(a.a8_environments).filter(
      (v) => v !== "situacoes_especificas" && v !== "quase_todos",
    ).length >= 2 || includes(a.a8_environments, "quase_todos");
  const longDuration = ["mais_6_meses", "mais_1_ano", "sempre"].includes(
    a.a3_duration ?? "",
  );
  const recentDrop =
    a.a4_schoolPerformance === "queda_recente" ||
    includes(a.a2_motivations, "queda_desempenho_escolar");

  let assessment = 0;
  if (a.a11_familyGoal === "avaliacao_especializada") assessment += 3;
  if (a.a11_familyGoal === "compreender_dificuldades") assessment += 3;
  if (a.a10_priorDiagnosis === "nunca_realizou") assessment += 2;
  if (a.a9_schoolConcern?.startsWith("sim")) assessment += 2;
  if (multipleMotivations) assessment += 2;
  if (includes(a.a2_motivations, "desenvolvimento_diferente")) assessment += 2;
  if (multipleEnvironments) assessment += 1;
  if (longDuration) assessment += 1;
  if (recentDrop) assessment += 1;

  const academicAreas = ["leitura", "escrita", "matematica", "ortografia", "compreensao_textos"];
  const academicCount = Math.min(
    3,
    meaningful(a.a5_learningDifficulties).filter((v) => academicAreas.includes(v)).length,
  );

  let intervention = 0;
  if (a.a11_familyGoal === "desenvolver_habilidades") intervention += 3;
  if (a.a11_familyGoal === "acompanhamento_individualizado") intervention += 3;
  if (
    ["avaliacao_anterior", "diagnostico_acompanha", "diagnostico_sem_acompanhar", "acompanhamento_anterior"].includes(
      a.a10_priorDiagnosis ?? "",
    )
  )
    intervention += 2;
  intervention += academicCount;
  if (includes(a.a5_learningDifficulties, "necessidade_ajuda")) intervention += 1;
  if (includes(a.a6_attentionOrganization, "dificuldade_concluir")) intervention += 1;

  let neurofeedback = 0;
  if (a.a11_familyGoal === "conhecer_neurofeedback") neurofeedback += 4;
  if (
    includes(a.a6_attentionOrganization, "distrai_facilidade") ||
    includes(a.a6_attentionOrganization, "dificuldade_concentracao")
  )
    neurofeedback += 2;
  if (includes(a.a2_motivations, "ansiedade_autorregulacao")) neurofeedback += 2;
  if (includes(a.a2_motivations, "orientacao_profissional")) neurofeedback += 2;
  if (includes(a.a6_attentionOrganization, "dificuldade_concluir")) neurofeedback += 1;

  let neuromodulation = 0;
  if (a.a11_familyGoal === "conhecer_neuromodulacao") neuromodulation += 4;
  if (includes(a.a2_motivations, "orientacao_profissional")) neuromodulation += 2;
  if (multipleMotivations) neuromodulation += 2;
  if (includes(a.a2_motivations, "esquecimentos") || includes(a.a6_attentionOrganization, "esquece_materiais"))
    neuromodulation += 1;
  if (includes(a.a2_motivations, "ansiedade_autorregulacao")) neuromodulation += 1;
  if (recentDrop) neuromodulation += 1;

  return { assessment, intervention, neurofeedback, neuromodulation };
}

function scoreAdult(a: QuizAnswers): Pick<ScoreBreakdown, "neurofeedback" | "neuromodulation"> {
  const explicitNeurofeedback =
    includes(a.b2_motivations, "interesse_neurofeedback") || a.b7_goal === "conhecer_neurofeedback";
  const explicitNeuromodulation =
    includes(a.b2_motivations, "interesse_neuromodulacao") || a.b7_goal === "conhecer_neuromodulacao";
  const multipleGoals = meaningful(a.b2_motivations).length >= 3;

  let neurofeedback = 0;
  if (explicitNeurofeedback) neurofeedback += 4;
  if (includes(a.b2_motivations, "dificuldade_atencao")) neurofeedback += 2;
  if (includes(a.b2_motivations, "dificuldade_concentracao")) neurofeedback += 2;
  if (includes(a.b2_motivations, "ansiedade_autorregulacao")) neurofeedback += 2;
  if (includes(a.b2_motivations, "indicacao_profissional")) neurofeedback += 2;
  if (includes(a.b2_motivations, "dificuldade_organizacao")) neurofeedback += 1;

  let neuromodulation = 0;
  if (explicitNeuromodulation) neuromodulation += 4;
  if (includes(a.b2_motivations, "indicacao_profissional")) neuromodulation += 2;
  if (multipleGoals) neuromodulation += 2;
  if (includes(a.b2_motivations, "esquecimentos")) neuromodulation += 2;
  if (includes(a.b2_motivations, "queda_desempenho_cognitivo")) neuromodulation += 1;
  if (a.b7_goal === "desenvolver_memoria_organizacao") neuromodulation += 1;

  return { neurofeedback, neuromodulation };
}

function scoreElderly(a: QuizAnswers): Pick<ScoreBreakdown, "neurofeedback" | "neuromodulation"> {
  const explicitNeurofeedback =
    includes(a.c2_motivations, "interesse_neurofeedback") || a.c8_goal === "conhecer_neurofeedback";
  const explicitNeuromodulation =
    includes(a.c2_motivations, "interesse_neuromodulacao") || a.c8_goal === "conhecer_neuromodulacao";
  const multipleGoals = meaningful(a.c2_motivations).length >= 3;

  let neurofeedback = 0;
  if (explicitNeurofeedback) neurofeedback += 4;
  if (includes(a.c2_motivations, "dificuldade_atencao")) neurofeedback += 2;
  if (includes(a.c2_motivations, "dificuldade_concentracao")) neurofeedback += 2;
  if (includes(a.c2_motivations, "dificuldade_autorregulacao")) neurofeedback += 2;
  if (includes(a.c2_motivations, "indicacao_medica")) neurofeedback += 2;
  if (includes(a.c2_motivations, "dificuldade_organizacao")) neurofeedback += 1;

  let neuromodulation = 0;
  if (explicitNeuromodulation) neuromodulation += 4;
  if (includes(a.c2_motivations, "indicacao_medica")) neuromodulation += 2;
  if (multipleGoals) neuromodulation += 2;
  if (includes(a.c2_motivations, "esquecimentos")) neuromodulation += 2;
  if (includes(a.c2_motivations, "lentidao") || includes(a.c2_motivations, "mudanca_funcionamento"))
    neuromodulation += 1;
  if (a.c8_goal === "estimular_habilidades") neuromodulation += 1;

  return { neurofeedback, neuromodulation };
}

export interface EngineOutcome {
  resultKey: QuizResultKey;
  scores: ScoreBreakdown;
}

const MIN_SCORE_THRESHOLD = 5;
const MIN_LEAD = 2;

function decide(scores: Partial<ScoreBreakdown>): QuizResultKey {
  const entries = Object.entries(scores) as [keyof ScoreBreakdown, number | undefined][];
  const ranked = entries
    .map(([key, value]) => [key, value ?? 0] as [keyof ScoreBreakdown, number])
    .sort((x, y) => y[1] - x[1]);

  const [topKey, topScore] = ranked[0];
  const secondScore = ranked[1]?.[1] ?? 0;

  if (topScore < MIN_SCORE_THRESHOLD) return "initial_conversation";
  if (topScore - secondScore < MIN_LEAD) return "initial_conversation";

  const mapping: Record<keyof ScoreBreakdown, QuizResultKey> = {
    assessment: "assessment",
    intervention: "intervention",
    neurofeedback: "neurofeedback",
    neuromodulation: "neuromodulation",
  };
  return mapping[topKey];
}

/**
 * Motor de direcionamento determinístico do quiz.
 * Regras 1 e 2 (briefing seção 19) são overrides absolutos.
 * As demais regras são resolvidas por pontuação, com limiar mínimo e margem de desempate.
 */
export function evaluateQuiz(answers: QuizAnswers): EngineOutcome {
  const emptyScores: ScoreBreakdown = {
    assessment: 0,
    intervention: 0,
    neurofeedback: 0,
    neuromodulation: 0,
  };

  // Regra 1 — menos de 4 anos
  if (answers.branch === "under_four") {
    return { resultKey: "under_four_contact", scores: emptyScores };
  }

  // Regra 2 — mudança repentina em pessoa idosa
  if (answers.branch === "C" && answers.c6_suddenChange === "sim") {
    return { resultKey: "health_evaluation_first", scores: emptyScores };
  }

  if (answers.branch === "A") {
    const scores = scoreChildTeen(answers);
    return { resultKey: decide(scores), scores };
  }

  if (answers.branch === "B") {
    const partial = scoreAdult(answers);
    const scores: ScoreBreakdown = { assessment: 0, intervention: 0, ...partial };
    return {
      resultKey: decide({ neurofeedback: partial.neurofeedback, neuromodulation: partial.neuromodulation }),
      scores,
    };
  }

  // branch === "C"
  const partial = scoreElderly(answers);
  const scores: ScoreBreakdown = { assessment: 0, intervention: 0, ...partial };
  return {
    resultKey: decide({ neurofeedback: partial.neurofeedback, neuromodulation: partial.neuromodulation }),
    scores,
  };
}
