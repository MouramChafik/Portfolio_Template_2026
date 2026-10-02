import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { bootScript } from "@/lib/boot-script";
import { mona } from "@/lib/fonts";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172e" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={mona.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* Sans JavaScript, les éléments animés restent visibles */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important}[style*="transform"]{transform:none!important}[style*="clip-path"]{clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body id="top">
        <Providers>
          <a
            href="#contenu"
            className="fixed top-3 left-3 z-[100] -translate-y-[200%] rounded-sm bg-action px-4 py-3 font-semibold text-on-action no-underline focus:translate-y-0"
          >
            Aller au contenu
          </a>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
