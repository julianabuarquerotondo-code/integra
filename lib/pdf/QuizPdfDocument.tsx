import "server-only";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import path from "node:path";
import type { QuizAnswers, QuizResultKey, AgeGroup } from "@/lib/quiz/types";
import { resultCopy } from "@/lib/quiz/result-copy";
import { formatDateTimeBR } from "@/lib/utils/date";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#2F2932",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#9464A2",
    paddingBottom: 12,
  },
  logo: { width: 120, height: undefined, marginRight: 16 },
  headerText: { flexGrow: 1 },
  title: { fontSize: 14, fontWeight: 700, color: "#75507F", marginBottom: 2 },
  subtitle: { fontSize: 10, color: "#655E68" },
  code: { fontSize: 11, fontWeight: 700, color: "#9464A2", marginTop: 4 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#75507F",
    marginTop: 14,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E1E9",
    paddingBottom: 3,
  },
  row: { flexDirection: "row", marginBottom: 3 },
  label: { width: 150, color: "#655E68" },
  value: { flexGrow: 1, color: "#2F2932" },
  qaBlock: { marginBottom: 6 },
  question: { fontWeight: 700, marginBottom: 2 },
  answer: { color: "#2F2932" },
  resultBox: {
    backgroundColor: "#F2EDF4",
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  resultTitle: { fontSize: 11, fontWeight: 700, color: "#75507F", marginBottom: 4 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    fontSize: 7,
    color: "#655E68",
    borderTopWidth: 1,
    borderTopColor: "#E8E1E9",
    paddingTop: 6,
  },
  pageNumber: {
    position: "absolute",
    bottom: 24,
    right: 36,
    fontSize: 7,
    color: "#655E68",
  },
});

function titleForAgeGroup(ageGroup: AgeGroup): string {
  if (ageGroup === "child_teen")
    return "Resumo de Triagem Inicial — Neuroaprendizagem e Desenvolvimento";
  if (ageGroup === "elderly")
    return "Resumo de Triagem Inicial — Necessidades e Objetivos Cognitivos";
  return "Resumo de Triagem Inicial — Funcionamento e Desempenho Cognitivo";
}

export interface QuizAnswerLabel {
  question: string;
  answer: string;
}

export interface QuizPdfProps {
  publicCode: string;
  createdAt: Date;
  resultKey: QuizResultKey;
  answers: QuizAnswers;
  answerLabels: QuizAnswerLabel[];
  consentVersion: string;
  consentAt: Date;
  logoPath?: string;
}

const disclaimerFooter =
  "Este documento reúne informações fornecidas por meio da triagem digital do Instituto Integra+. Seu conteúdo possui caráter exclusivamente inicial e informativo. Não constitui avaliação, diagnóstico, laudo, parecer técnico ou indicação definitiva de tratamento ou acompanhamento. As informações devem ser confirmadas e aprofundadas durante o contato com a profissional.";

export function QuizPdfDocument({
  publicCode,
  createdAt,
  resultKey,
  answers,
  answerLabels,
  consentVersion,
  consentAt,
  logoPath,
}: QuizPdfProps) {
  const result = resultCopy[resultKey];
  const resolvedLogo =
    logoPath ?? path.join(process.cwd(), "public/brand/logo-instituto-integra.png");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={resolvedLogo} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{titleForAgeGroup(answers.ageGroup)}</Text>
            <Text style={styles.subtitle}>Instituto Integra+</Text>
            <Text style={styles.code}>Código: {publicCode}</Text>
            <Text style={styles.subtitle}>{formatDateTimeBR(createdAt)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Dados do contato</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nome de quem respondeu</Text>
          <Text style={styles.value}>{answers.respondentName}</Text>
        </View>
        {answers.subjectNameOrInitials ? (
          <View style={styles.row}>
            <Text style={styles.label}>Nome/iniciais da pessoa atendida</Text>
            <Text style={styles.value}>{answers.subjectNameOrInitials}</Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.label}>Idade</Text>
          <Text style={styles.value}>{answers.age} anos</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>WhatsApp</Text>
          <Text style={styles.value}>{answers.phone}</Text>
        </View>
        {answers.email ? (
          <View style={styles.row}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{answers.email}</Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.label}>Cidade</Text>
          <Text style={styles.value}>{answers.city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Melhor período para contato</Text>
          <Text style={styles.value}>{answers.bestContactTime}</Text>
        </View>

        <Text style={styles.sectionTitle}>Respostas</Text>
        {answerLabels.map((qa, index) => (
          <View style={styles.qaBlock} key={index} wrap={false}>
            <Text style={styles.question}>{qa.question}</Text>
            <Text style={styles.answer}>{qa.answer}</Text>
          </View>
        ))}

        {answers.additionalNotes ? (
          <>
            <Text style={styles.sectionTitle}>Relato complementar</Text>
            <Text style={styles.answer}>{answers.additionalNotes}</Text>
          </>
        ) : null}

        <Text style={styles.sectionTitle}>Orientação inicial</Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>{result.label}</Text>
          <Text>{result.description}</Text>
        </View>

        <Text style={styles.sectionTitle}>Consentimentos</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Declarações aceitas</Text>
          <Text style={styles.value}>
            Responsabilidade legal, uso dos dados e limite do questionário
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Versão do consentimento</Text>
          <Text style={styles.value}>{consentVersion}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>{formatDateTimeBR(consentAt)}</Text>
        </View>

        <Text style={styles.footer} fixed>
          {disclaimerFooter}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
