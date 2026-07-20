import { z } from "zod";

const optionalString = z.string().trim().max(200).optional();
const multiField = z.array(z.string().trim().max(100)).max(30).optional();

export const quizSubmitSchema = z.object({
  age: z.number().int().min(0).max(120),
  ageGroup: z.enum(["under_four", "child_teen", "adult", "elderly"]),
  branch: z.enum(["under_four", "A", "B", "C"]),

  a1_respondent: optionalString,
  a2_motivations: multiField,
  a3_duration: optionalString,
  a4_schoolPerformance: optionalString,
  a5_learningDifficulties: multiField,
  a6_attentionOrganization: multiField,
  a7_frustrationReaction: multiField,
  a8_environments: multiField,
  a9_schoolConcern: optionalString,
  a10_priorDiagnosis: optionalString,
  a11_familyGoal: optionalString,

  b1_respondent: optionalString,
  b2_motivations: multiField,
  b3_duration: optionalString,
  b4_aspects: multiField,
  b5_interferenceAreas: multiField,
  b6_priorDiagnosis: optionalString,
  b7_goal: optionalString,

  c1_respondent: optionalString,
  c2_motivations: multiField,
  c3_duration: optionalString,
  c4_observed: multiField,
  c5_routineInterference: optionalString,
  c6_suddenChange: optionalString,
  c7_medicalFollowUp: optionalString,
  c8_goal: optionalString,

  respondentName: z.string().trim().min(2).max(150),
  subjectNameOrInitials: z.string().trim().max(80).optional(),
  phone: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(150).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(120),
  bestContactTime: z.enum(["manha", "tarde", "noite", "qualquer"]),
  additionalNotes: z.string().trim().max(1500).optional(),

  consentResponsibility: z.literal(true),
  consentDataUse: z.literal(true),
  consentDisclaimer: z.literal(true),

  sourceInterest: z.string().trim().max(60).optional(),
  sourcePage: z.string().trim().max(200).optional(),

  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),

  submissionToken: z.string().uuid(),
});

export type QuizSubmitInput = z.infer<typeof quizSubmitSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(150),
  whatsapp: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(150).optional().or(z.literal("")),
  ageRange: z.string().trim().max(60),
  serviceInterest: z.string().trim().max(80),
  message: z.string().trim().max(1500),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
