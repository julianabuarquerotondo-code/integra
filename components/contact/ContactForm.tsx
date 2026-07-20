"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormInput } from "@/lib/quiz/schemas";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";

const ageRanges = [
  "Menos de 4 anos",
  "4 a 16 anos",
  "17 a 59 anos",
  "60 anos ou mais",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { website: "" },
  });

  async function onSubmit(data: ContactFormInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-soft-green p-6 text-sm text-text-primary" role="status" aria-live="polite">
        Sua mensagem foi enviada. O Instituto Integra+ entrará em contato em breve.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("website")}
      />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-purple-dark">
          Nome
        </label>
        <input
          id="name"
          className="min-h-11 w-full rounded-xl border border-border px-4 py-2 text-sm focus:border-purple-primary focus:outline-none"
          {...register("name")}
        />
        {errors.name ? <p className="mt-1 text-xs text-purple-dark">{errors.name.message}</p> : null}
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-purple-dark">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          type="tel"
          inputMode="numeric"
          className="min-h-11 w-full rounded-xl border border-border px-4 py-2 text-sm focus:border-purple-primary focus:outline-none"
          {...register("whatsapp")}
        />
        {errors.whatsapp ? <p className="mt-1 text-xs text-purple-dark">{errors.whatsapp.message}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-purple-dark">
          E-mail (opcional)
        </label>
        <input
          id="email"
          type="email"
          className="min-h-11 w-full rounded-xl border border-border px-4 py-2 text-sm focus:border-purple-primary focus:outline-none"
          {...register("email")}
        />
      </div>

      <div>
        <label htmlFor="ageRange" className="mb-1 block text-sm font-medium text-purple-dark">
          Faixa etária da pessoa para quem busca atendimento
        </label>
        <select
          id="ageRange"
          className="min-h-11 w-full rounded-xl border border-border px-4 py-2 text-sm focus:border-purple-primary focus:outline-none"
          {...register("ageRange")}
        >
          <option value="">Selecione</option>
          {ageRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        {errors.ageRange ? <p className="mt-1 text-xs text-purple-dark">{errors.ageRange.message}</p> : null}
      </div>

      <div>
        <label htmlFor="serviceInterest" className="mb-1 block text-sm font-medium text-purple-dark">
          Serviço de interesse
        </label>
        <select
          id="serviceInterest"
          className="min-h-11 w-full rounded-xl border border-border px-4 py-2 text-sm focus:border-purple-primary focus:outline-none"
          {...register("serviceInterest")}
        >
          <option value="">Ainda não sei</option>
          {services.map((s) => (
            <option key={s.key} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-purple-dark">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full rounded-xl border border-border px-4 py-2 text-sm focus:border-purple-primary focus:outline-none"
          {...register("message")}
        />
        {errors.message ? <p className="mt-1 text-xs text-purple-dark">{errors.message.message}</p> : null}
      </div>

      <label className="flex items-start gap-2 text-sm text-text-secondary">
        <input type="checkbox" className="mt-1" {...register("consent")} />
        Autorizo o contato do Instituto Integra+ com base nas informações fornecidas.
      </label>
      {errors.consent ? <p className="text-xs text-purple-dark">É necessário aceitar para enviar.</p> : null}

      {status === "error" ? (
        <p className="rounded-xl bg-soft-lilac p-3 text-sm text-purple-dark" role="alert">
          Não foi possível enviar agora. Tente novamente em instantes.
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} className="w-full justify-center sm:w-auto">
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
