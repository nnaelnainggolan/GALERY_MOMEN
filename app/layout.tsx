import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/components/language/LanguageProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { BackgroundWaves } from "@/components/background/BackgroundWaves";
import { Footer } from "@/components/layout/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Memories — Personal Photo Archive",
  description:
    "A private collection of photographs, memories, places, and moments worth keeping.",
  openGraph: {
    title: "Memories — Personal Photo Archive",
    description:
      "A private collection of photographs, memories, places, and moments worth keeping.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans`}>
        <ThemeProvider>
          <LanguageProvider>
            <BackgroundWaves />
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
