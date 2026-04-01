"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Particles } from "@/components/ui/particles";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { Sparkles, Mail, ArrowRight, Bell } from "lucide-react";

export function ComingSoonHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Magic UI Particles Background - subtle */}
      <Particles
        className="absolute inset-0"
        quantity={60}
        ease={100}
        color="#000000"
        staticity={40}
        refresh={false}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-5 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">FocusCall</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </nav>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <Badge
            variant="outline"
            className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700"
          >
            <Bell className="mr-1 h-3 w-3" />
            Coming Soon — DACH Region
          </Badge>

          {/* Main Headline with animation */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Dein persönlicher
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              ADHD Coach
            </span>
          </h1>

          <p className="mb-10 max-w-2xl text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Monatelange Wartezeiten auf professionelle Unterstützung? 
            Unser AI-Agent versteht dein ADHD-Gehirn und begleitet dich täglich.
          </p>

          {/* Email Signup Card */}
          <Card className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <CardContent className="p-6">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Du bist auf der Liste!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Wir benachrichtigen dich beim Launch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Sei unter den Ersten — Early Access sichern:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="deine@email.de"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="gap-2">
                      Eintragen
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Kein Spam. Jederzeit abmeldbar.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Stats with Number Ticker */}
          <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                <NumberTicker value={1200} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Warteliste</p>
            </div>
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[800ms]">
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                <NumberTicker value={45} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Coaches</p>
            </div>
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[900ms]">
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                6-<NumberTicker value={9} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Monate Wartezeit</p>
            </div>
          </div>
        </section>

        {/* Marquee Footer */}
        <div className="border-y border-border/50 bg-muted/30 py-4">
          <Marquee pauseOnHover className="[--duration:20s]">
            {["Fokus", "Struktur", "Follow-through", "Finanzen", "Work-Life", "Selbstständig", "DACH Region"].map((tag) => (
              <span
                key={tag}
                className="mx-4 text-sm font-medium text-muted-foreground/60"
              >
                {tag}
              </span>
            ))}
          </Marquee>
        </div>

        {/* Footer */}
        <footer className="px-6 py-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">FocusCall</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Für Selbstständige & Profis in Deutschland, Österreich, Schweiz
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Impressum
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Datenschutz
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
