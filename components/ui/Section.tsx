import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

const bgClasses = {
  cream: "bg-cream",
  white: "bg-white",
  lilac: "bg-soft-lilac",
  blue: "bg-soft-blue",
  green: "bg-soft-green",
} as const;

export function Section({
  children,
  className,
  background = "cream",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  background?: keyof typeof bgClasses;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", bgClasses[background], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold text-balance text-purple-dark sm:text-3xl">{title}</h2>
      <span
        className={cn(
          "mt-4 block h-1 w-12 rounded-full bg-purple-primary/70",
          align === "center" && "mx-auto",
        )}
        aria-hidden
      />
      {description ? (
        <p className="mt-5 text-pretty text-text-secondary sm:leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
