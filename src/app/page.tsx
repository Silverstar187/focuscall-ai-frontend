"use client";

import { useState, useRef, useEffect } from "react";
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

// Übersetzungen
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const translations = {
  de: {
    badge: "Für Erwachsene mit ADHS im DACH-Raum",
    headline1: "Seit Monaten wartest du auf Hilfe.",
    headline2: "Dein Kopf wartet nicht.",
    subheadline: "Tausend Gedanken, mit tausend Untergedanken.",
    paragraph1: "Eigentlich weißt du was du tun müsstest aber du machst es irgendwie trotzdem nicht.",
    paragraph2: "Nicht weil du faul bist. Nicht weil du es nicht willst. Sondern weil dir niemand zeigt, wie dein Kopf wirklich funktioniert.",
    paragraph3: "Therapieplatz? 6 bis 12 Monate. Und bis dahin kämpfst du allein. Gegen das Chaos. Gegen die Scham. Gegen das Gefühl, dass alle anderen es hinkriegen — nur du nicht.",
    paragraph4: "FocusCall ist der Coach, der jetzt da ist. Nicht irgendwann. Jetzt.",
    ctaPrimary: "Early Access sichern",
    ctaSecondary: "Wie es funktioniert",
    stat1Value: "6–12 Mo.",
    stat1Label: "Wartezeit auf ADHS-Coaching in DE",
    stat2Value: "80–150 €",
    stat2Label: "pro Stunde bei Privat-Coaches",
    stat3Value: "24/7",
    stat3Label: "FocusCall ist immer da",
    problemTitle: "Das kennst du",
    problemHeadline: "Dein Kopf hat 47 Tabs offen. Keiner davon lädt fertig.",
    card1Time: "Montag, 09:12 Uhr",
    card1Title: "Du ignorierst deine To-Do-Liste",
    card1Text: "Und sie ignoriert dich. Du sitzt vor deinem Laptop. Du weißt, was du tun müsstest. Aber dein Gehirn springt zwischen 5 Aufgaben hin und her. Nicht weil du faul bist. Weil dein Gehirn anders priorisiert.",
    card2Time: "Mittwoch, 15:30 Uhr",
    card2Title: "Der Termin, den du vergessen hast",
    card2Text: "Dein Steuerberater hat angerufen. Zum dritten Mal. Die Unterlagen fehlen seit zwei Monaten. Falsch: Jahren! Das Finanzamt schreibt. Du hattest es dir vorgenommen — wirklich. Aber irgendwo zwischen dem Hyperfokus auf ein Nebenprojekt und dem spontanen Impuls, die Küche umzuräumen, ist es verschwunden.",
    card3Time: "Mittwoch, 23:45 Uhr",
    card3Title: "Die Nacht, in der alles klar wird",
    card3Text: "Jetzt, wo du schlafen solltest, ist dein Gehirn hellwach. Du machst Pläne. Schreibst Listen. Dieses Mal wird alles anders. Morgen früh ist die Energie weg, die Liste vergessen, und der Kreislauf beginnt von vorn.",
    solutionTitle: "Die Lösung",
    solutionHeadline: "Kein weiterer Ratgeber. Ein Coach, der dein Gehirn versteht.",
    solutionText: "FocusCall kombiniert echtes Expertenwissen von verifizierten ADHS-Coaches mit einem AI-Agenten, der deine Muster lernt, deine Tage strukturiert und dich dort abholt, wo du gerade feststeckst.",
    step1Title: "Sag, was dich gerade blockiert",
    step1Text: "Per Voice oder Chat — beschreib einfach, wie es dir gerade geht. \"Ich hab 10 Sachen zu tun und kann mit keiner anfangen.\" Dein Coach versteht den Kontext.",
    step2Title: "Bekomm eine Strategie, die passt",
    step2Text: "Keine generischen Produktivitäts-Hacks. Methoden von echten ADHS-Coaches, angepasst an deine Situation. Dein Coach kennt deine Muster und weiß, was bei dir funktioniert.",
    step3Title: "Setz es um — mit Begleitung",
    step3Text: "25 Minuten Fokus-Sprint. Check-in Call danach. Erinnerung vor dem nächsten Termin. Dein Coach bleibt dran, auch wenn dein Gehirn längst zum nächsten Thema gesprungen ist.",
    modulesTitle: "Coaching-Module",
    modulesHeadline: "Echtes Expertenwissen, nicht ChatGPT-Sprüche.",
    modulesText: "Coaching-Module sind Wissens-Pakete von echten ADHS-Coaches. Jedes Modul enthält erprobte Methoden, Strategien und Denkmodelle eines Experten — und macht deinen AI-Coach schlauer. Du wählst, was zu deinen Herausforderungen passt.",
    module1Title: "Fokus-Starter",
    module1Author: "ADHS-Coach",
    module1Desc: "Techniken für den Einstieg in schwierige Aufgaben.",
    module2Title: "Finanzen & ADHS",
    module2Author: "Finanz-Coach",
    module2Desc: "Systeme für Rechnungen, Steuern, Budgets.",
    module3Title: "Schlaf-Routinen",
    module3Author: "Schlaf-Expertin",
    module3Desc: "Das Gehirn abschalten, wenn es nicht will.",
    module4Title: "Alltags-Struktur",
    module4Author: "Verhaltens-Coach",
    module4Desc: "Morgen-Routinen, Wochen-Planung, Transitions.",
    finalHeadline: "Dein Gehirn verdient Unterstützung, die jetzt da ist.",
    finalText: "Wir starten bald in Deutschland, Österreich und der Schweiz. Sichere dir Early Access — die ersten 200 bekommen 30 Tage kostenlos.",
    formSuccessTitle: "Du bist auf der Liste!",
    formSuccessText: "Wir benachrichtigen dich, sobald FocusCall live geht.",
    formLabel: "Trag dich ein und sei unter den Ersten:",
    formPlaceholder: "deine@email.de",
    formSubmit: "Platz sichern",
    formPrivacy: "Kein Spam. Eine E-Mail wenn wir starten. Jederzeit abmeldbar.",
    footerTagline: "Dein persönlicher ADHS-Coach — immer verfügbar"
  },
  en: {
    badge: "For adults with ADHD in the DACH region",
    headline1: "You've been waiting months for help.",
    headline2: "Your brain won't wait.",
    subheadline: "A thousand thoughts, with a thousand sub-thoughts.",
    paragraph1: "You actually know what you should do, but somehow you just don't do it.",
    paragraph2: "Not because you're lazy. Not because you don't want to. But because nobody shows you how your brain really works.",
    paragraph3: "Therapy spot? 6 to 12 months. Until then, you fight alone. Against the chaos. Against the shame. Against the feeling that everyone else gets it — except you.",
    paragraph4: "FocusCall is the coach that's here now. Not someday. Now.",
    ctaPrimary: "Get Early Access",
    ctaSecondary: "How it works",
    stat1Value: "6–12 Mo.",
    stat1Label: "Wait time for ADHD coaching",
    stat2Value: "€80–150",
    stat2Label: "per hour with private coaches",
    stat3Value: "24/7",
    stat3Label: "FocusCall is always there",
    problemTitle: "You know this",
    problemHeadline: "Your brain has 47 tabs open. None of them finish loading.",
    card1Time: "Monday, 09:12 AM",
    card1Title: "You ignore your to-do list",
    card1Text: "And it ignores you. You sit in front of your laptop. You know what you should do. But your brain jumps between 5 tasks. Not because you're lazy. Because your brain prioritizes differently.",
    card2Time: "Wednesday, 3:30 PM",
    card2Title: "The appointment you forgot",
    card2Text: "Your tax advisor called. For the third time. The documents are missing for two months. Wrong: years! The tax office is writing. You really meant to do it — honestly. But somewhere between hyperfocusing on a side project and the spontaneous impulse to rearrange the kitchen, it disappeared.",
    card3Time: "Wednesday, 11:45 PM",
    card3Title: "The night when everything becomes clear",
    card3Text: "Now, when you should sleep, your brain is wide awake. You make plans. Write lists. This time everything will be different. Tomorrow morning the energy is gone, the list forgotten, and the cycle starts all over again.",
    solutionTitle: "The Solution",
    solutionHeadline: "Not another guide. A coach that understands your brain.",
    solutionText: "FocusCall combines real expert knowledge from verified ADHD coaches with an AI agent that learns your patterns, structures your days, and picks you up where you're stuck.",
    step1Title: "Say what's blocking you",
    step1Text: "Via voice or chat — just describe how you're feeling right now. \"I have 10 things to do and can't start any of them.\" Your coach understands the context.",
    step2Title: "Get a strategy that fits",
    step2Text: "No generic productivity hacks. Methods from real ADHD coaches, adapted to your situation. Your coach knows your patterns and knows what works for you.",
    step3Title: "Make it happen — with support",
    step3Text: "25-minute focus sprint. Check-in call afterwards. Reminder before the next appointment. Your coach stays with you, even when your brain has already jumped to the next topic.",
    modulesTitle: "Coaching Modules",
    modulesHeadline: "Real expert knowledge, not ChatGPT phrases.",
    modulesText: "Coaching modules are knowledge packages from real ADHD coaches. Each module contains proven methods, strategies, and mental models from an expert — and makes your AI coach smarter. You choose what fits your challenges.",
    module1Title: "Focus Starter",
    module1Author: "ADHD Coach",
    module1Desc: "Techniques for getting started on difficult tasks.",
    module2Title: "Finances & ADHD",
    module2Author: "Finance Coach",
    module2Desc: "Systems for invoices, taxes, budgets.",
    module3Title: "Sleep Routines",
    module3Author: "Sleep Expert",
    module3Desc: "Turning off the brain when it doesn't want to.",
    module4Title: "Daily Structure",
    module4Author: "Behavior Coach",
    module4Desc: "Morning routines, weekly planning, transitions.",
    finalHeadline: "Your brain deserves support that's here now.",
    finalText: "We're launching soon in Germany, Austria, and Switzerland. Secure your Early Access — the first 200 get 30 days free.",
    formSuccessTitle: "You're on the list!",
    formSuccessText: "We'll notify you as soon as FocusCall goes live.",
    formLabel: "Sign up and be among the first:",
    formPlaceholder: "you@email.com",
    formSubmit: "Secure your spot",
    formPrivacy: "No spam. One email when we launch. Unsubscribe anytime.",
    footerTagline: "Your personal ADHD coach — always available"
  }
};

