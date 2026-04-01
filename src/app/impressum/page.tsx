"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Impressum() {
  const [lang, setLang] = useState<"de" | "en">("de");

  return (
    <main className="min-h-screen bg-background">
      {/* Header mit Language Toggle */}
      <header className="border-b px-6 py-4 lg:px-12">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">FocusCall</span>
          </Link>
          <div className="flex items-center gap-1 bg-background rounded-full p-1 border">
            <button 
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${lang === 'de' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setLang('de')}
            >
              DE
            </button>
            <button 
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
            {lang === 'de' ? 'Impressum' : 'Legal Notice'}
          </h1>

          {lang === 'en' && (
            <p className="mb-8 text-muted-foreground">
              This legal notice is only available in German as required by German law.
            </p>
          )}

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {lang === 'de' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}
              </h2>
              <p className="space-y-1">
                <strong className="text-foreground">focuscall UG</strong>
                <br />
                (haftungsbeschränkt)
                <br />
                Am Lindenbusch 22 a
                <br />
                50354 Hürth
                <br />
                Deutschland
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {lang === 'de' ? 'Handelsregister' : 'Commercial Register'}
              </h2>
              <p>
                Amtsgericht Köln
                <br />
                HRB 125121
                <br />
                EUID: DER3306.HRB125121
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {lang === 'de' ? 'Vertreten durch' : 'Represented by'}
              </h2>
              <p>
                Oliver Maximilian Spitzkat
                <br />
                Geschäftsführer
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {lang === 'de' ? 'Kontakt' : 'Contact'}
              </h2>
              <p className="space-y-1">
                E-Mail: support@focuscall.ai
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {lang === 'de' ? 'Umsatzsteuer-ID' : 'VAT ID'}
              </h2>
              <p>
                {lang === 'de' 
                  ? 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:' 
                  : 'VAT identification number according to § 27 a VAT Act:'}
                <br />
                {lang === 'de' ? 'wird nachgereicht' : 'to be provided'}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {lang === 'de' ? 'Streitschlichtung' : 'Dispute Resolution'}
              </h2>
              <p>
                {lang === 'de' 
                  ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:' 
                  : 'The European Commission provides a platform for online dispute resolution (ODR):'}
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                <br /><br />
                {lang === 'de' 
                  ? 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.' 
                  : 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {lang === 'de' ? 'Haftung für Inhalte' : 'Liability for Content'}
              </h2>
              <p>
                {lang === 'de' 
                  ? 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.' 
                  : 'As a service provider, we are responsible for our own content on these pages in accordance with § 7 Abs.1 TMG (German Telemedia Act) under general laws. According to §§ 8 to 10 TMG, we are not obliged as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.'}
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-semibold">FocusCall</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} focuscall UG. {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="/impressum" className="hover:text-foreground transition-colors">{lang === 'de' ? 'Impressum' : 'Legal Notice'}</a>
            <a href="/datenschutz" className="hover:text-foreground transition-colors">{lang === 'de' ? 'Datenschutz' : 'Privacy'}</a>
            <a href="https://www.linkedin.com/in/oliverspitzkat/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
