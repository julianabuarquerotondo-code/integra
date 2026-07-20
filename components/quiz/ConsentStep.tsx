export interface ConsentValues {
  consentResponsibility: boolean;
  consentDataUse: boolean;
  consentDisclaimer: boolean;
}

export function ConsentStep({
  isMinor,
  values,
  onChange,
  error,
}: {
  isMinor: boolean;
  values: ConsentValues;
  onChange: (values: ConsentValues) => void;
  error?: string;
}) {
  function toggle<K extends keyof ConsentValues>(key: K) {
    onChange({ ...values, [key]: !values[key] });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-dark sm:text-2xl">
        Antes de enviar, confirme os consentimentos abaixo
      </h2>

      <div className="mt-6 space-y-4">
        <ConsentCheckbox
          checked={values.consentResponsibility}
          onChange={() => toggle("consentResponsibility")}
          label={
            isMinor
              ? "Declaro que sou responsável legal pela criança ou pelo adolescente, ou que possuo autorização do responsável para fornecer estas informações."
              : "Declaro que sou a própria pessoa interessada ou que possuo autorização para fornecer estas informações."
          }
        />
        <ConsentCheckbox
          checked={values.consentDataUse}
          onChange={() => toggle("consentDataUse")}
          label="Autorizo o Instituto Integra+ a utilizar as informações fornecidas exclusivamente para compreender esta solicitação, realizar o contato inicial e orientar sobre os serviços disponíveis, conforme descrito na Política de Privacidade."
        />
        <ConsentCheckbox
          checked={values.consentDisclaimer}
          onChange={() => toggle("consentDisclaimer")}
          label="Compreendo que esta triagem possui caráter exclusivamente informativo e não constitui diagnóstico, avaliação profissional, laudo, parecer técnico ou indicação definitiva de tratamento."
        />
      </div>

      {error ? (
        <p className="mt-4 text-sm text-purple-dark" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm text-text-secondary">
      <input type="checkbox" className="mt-1 size-4" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