export default function Home() {
  const [lang, setLang] = useState<"de" | "en">("de");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const [problemHighlighted, setProblemHighlighted] = useState(false);
  const [activeKw, setActiveKw] = useState(0);
  const activeKwRef = useRef(0);

  const t = translations[lang];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.0;
      video.defaultPlaybackRate = 1.0;
      const handleLoaded = () => {
        video.playbackRate = 1.0;
      };
      video.addEventListener('loadedmetadata', handleLoaded);
      return () => video.removeEventListener('loadedmetadata', handleLoaded);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setProblemHighlighted(true); },
      { threshold: 0.3 }
    );
    if (problemRef.current) observer.observe(problemRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      const el = solutionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wH = window.innerHeight;
      const rawProgress = Math.min(1, Math.max(0, (wH * 0.7 - rect.top) / (wH * 0.5)));
      const progress = Math.max(0, Math.min(1, (rawProgress - 0.3) / 0.7));
      const target = Math.round(progress * 24);
      if (t) clearTimeout(t);
      if (target < activeKwRef.current) {
        activeKwRef.current = target;
        setActiveKw(target);
      } else {
        activeKwRef.current = target;
        setActiveKw(target);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { if (t) clearTimeout(t); window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const spinner = spinnerRef.current;
      const solution = solutionRef.current;
      if (!spinner || !solution) return;
      const rect = solution.getBoundingClientRect();
      const windowH = window.innerHeight;
      const spinnerProgress = Math.min(1, Math.max(0, (windowH - rect.top) / windowH));
      if (spinnerProgress >= 1) {
        spinner.style.animationPlayState = 'paused';
      } else {
        spinner.style.animationPlayState = 'running';
        spinner.style.animationDuration = `${3 + spinnerProgress * 17}s`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const kw = (index: number): React.CSSProperties => {
    const active = activeKw >= index;
    return {
      display: 'inline',
      color: active ? '#ef4444' : 'inherit',
      textShadow: active ? '0 0 6px rgba(239,68,68,0.2)' : '0 0 0px transparent',
      transition: 'color 0.2s ease, text-shadow 0.2s ease',
    };
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      }
    } catch (error) {
      alert('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Header mit Language Toggle */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">FocusCall</span>
          </div>
          <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full p-1 border">
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

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 1: HERO
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 pt-32 pb-16 lg:px-12 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover opacity-[0.08]"
            style={{ height: '50%', objectPosition: 'top' }}
          >
            <source src="/video-bg.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] -right-[20%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-6">
            <Brain className="mr-1 h-3 w-3" />
            {t.badge}
          </Badge>

          <h1 className="mb-8 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ textShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff, 0 0 64px #fff, 0 0 128px #fff, 0 0 256px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff' }}>
            {t.headline1}
            <br />
            <span className="text-primary">{t.headline2}</span>
          </h1>

          <div className="mb-10 max-w-2xl space-y-6">
            <p className="text-xl font-medium text-foreground leading-relaxed" style={{ textShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff, 0 0 64px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff' }}>
              {t.subheadline}
            </p>
            
            <p className="text-muted-foreground leading-relaxed" style={{ textShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff, 0 0 64px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff' }}>
              {t.paragraph1}
            </p>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed pt-4">
              <p style={{ textShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff, 0 0 64px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff' }}>
                {t.paragraph2}
              </p>

              <p style={{ textShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff, 0 0 64px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff' }}>
                {t.paragraph3}
              </p>
            </div>
            
            <p className="text-lg font-semibold text-foreground pt-4 border-t border-border/50" style={{ textShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff, 0 0 64px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff' }}>
              {t.paragraph4}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById('cta')?.scrollIntoView({behavior: 'smooth'})}>
              {t.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('problem')?.scrollIntoView({behavior: 'smooth'})}>
              {t.ctaSecondary}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <div className="text-2xl font-bold text-primary line-through decoration-red-500">{t.stat1Value}</div>
              <div className="text-sm text-foreground line-through decoration-red-500">{t.stat1Label}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary line-through decoration-red-500">{t.stat2Value}</div>
              <div className="text-sm text-foreground line-through decoration-red-500">{t.stat2Label}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{t.stat3Value}</div>
              <div className="text-sm text-muted-foreground">{t.stat3Label}</div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 2: PROBLEM & AUDIENCE
           ═══════════════════════════════════════════════════════════════ */}
      <section id="problem" ref={problemRef} className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-destructive">
            {t.problemTitle}
          </p>
          <div className="mb-12 relative max-w-2xl">
            <Loader2 ref={spinnerRef} className="absolute right-4 top-1/2 h-48 w-48 -translate-y-1/2 text-primary/[0.08] animate-spin" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl relative z-10">
              {lang === 'de' ? 'Dein Kopf hat ' : 'Your brain has '}
              <span style={{
                color: problemHighlighted ? '#ef4444' : undefined,
                textShadow: problemHighlighted ? '0 0 6px rgba(239,68,68,0.2)' : '0 0 0px transparent',
                transition: 'color 0.2s ease, text-shadow 0.2s ease',
              }}>47 Tabs</span>
              {lang === 'de' ? ' offen. Keiner davon lädt fertig.' : ' open. None of them finish loading.'}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.card1Time}
                </p>
                <h3 className="mb-3 font-semibold text-lg">
                  {t.card1Title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.card1Text}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.card2Time}
                </p>
                <h3 className="mb-3 font-semibold text-lg">
                  {t.card2Title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.card2Text}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.card3Time}
                </p>
                <h3 className="mb-3 font-semibold text-lg">
                  {t.card3Title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.card3Text}
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
      <section ref={solutionRef} className="relative px-6 py-16 lg:px-12 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            {t.solutionTitle}
          </p>
          <h2 className="mb-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {lang === 'de' ? 'Kein weiterer Ratgeber. Ein ' : 'Not another guide. A '}
            <span style={kw(1)}>{lang === 'de' ? 'Coach' : 'coach'}</span>
            {lang === 'de' ? ', der dein ' : ' that understands your '}
            <span style={kw(2)}>{lang === 'de' ? 'Gehirn' : 'brain'}</span>{' '}
            <span style={kw(3)}>{lang === 'de' ? 'versteht' : ''}</span>
            {lang === 'en' ? '.' : '.'}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            {lang === 'de' ? 'FocusCall kombiniert echtes ' : 'FocusCall combines real '}
            <span style={kw(4)}>{lang === 'de' ? 'Expertenwissen' : 'expert knowledge'}</span>{' '}
            <span style={kw(5)}>{lang === 'de' ? 'von' : 'from'}</span>{' '}
            <span style={kw(6)}>{lang === 'de' ? 'verifizierten' : 'verified'}</span>{' '}
            <span style={kw(7)}>{lang === 'de' ? 'ADHS-Coaches' : 'ADHD coaches'}</span>{' '}
            {lang === 'de' ? 'mit einem ' : 'with an '}
            <span style={kw(8)}>{lang === 'de' ? 'AI-Agenten' : 'AI agent'}</span>
            {lang === 'de' ? ', der deine ' : ' that learns your '}
            <span style={kw(9)}>{lang === 'de' ? 'Muster' : 'patterns'}</span>{' '}
            <span style={kw(10)}>{lang === 'de' ? 'lernt' : ''}</span>
            {lang === 'de' ? ', deine Tage strukturiert und dich dort abholt, wo du gerade feststeckst.' : ', structures your days, and picks you up where you\'re stuck.'}
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative">
              <span className="absolute -right-2 -top-4 text-6xl font-bold text-primary/10">01</span>
              <h3 className="mb-3 font-semibold text-xl">{t.step1Title}</h3>
              <p className="text-muted-foreground">
                {lang === 'de' ? 'Per ' : 'Via '}
                <span style={kw(11)}>{lang === 'de' ? 'Voice' : 'voice'}</span>
                {lang === 'de' ? ' oder ' : ' or '}
                <span style={kw(12)}>{lang === 'de' ? 'Chat' : 'chat'}</span>{' '}
                {lang === 'de' ? '— beschreib einfach, wie es dir gerade geht. "Ich hab 10 Sachen zu tun und kann mit keiner anfangen." Dein Coach ' : '— just describe how you\'re feeling right now. "I have 10 things to do and can\'t start any of them." Your coach ' }
                <span style={kw(13)}>{lang === 'de' ? 'versteht' : 'understands'}</span>
                {lang === 'de' ? ' den Kontext.' : ' the context.'}
              </p>
            </div>

            <div className="relative">
              <span className="absolute -right-2 -top-4 text-6xl font-bold text-primary/10">02</span>
              <h3 className="mb-3 font-semibold text-xl">{t.step2Title}</h3>
              <p className="text-muted-foreground">
                {lang === 'de' ? 'Keine generischen Produktivitäts-Hacks. Methoden von echten ADHS-Coaches, ' : 'No generic productivity hacks. Methods from real ADHD coaches, '}
                <span style={kw(14)}>{lang === 'de' ? 'angepasst' : 'adapted'}</span>
                {lang === 'de' ? ' an deine Situation. Dein Coach ' : ' to your situation. Your coach '}
                <span style={kw(15)}>{lang === 'de' ? 'kennt' : 'knows'}</span>{' '}
                <span style={kw(16)}>{lang === 'de' ? 'deine' : 'your'}</span>{' '}
                <span style={kw(17)}>{lang === 'de' ? 'Muster' : 'patterns'}</span>
                {lang === 'de' ? ' und weiß, was bei dir funktioniert.' : ' and knows what works for you.'}
              </p>
            </div>

            <div className="relative">
              <span className="absolute -right-2 -top-4 text-6xl font-bold text-primary/10">03</span>
              <h3 className="mb-3 font-semibold text-xl">{t.step3Title}</h3>
              <p className="text-muted-foreground">
                25 {lang === 'de' ? 'Minuten Fokus-Sprint' : 'minute focus sprint'}.{' '}
                <span style={kw(20)}>{lang === 'de' ? 'Check-in' : 'Check-in'}</span>{' '}
                <span style={kw(21)}>{lang === 'de' ? 'Call' : 'call'}</span>{' '}
                <span style={kw(22)}>{lang === 'de' ? 'danach' : 'afterwards'}</span>.{' '}
                <span style={kw(23)}>{lang === 'de' ? 'Erinnerung' : 'Reminder'}</span>
                {lang === 'de' ? ' vor dem nächsten ' : ' before the next '}
                <span style={kw(24)}>{lang === 'de' ? 'Termin' : 'appointment'}</span>.{' '}
                {lang === 'de' ? 'Dein Coach bleibt dran, auch wenn dein Gehirn längst zum nächsten Thema gesprungen ist.' : 'Your coach stays with you, even when your brain has already jumped to the next topic.'}
              </p>
            </div>
          </div>

          {/* Methoden-Module Sub-Section */}
          <div className="mt-16 rounded-2xl border bg-muted/30 p-8 lg:p-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              {t.modulesTitle}
            </p>
            <h3 className="mb-4 text-2xl font-bold">
              {t.modulesHeadline}
            </h3>
            <p className="mb-8 max-w-3xl text-muted-foreground">
              {t.modulesText}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Target, title: t.module1Title, author: t.module1Author, desc: t.module1Desc },
                { icon: Wallet, title: t.module2Title, author: t.module2Author, desc: t.module2Desc },
                { icon: Moon, title: t.module3Title, author: t.module3Author, desc: t.module3Desc },
                { icon: CalendarDays, title: t.module4Title, author: t.module4Author, desc: lang === 'de' ? 'Morgen-Routinen, Wochen-Planung, Wechsel zwischen Aktivitäten.' : 'Morning routines, weekly planning, switching between activities.' },
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
            {lang === 'de' ? 'Dein Gehirn verdient Unterstützung, die ' : 'Your brain deserves support that\'s '}
            <span className="text-destructive underline" style={{ textShadow: '0 0 4px #fff, 0 0 8px #fff, 0 0 16px #fff, 0 0 32px #fff' }}>{lang === 'de' ? 'jetzt' : 'here now'}</span>
            {lang === 'de' ? ' da ist.' : '.'}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            {t.finalText}
          </p>

          <Card className="mx-auto max-w-md">
            <CardContent className="p-6">
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{t.formSuccessTitle}</h3>
                  <p className="text-muted-foreground">
                    {t.formSuccessText}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t.formLabel}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder={t.formPlaceholder}
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-label="E-Mail-Adresse"
                      />
                    </div>
                    <Button type="submit" className="gap-2" disabled={isSubmitting}>
                      {isSubmitting ? '...' : t.formSubmit}
                      {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.formPrivacy}
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
            {t.footerTagline}
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
