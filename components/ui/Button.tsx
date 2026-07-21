import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-purple-primary text-white shadow-sm shadow-purple-primary/20 hover:bg-purple-dark hover:shadow-md hover:shadow-purple-primary/25 focus-visible:outline-purple-dark",
  secondary:
    "bg-white text-purple-dark border border-purple-primary/40 hover:bg-soft-lilac hover:border-purple-primary/60 focus-visible:outline-purple-dark",
  outline:
    "bg-transparent text-purple-dark border border-purple-primary/50 hover:bg-soft-lilac focus-visible:outline-purple-dark",
  ghost: "bg-transparent text-purple-dark hover:bg-soft-lilac focus-visible:outline-purple-dark",
  whatsapp:
    "bg-[#25D366] text-white shadow-sm shadow-[#25D366]/25 hover:bg-[#20bd5c] hover:shadow-md hover:shadow-[#25D366]/30 focus-visible:outline-[#128C7E]",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-3 text-sm min-h-[44px]",
  lg: "px-6 py-3.5 text-base min-h-[48px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:duration-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
