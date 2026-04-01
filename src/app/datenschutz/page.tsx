import { Brain } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Datenschutz | FocusCall",
  description: "Datenschutzerklärung von FocusCall - Dein persönlicher ADHS-Coach",
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-6 py-4 lg:px-12">
        <a href="/" className="mx-auto flex max-w-6xl items-center gap-2 hover:opacity-80 transition-opacity">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">FocusCall</span>
        </a>
      </header>

      {/* Content */}
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="mb-2 font-medium text-foreground">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, 
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese 
                Website besuchen. Personenbezogene Daten sind alle Daten, mit 
                denen Sie persönlich identifiziert werden können.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                2. Verantwortlicher
              </h2>
              <p className="space-y-1">
                <strong className="text-foreground">focuscall UG (haftungsbeschränkt)</strong>
                <br />
                Geschäftsführer: Oliver Maximilian Spitzkat
                <br />
                Am Lindenbusch 22 a
                <br />
                50354 Hürth
                <br />
                Deutschland
                <br /><br />
                E-Mail: support@focuscall.ai
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                3. Datenerfassung auf dieser Website
              </h2>
              
              <h3 className="mb-2 mt-4 font-medium text-foreground">Wie erfassen wir Ihre Daten?</h3>
              <p className="mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
                Hierbei kann es sich z. B. um Daten handeln, die Sie in ein 
                Kontaktformular eingeben.
              </p>

              <h3 className="mb-2 font-medium text-foreground">Welche Daten erfassen wir?</h3>
              <ul className="mb-4 list-disc pl-5 space-y-1">
                <li>E-Mail-Adresse (bei Anmeldung zum Early Access)</li>
                <li>Nutzungsdaten (anonymisiert, zur Verbesserung des Services)</li>
              </ul>

              <h3 className="mb-2 font-medium text-foreground">Wofür nutzen wir Ihre Daten?</h3>
              <p className="mb-4">
                Die Daten werden ausschließlich zur Benachrichtigung über den 
                Produktlaunch und für den Betrieb des FocusCall-Dienstes verwendet.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                4. Speicherdauer
              </h2>
              <p>
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie es 
                für die Erreichung der Zwecke, für die sie erhoben wurden, erforderlich 
                ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                5. Ihre Rechte
              </h2>
              <p className="mb-4">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="mb-4 list-disc pl-5 space-y-1">
                <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
                <li>Berichtigung unrichtiger Daten zu verlangen</li>
                <li>Löschung Ihrer Daten zu verlangen</li>
                <li>Einschränkung der Verarbeitung zu verlangen</li>
                <li>Widerspruch gegen die Verarbeitung einzulegen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>
              <p>
                Kontaktieren Sie uns hierzu unter: support@focuscall.ai
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                6. Hosting
              </h2>
              <p className="mb-4">
                Diese Website wird bei Vercel Inc. gehostet. 
                Vercel verarbeitet Daten gemäß ihrer Datenschutzrichtlinie: 
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
                7. Änderungen dieser Datenschutzerklärung
              </h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, 
                damit sie stets den aktuellen rechtlichen Anforderungen entspricht 
                oder um Änderungen unserer Leistungen in der Datenschutzerklärung 
                umzusetzen.
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-4">
              Stand: April 2026
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
            © {new Date().getFullYear()} focuscall UG. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="/impressum" className="hover:text-foreground transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
