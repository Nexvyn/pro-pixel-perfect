import { RootProvider } from "fumadocs-ui/provider"
import "./global.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Pixelify_Sans } from "next/font/google"
import { ThemeProvider } from "./providers/theme-provider"
import { LenisProvider } from "./providers/lenis-provider"
import { SearchRegistryProvider } from "@/hooks/use-search-registry"
import { ConfigProvider } from "@/hooks/use-config"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { GlobalSponsorButton } from "@/components/features/sponsors/global-sponsor-button"
import { CommandPaletteProvider } from "@/components/features/search/command-palette-context"

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.nexvyn.dev"),
  title: {
    default: "Nexvyn UI",
    template: "%s | Nexvyn UI",
  },
  description:
    "Nexvyn UI — A modern, lightweight, and copy-paste React UI library for building stunning documentation and landing pages.",
  keywords: [
    "react",
    "ui library",
    "tailwindcss",
    "documentation",
    "nexvyn",
    "components",
    "nextjs",
  ],
  authors: [{ name: "Nexvyn" }],
  creator: "Nexvyn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ui.nexvyn.dev",
    title: "Nexvyn/ui",
    description:
      "A modern, lightweight, and copy-paste React UI library for building stunning documentation and landing pages.",
    siteName: "Nexvyn/ui",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Nexvyn UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexvyn/ui",
    description:
      "A modern, lightweight, and copy-paste React UI library for building stunning documentation and landing pages.",
    images: ["/og-banner.jpg"],
    creator: "@nexvyn",
  },
  icons: {
    icon: "/logo/static/logo.svg",
  },
}

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify-sans",
  display: "swap",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${pixelifySans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchRegistryProvider>
            <ConfigProvider>
              <CommandPaletteProvider>
                <LenisProvider>
                  <RootProvider search={{ enabled: false }}>{children}</RootProvider>
                </LenisProvider>
              </CommandPaletteProvider>
            </ConfigProvider>
          </SearchRegistryProvider>
          <Analytics />
          <GlobalSponsorButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
