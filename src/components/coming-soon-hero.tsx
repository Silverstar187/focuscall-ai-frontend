"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Particles } from "@/components/ui/particles";
import { NumberTicker } from "@/components/ui/number-ticker";
import { RippleButton } from "@/components/ui/ripple-button";
import { Sparkles, Mail, ArrowRight } from "lucide-react";

export function ComingSoonHero() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Magic UI Particles Background */}
      <Particles
        className="absolute inset-0"
        quantity={80}
        ease={80}
        color="#000000"
        staticity={50}
        refresh={false}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium"
          >
            <Sparkles className="h-3 w-3" />
            Coming Soon
          </Badge>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Something{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Magical
            </span>{" "}
            is Coming
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground sm:text-xl">
            We&apos;re building the next generation of AI-powered coaching. 
            Be the first to experience it.
          </p>

          {/* Email Signup Card */}
          <Card className="mx-auto max-w-md border-border/50 bg-background/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <RippleButton>
                  <Button className="w-full sm:w-auto gap-2">
                    Notify Me
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </RippleButton>
              </div>
            </CardContent>
          </Card>

          {/* Stats with Number Ticker */}
          <div className="mt-16">
            <Separator className="mb-8" />
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <NumberTicker value={2500} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Waitlist</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <NumberTicker value={14} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Days Left</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <NumberTicker value={99} />
                  <span>%</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
