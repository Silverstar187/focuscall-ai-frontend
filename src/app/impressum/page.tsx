import { Brain } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Impressum | FocusCall",
  description: "Impressum von FocusCall - Dein persönlicher ADHS-Coach",
};

export default function Impressum() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-6 py-4 lg:px-12">
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">FocusCall</span>
        </div>
      </header>

      {/* Content */}
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
            Impressum
          </h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="space-y-1">
                <strong className="text-foreground">FocusCall</strong>
                <br />
                Inhaber: Max Mustermann
                <br />
                Musterstraße 123
                <br />
                12345 Berlin
                <br />
                Deutschland
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Kontakt
              </h2>
              <p className="space-y-1">
                E-Mail: hello@focuscall.ai
                <br />
                Telefon: +49 (0) 123 456789
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                <br />
                DE123456789
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p>
                Max Mustermann
                <br />
                Musterstraße 123
                <br />
                12345 Berlin
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Hinweis
              </h2>
              <p>
                FocusCall befindet sich aktuell in der Entwicklungsphase. 
                Die angegebenen Kontaktdaten dienen vorläufigen Anfragen. 
                Ein vollständiges Impressum wird vor dem offiziellen Launch veröffentlicht.
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
            © {new Date().getFullYear()} FocusCall. Alle Rechte vorbehalten.
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
