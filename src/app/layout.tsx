import type { Metadata } from "next";
import { Lora, Raleway } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FocusCall — Dein persönlicher ADHD Coach",
  description: "Monatelange Wartezeiten auf professionelle Unterstützung? Unser AI-Agent versteht dein ADHD-Gehirn und begleitet dich täglich — basierend auf echten Methoden verifizierter Coaches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${lora.variable} ${raleway.variable} antialiased`}
        style={{ fontFamily: 'var(--font-raleway), system-ui, sans-serif' }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
