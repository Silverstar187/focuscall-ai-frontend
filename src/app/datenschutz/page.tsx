"use client";

import { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Datenschutz() {
  const [lang, setLang] = useState<"de" | "en">(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('focuscall-lang') as "de" | "en") || "de";
    }
    return "de";
  });

  useEffect(() => {
    localStorage.setItem('focuscall-lang', lang);
  }, [lang]);

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
            {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
          </h1>

          {lang === 'en' && (
            <p className="mb-8 text-muted-foreground">
              This privacy policy is only available in German as required by German law.
            </p>
          )}

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                1. {lang === 'de' ? 'Datenschutz auf einen Blick' : 'Data Protection Overview'}
              </h2>
              <h3 className="mb-2 font-medium text-foreground">{lang === 'de' ? 'Allgemeine Hinweise' : 'General Information'}</h3>
              <p className="mb-4">
                {lang === 'de' 
                  ? 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.' 
                  : 'The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you.'}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                2. {lang === 'de' ? 'Verantwortlicher' : 'Data Controller'}
              </h2>
              <p className="space-y-1">
                <strong className="text-foreground">focuscall UG (haftungsbeschränkt)</strong>
                <br />
                {lang === 'de' ? 'Geschäftsführer' : 'Managing Director'}: Oliver Maximilian Spitzkat
                <br />
                Am Lindenbusch 22 a
                <br />
                50354 Hürth
                <br />
                {lang === 'de' ? 'E-Mail' : 'Email'}: support@focuscall.ai
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                3. {lang === 'de' ? 'Datenerfassung auf dieser Website' : 'Data Collection on This Website'}
              </h2>
              
              <h3 className="mb-2 mt-4 font-medium text-foreground">{lang === 'de' ? 'Wie erfassen wir Ihre Daten?' : 'How do we collect your data?'}</h3>
              <p className="mb-4">
                {lang === 'de' 
                  ? 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.' 
                  : 'Your data is collected on the one hand by you providing it to us. This may be data that you enter in a contact form, for example.'}
              </p>

              <h3 className="mb-2 font-medium text-foreground">{lang === 'de' ? 'Welche Daten erfassen wir?' : 'What data do we collect?'}</h3>
              <ul className="mb-4 list-disc pl-5 space-y-1">
                <li>{lang === 'de' ? 'E-Mail-Adresse (bei Anmeldung zum Early Access)' : 'Email address (when signing up for Early Access)'}</li>
                <li>{lang === 'de' ? 'Nutzungsdaten (anonymisiert, zur Verbesserung des Services)' : 'Usage data (anonymized, to improve the service)'}</li>
              </ul>

              <h3 className="mb-2 font-medium text-foreground">{lang === 'de' ? 'Wofür nutzen wir Ihre Daten?' : 'What do we use your data for?'}</h3>
              <p className="mb-4">
                {lang === 'de' 
                  ? 'Die Daten werden ausschließlich zur Benachrichtigung über den Produktlaunch und für den Betrieb des FocusCall-Dienstes verwendet.' 
                  : 'The data is used exclusively to notify you about the product launch and to operate the FocusCall service.'}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                4. {lang === 'de' ? 'Speicherdauer' : 'Storage Duration'}
              </h2>
              <p>
                {lang === 'de' 
                  ? 'Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erreichung der Zwecke, für die sie erhoben wurden, erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben.' 
                  : 'We only store your personal data for as long as is necessary to achieve the purposes for which it was collected or as required by statutory retention periods.'}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                5. {lang === 'de' ? 'Ihre Rechte' : 'Your Rights'}
              </h2>
              <p className="mb-4">
                {lang === 'de' ? 'Sie haben jederzeit das Recht:' : 'You have the right at any time:'}
              </p>
              <ul className="mb-4 list-disc pl-5 space-y-1">
                <li>{lang === 'de' ? 'Auskunft über Ihre gespeicherten Daten zu erhalten' : 'To obtain information about your stored data'}</li>
                <li>{lang === 'de' ? 'Berichtigung unrichtiger Daten zu verlangen' : 'To demand correction of incorrect data'}</li>
                <li>{lang === 'de' ? 'Löschung Ihrer Daten zu verlangen' : 'To demand deletion of your data'}</li>
                <li>{lang === 'de' ? 'Einschränkung der Verarbeitung zu verlangen' : 'To demand restriction of processing'}</li>
                <li>{lang === 'de' ? 'Widerspruch gegen die Verarbeitung einzulegen' : 'To object to processing'}</li>
                <li>{lang === 'de' ? 'Datenübertragbarkeit zu verlangen' : 'To demand data portability'}</li>
              </ul>
              <p>
                {lang === 'de' ? 'Kontaktieren Sie uns hierzu unter' : 'Contact us at'}: support@focuscall.ai
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                6. {lang === 'de' ? 'Hosting' : 'Hosting'}
              </h2>
              <p className="mb-4">
                {lang === 'de' 
                  ? 'Diese Website wird bei Vercel Inc. gehostet. Vercel verarbeitet Daten gemäß ihrer Datenschutzrichtlinie:' 
                  : 'This website is hosted by Vercel Inc. Vercel processes data according to their privacy policy:'}
                <a 
                  href="https://vercel.com/legal/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Vercel Privacy Policy
                </a>
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                7. {lang === 'de' ? 'Änderungen dieser Datenschutzerklärung' : 'Changes to this Privacy Policy'}
              </h2>
              <p>
                {lang === 'de' 
                  ? 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.' 
                  : 'We reserve the right to adapt this privacy policy to ensure it always complies with current legal requirements or to implement changes to our services in the privacy policy.'}
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-4">
              {lang === 'de' ? 'Stand' : 'Last updated'}: April 2026
            </p>
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
