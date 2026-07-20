import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileQuizBar } from "@/components/layout/MobileQuizBar";
import { siteConfig } from "@/content/site";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = "Psicopedagoga em São Paulo | Neuroaprendizagem e Neuromodulação";
const defaultDescription =
  "Instituto Integra+, com Vanessa Rotondo: avaliação, intervenção em neuroaprendizagem, Neurofeedback e Neuromodulação para crianças, adultos e idosos em São Paulo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: "%s | Instituto Integra+",
  },
  description: defaultDescription,
  keywords: [
    "psicopedagoga São Paulo",
    "neuroaprendizagem",
    "neuromodulação",
    "neurofeedback São Paulo",
    "dificuldades de aprendizagem",
    "avaliação psicopedagógica",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og/og-instituto-integra.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og/og-instituto-integra.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/brand/logo-instituto-integra.png`,
  description: defaultDescription,
  telephone: `+${siteConfig.whatsapp}`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: siteConfig.postalCode,
    addressCountry: "BR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  areaServed: "São Paulo",
  founder: {
    "@type": "Person",
    name: siteConfig.professionalName,
    jobTitle: siteConfig.professionalTitle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileQuizBar />
      </body>
    </html>
  );
}
