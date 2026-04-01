"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Layers, Mail, ArrowRight, Sparkles, Clock } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen bg-[#faf9f7] text-[#1a1a1a] overflow-hidden font-sans">
      {/* Warm, organic background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#e8d5c4]/40 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#d4e4d1]/40 blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#f5e6d3]/30 blur-[80px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2d5a4a] shadow-lg shadow-[#2d5a4a]/20">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Focusmate</span>
        </div>
        <Button 
          variant="outline" 
          className="rounded-full border-[#2d5a4a]/20 bg-white/50 backdrop-blur-sm hover:bg-[#2d5a4a] hover:text-white transition-all"
        >
          Für Coaches
        </Button>
      </nav>

      {/* Hero */}
      <main className="relative z-10">
        <section className="px-6 pt-8 pb-16 lg:px-12 lg:pt-12 lg:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#2d5a4a]/10 px-4 py-2 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#e07a5f] animate-pulse" />
              <span className="text-sm font-medium text-[#5a5a5a]">
                Coming Soon — DACH Region
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-5xl font-black tracking-tight leading-[1.1] sm:text-6xl md:text-7xl">
              Dein persönlicher
              <br />
              <span className="text-[#2d5a4a]">ADHD Coach</span>
              <br />
              <span className="text-[#5a5a5a]">— immer da</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-8 max-w-xl text-lg text-[#5a5a5a] leading-relaxed">
              Monatelang auf professionelle Hilfe warten? Unser AI-Agent versteht 
              dein Gehirn und begleitet dich täglich mit echten Methoden 
              verifizierter Coaches.
            </p>

            {/* Pain points - playful pills */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {["Struktur", "Fokus", "Follow-through", "Finanzen", "Work-Life"].map((tag, i) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white border border-[#2d5a4a]/10 px-4 py-1.5 text-sm font-medium text-[#2d5a4a] shadow-sm"
                  style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Email Signup */}
            <Card className="mx-auto max-w-md bg-white/90 backdrop-blur-xl border-[#2d5a4a]/10 shadow-xl shadow-[#2d5a4a]/5">
              <CardContent className="p-6">
                <p className="mb-4 text-sm font-medium text-[#5a5a5a]">
                  Sei unter den Ersten:
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a5a5a]" />
                    <Input
                      type="email"
                      placeholder="deine@email.de"
                      className="pl-10 rounded-full border-[#2d5a4a]/20 bg-[#faf9f7] focus:border-[#2d5a4a] focus:ring-[#2d5a4a]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button className="rounded-full bg-[#2d5a4a] hover:bg-[#1e3d32] text-white gap-2 px-6">
                    Eintragen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cassettes Visual */}
        <section className="px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-3">So funktioniert&apos;s</h2>
              <p className="text-[#5a5a5a]">Keine generischen Tipps. Echte Expertise.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {/* Step 1 */}
              <div className="relative group">
                <div className="rounded-3xl bg-white border border-[#2d5a4a]/10 p-6 shadow-lg shadow-[#2d5a4a]/5 hover:shadow-xl hover:shadow-[#2d5a4a]/10 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-[#e8d5c4] flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#8b6239]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">1. Coaches erstellen</h3>
                  <p className="text-sm text-[#5a5a5a]">
                    Verifizierte ADHD-Experten verpacken ihre bewährten Methoden
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="rounded-3xl bg-white border border-[#2d5a4a]/10 p-6 shadow-lg shadow-[#2d5a4a]/5 hover:shadow-xl hover:shadow-[#2d5a4a]/10 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4e4d1] flex items-center justify-center mb-4">
                    <Layers className="h-6 w-6 text-[#2d5a4a]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">2. Cassettes laden</h3>
                  <p className="text-sm text-[#5a5a5a]">
                    Wähle die Methoden die zu deinen Herausforderungen passen
                  </p>
                </div>
                {/* Arrow */}
                <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-[#2d5a4a]/30" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="rounded-3xl bg-white border border-[#2d5a4a]/10 p-6 shadow-lg shadow-[#2d5a4a]/5 hover:shadow-xl hover:shadow-[#2d5a4a]/10 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5e6d3] flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-[#e07a5f]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">3. Dein AI-Coach</h3>
                  <p className="text-sm text-[#5a5a5a]">
                    24/7 verfügbar, personalisiert, basierend auf echter Expertise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Coaches */}
        <section className="px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#2d5a4a] p-8 sm:p-12 text-white">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <Badge className="bg-white/20 text-white border-0 mb-4">
                  Für Coaches
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Skaliere deine Expertise
                </h2>
                <p className="text-white/80 mb-6">
                  Du hilfst Menschen mit ADHD, aber deine Zeit ist begrengt? 
                  Verpacke deine Methoden als Cassettes.
                </p>
                <ul className="space-y-3">
                  {[
                    "Erstelle einmal, verkaufe unendlich",
                    "Neue Einnahmequelle ohne Zeit-Tradeoff",
                    "Verifizierter Coach-Status"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#e8d5c4]" />
                  <div>
                    <p className="font-semibold">Dr. Anna Schmidt</p>
                    <p className="text-xs text-white/60">ADHD Coach</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="font-medium text-sm">Fokus-Master Cassette</p>
                    <p className="text-xs text-white/60">328 aktive Nutzer</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="font-medium text-sm">Time-Blocking Methode</p>
                    <p className="text-xs text-white/60">156 aktive Nutzer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-12 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "1,200+", label: "Warteliste" },
                { value: "45", label: "Coaches" },
                { value: "6-9", label: "Monate Wartezeit" },
                { value: "0", label: "Wartezeit bei uns" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-[#2d5a4a]">
                    {stat.value}
                  </div>
                  <p className="text-xs text-[#5a5a5a] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 lg:px-12 border-t border-[#2d5a4a]/10">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#2d5a4a]" />
              <span className="font-bold">Focusmate</span>
            </div>
            <p className="text-xs text-[#5a5a5a]">
              Für Selbstständige & Profis in Deutschland, Österreich, Schweiz
            </p>
            <div className="flex gap-4 text-xs text-[#5a5a5a]">
              <a href="#" className="hover:text-[#2d5a4a]">Impressum</a>
              <a href="#" className="hover:text-[#2d5a4a]">Datenschutz</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
