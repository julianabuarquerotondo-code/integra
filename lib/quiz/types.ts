export type AgeGroup = "under_four" | "child_teen" | "adult" | "elderly";

export type QuizBranch = "under_four" | "A" | "B" | "C";

export type QuizResultKey =
  | "assessment"
  | "intervention"
  | "neurofeedback"
  | "neuromodulation"
  | "initial_conversation"
  | "health_evaluation_first"
  | "under_four_contact";

export type BestContactTime = "manha" | "tarde" | "noite" | "qualquer";

export interface QuizAnswers {
  age: number;
  ageGroup: AgeGroup;
  branch: QuizBranch;

  // Caminho A — crianças e adolescentes
  a1_respondent?: string;
  a2_motivations?: string[];
  a3_duration?: string;
  a4_schoolPerformance?: string;
  a5_learningDifficulties?: string[];
  a6_attentionOrganization?: string[];
  a7_frustrationReaction?: string[];
  a8_environments?: string[];
  a9_schoolConcern?: string;
  a10_priorDiagnosis?: string;
  a11_familyGoal?: string;

  // Caminho B — adultos
  b1_respondent?: string;
  b2_motivations?: string[];
  b3_duration?: string;
  b4_aspects?: string[];
  b5_interferenceAreas?: string[];
  b6_priorDiagnosis?: string;
  b7_goal?: string;

  // Caminho C — idosos
  c1_respondent?: string;
  c2_motivations?: string[];
  c3_duration?: string;
  c4_observed?: string[];
  c5_routineInterference?: string;
  c6_suddenChange?: string;
  c7_medicalFollowUp?: string;
  c8_goal?: string;

  // Contato
  respondentName?: string;
  subjectNameOrInitials?: string;
  phone?: string;
  email?: string;
  city?: string;
  bestContactTime?: BestContactTime;
  additionalNotes?: string;

  // Consentimentos
  consentResponsibility?: boolean;
  consentDataUse?: boolean;
  consentDisclaimer?: boolean;

  sourceInterest?: string;
  sourcePage?: string;
}

export interface QuizResult {
  key: QuizResultKey;
  label: string;
  title: string;
  description: string;
}

export interface ScoreBreakdown {
  assessment: number;
  intervention: number;
  neurofeedback: number;
  neuromodulation: number;
}
