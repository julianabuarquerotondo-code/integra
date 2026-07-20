import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { ctaCopy } from "@/content/site";

export function QuizCta({
  label = ctaCopy.discoveryMain,
  interest,
  variant = "primary",
  size = "md",
  className,
}: {
  label?: string;
  interest?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
}) {
  const href = interest ? `/quiz?interesse=${interest}` : "/quiz";
  return (
    <ButtonLink href={href} variant={variant} size={size} className={className}>
      {label}
      <ArrowRight className="size-4" aria-hidden />
    </ButtonLink>
  );
}
