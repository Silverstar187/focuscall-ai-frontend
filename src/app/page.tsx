"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Mail, 
  ArrowRight, 
  Target, 
  Wallet, 
  Moon, 
  CalendarDays,
  CheckCircle2,
  Loader2
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════════
           SECTION 1: HERO
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 pt-24 pb-16 lg:px-12 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] -right-[20%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-6">
            <Brain className="mr-1 h-3 w-3" />
            Für Erwachsene mit ADHS im DACH-Raum
          </Badge>

          <h1 className="mb-8 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Seit Monaten wartest du auf Hilfe.
            <br />
            <span className="text-primary">Dein Kopf wartet nicht.</span>
          </h1>

          <div className="mb-10 max-w-2xl space-y-6">
            <p className="text-xl font-medium text-foreground leading-relaxed">
              Tausend Gedanken, mit tausend Untergedanken.
            </p>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="h-px flex-1 bg-border"></span>
              <span className="text-sm">●</span>
              <span className="h-px flex-1 bg-border"></span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Eigentlich weißt du was du tun müsstest aber du machst es irgendwie trotzdem nicht.
            </p>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed pt-4">
              <p>
                Nicht weil du faul bist. Nicht weil du es nicht willst. 
                Sondern weil dir niemand zeigt, wie dein Kopf wirklich funktioniert.
              </p>
              
              <p>
                Therapieplatz? 6 bis 12 Monate. Und bis dahin kämpfst du allein. 
                Gegen das Chaos. Gegen die Scham. 
                Gegen das Gefühl, dass alle anderen es hinkriegen — nur du nicht.
              </p>
            </div>
            
            <p className="text-lg font-semibold text-foreground pt-4 border-t border-border/50">
              FocusCall ist der Coach, der jetzt da ist. Nicht irgendwann. Jetzt.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById('cta')?.scrollIntoView({behavior: 'smooth'})}>
              Early Access sichern
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Wie es funktioniert
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <div className="text-2xl font-bold text-primary">6–12 Mo.</div>
              <div className="text-sm text-muted-foreground">Wartezeit auf ADHS-Coaching in DE</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">80–150 €</div>
              <div className="text-sm text-muted-foreground">pro Stunde bei Privat-Coaches</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">FocusCall ist immer da</div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 2: PROBLEM & AUDIENCE
           ═══════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-destructive">
            Das kennst du
          </p>
          <div className="mb-12 relative max-w-2xl">
            <Loader2 className="absolute right-4 top-1/2 h-48 w-48 -translate-y-1/2 animate-spin text-primary/[0.08]" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl relative z-10">
              Dein Kopf hat 47 Tabs offen. Keiner davon lädt fertig.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Montag, 09:12 Uhr
                </p>
                <h3 className="mb-3 font-semibold text-lg">
                  Die To-Do-Liste, die dich lähmt
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du sitzt vor deinem Laptop. Du weißt, was du tun solltest. Aber dein Gehirn 
                  springt zwischen 5 Aufgaben hin und her — und am Ende des Vormittags hast 
                  du keine einzige angefangen. Nicht weil du faul bist. Weil dein Gehirn anders priorisiert.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Mittwoch, 15:30 Uhr
                </p>
                <h3 className="mb-3 font-semibold text-lg">
                  Der Termin, den du vergessen hast
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dein Steuerberater hat angerufen. Zum dritten Mal. Die Unterlagen fehlen seit 
                  zwei Wochen. Du hattest es dir vorgenommen — wirklich. Aber irgendwo zwischen 
                  dem Hyperfokus auf ein Nebenprojekt und dem spontanen Impuls, die Küche umzuräumen, 
                  ist es verschwunden.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Mittwoch, 23:45 Uhr
                </p>
                <h3 className="mb-3 font-semibold text-lg">
                  Die Nacht, in der alles klar wird
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Jetzt, wo du schlafen solltest, ist dein Gehirn hellwach. Du machst Pläne. 
                  Schreibst Listen. Dieses Mal wird alles anders. Morgen früh ist die Energie weg, 
                  die Liste vergessen, und der Kreislauf beginnt von vorn.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 3: SOLUTION
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-16 lg:px-12 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Die Lösung
          </p>
          <h2 className="mb-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Kein weiterer Ratgeber. Ein Coach, der dein Gehirn versteht.
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            FocusCall kombiniert echtes Expertenwissen von verifizierten ADHS-Coaches mit einem 
            AI-Agenten, der deine Muster lernt, deine Tage strukturiert und dich dort abholt, 
            wo du gerade feststeckst.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative">
              <span className="absolute -right-2 -top-4 text-6xl font-bold text-primary/10">01</span>
              <h3 className="mb-3 font-semibold text-xl">Sag, was dich gerade blockiert</h3>
              <p className="text-muted-foreground">
                Per Voice oder Chat — beschreib einfach, wie es dir gerade geht. 
                &quot;Ich hab 10 Sachen zu tun und kann mit keiner anfangen.&quot; 
                Dein Coach versteht den Kontext.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -right-2 -top-4 text-6xl font-bold text-primary/10">02</span>
              <h3 className="mb-3 font-semibold text-xl">Bekomm eine Strategie, die passt</h3>
              <p className="text-muted-foreground">
                Keine generischen Produktivitäts-Hacks. Methoden von echten ADHS-Coaches, 
                angepasst an deine Situation. Dein Coach kennt deine Muster und weiß, 
                was bei dir funktioniert.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -right-2 -top-4 text-6xl font-bold text-primary/10">03</span>
              <h3 className="mb-3 font-semibold text-xl">Setz es um — mit Begleitung</h3>
              <p className="text-muted-foreground">
                25 Minuten Fokus-Sprint. Check-in danach. Erinnerung vor dem nächsten Termin. 
                Dein Coach bleibt dran, auch wenn dein Gehirn längst zum nächsten Thema gesprungen ist.
              </p>
            </div>
          </div>

          {/* Methoden-Module Sub-Section */}
          <div className="mt-16 rounded-2xl border bg-muted/30 p-8 lg:p-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Coaching-Module
            </p>
            <h3 className="mb-4 text-2xl font-bold">
              Echtes Expertenwissen, nicht ChatGPT-Sprüche.
            </h3>
            <p className="mb-8 max-w-3xl text-muted-foreground">
              Coaching-Module sind Wissens-Pakete von echten ADHS-Coaches. Jedes Modul enthält 
              erprobte Methoden, Strategien und Denkmodelle eines Experten — und macht deinen 
              AI-Coach schlauer. Du wählst, was zu deinen Herausforderungen passt.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Target, title: "Fokus-Starter", author: "ADHS-Coach", desc: "Techniken für den Einstieg in schwierige Aufgaben." },
                { icon: Wallet, title: "Finanzen & ADHS", author: "Finanz-Coach", desc: "Systeme für Rechnungen, Steuern, Budgets." },
                { icon: Moon, title: "Schlaf-Routinen", author: "Schlaf-Expertin", desc: "Das Gehirn abschalten, wenn es nicht will." },
                { icon: CalendarDays, title: "Alltags-Struktur", author: "Verhaltens-Coach", desc: "Morgen-Routinen, Wochen-Planung, Transitions." },
              ].map((module, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <module.icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 font-semibold">{module.title}</h4>
                    <p className="mb-2 text-xs text-muted-foreground">{module.author}</p>
                    <p className="text-sm text-muted-foreground">{module.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 4: CALL TO ACTION
           ═══════════════════════════════════════════════════════════════ */}
      <section id="cta" className="relative px-6 py-16 lg:px-12 lg:py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-t from-primary/10 via-primary/5 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Dein Gehirn verdient Unterstützung, die{" "}
            <span className="text-primary">jetzt</span> da ist.
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Wir starten bald in Deutschland, Österreich und der Schweiz. 
            Sichere dir Early Access — die ersten 200 bekommen 30 Tage kostenlos.
          </p>

          <Card className="mx-auto max-w-md">
            <CardContent className="p-6">
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Du bist auf der Liste!</h3>
                  <p className="text-muted-foreground">
                    Wir benachrichtigen dich, sobald FocusCall live geht.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Trag dich ein und sei unter den Ersten:
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="deine@email.de"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-label="E-Mail-Adresse"
                      />
                    </div>
                    <Button type="submit" className="gap-2">
                      Platz sichern
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Kein Spam. Eine E-Mail wenn wir starten. Jederzeit abmeldbar.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
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
            Dein persönlicher ADHS-Coach — immer verfügbar
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
