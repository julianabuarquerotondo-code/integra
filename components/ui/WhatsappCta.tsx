import { ButtonLink } from "./Button";
import { WhatsappIcon } from "./WhatsappIcon";
import { siteConfig } from "@/content/site";
import { createWhatsappUrl } from "@/lib/whatsapp/createWhatsappUrl";

export function WhatsappCta({
  label = "Fale no WhatsApp",
  size = "md",
  className,
}: {
  label?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <ButtonLink
      href={createWhatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessages.scheduleEvaluation)}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      size={size}
      className={className}
    >
      <WhatsappIcon className="size-4" />
      {label}
    </ButtonLink>
  );
}
