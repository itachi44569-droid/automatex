import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "AutomateX AI — Premium AI Automation Agency", template: "%s | AutomateX AI" },
  description:
    "AutomateX AI is a world-class AI automation agency helping businesses in the USA, UK, and Europe automate workflows, build AI chatbots, and transform operations with cutting-edge AI solutions.",
  keywords: ["AI automation agency", "AI chatbots", "workflow automation", "business automation", "AI agents", "CRM automation", "lead generation AI"],
  authors: [{ name: "AutomateX AI" }],
  creator: "AutomateX AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://automatex.ai",
    title: "AutomateX AI — Premium AI Automation Agency",
    description: "Transform your business with cutting-edge AI automation solutions.",
    siteName: "AutomateX AI",
  },
  twitter: { card: "summary_large_image", title: "AutomateX AI — Premium AI Automation Agency", description: "Transform your business with cutting-edge AI automation solutions." },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://automatex.ai"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
