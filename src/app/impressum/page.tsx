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
        <a href="/" className="mx-auto flex max-w-6xl items-center gap-2 hover:opacity-80 transition-opacity">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">FocusCall</span>
        </a>
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
                Handelsregister
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
                Vertreten durch
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
                Kontakt
              </h2>
              <p className="space-y-1">
                E-Mail: support@focuscall.ai
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
                wird nachgereicht
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                <br /><br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Haftung für Inhalte
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
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
