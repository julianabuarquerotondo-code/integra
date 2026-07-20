export type EmailStatus = "pending" | "sent" | "failed";
export type SubmissionStatus = "new" | "contacted" | "scheduled" | "closed";

export interface QuizSubmissionRow {
  id: string;
  public_code: string;
  created_at: string;
  updated_at: string;

  age: number;
  age_group: string;
  branch: string;

  respondent_type: string;
  respondent_name: string;
  subject_name_or_initials: string | null;
  phone: string;
  email: string | null;
  city: string;
  best_contact_time: string;

  answers: Record<string, unknown>;
  additional_notes: string | null;

  source_interest: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;

  result_key: string;
  result_label: string;
  internal_scores: Record<string, unknown> | null;

  consent_responsibility: boolean;
  consent_data_use: boolean;
  consent_disclaimer: boolean;
  consent_version: string;
  consent_at: string;

  pdf_path: string | null;
  email_status: EmailStatus;
  email_sent_at: string | null;
  email_error: string | null;

  status: SubmissionStatus;
  submission_token: string;
}

export interface Database {
  public: {
    Tables: {
      quiz_submissions: {
        Row: QuizSubmissionRow;
        Insert: Partial<QuizSubmissionRow> &
          Pick<
            QuizSubmissionRow,
            | "public_code"
            | "age"
            | "age_group"
            | "branch"
            | "respondent_type"
            | "respondent_name"
            | "phone"
            | "city"
            | "best_contact_time"
            | "answers"
            | "result_key"
            | "result_label"
            | "consent_responsibility"
            | "consent_data_use"
            | "consent_disclaimer"
            | "consent_version"
            | "consent_at"
            | "submission_token"
          >;
        Update: Partial<QuizSubmissionRow>;
      };
    };
  };
}
