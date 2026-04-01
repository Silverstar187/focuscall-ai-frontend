import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Sparkles, Check } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl animate-pulse [animation-delay:2s]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Acme</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="px-6 pt-16 pb-24 lg:px-12 lg:pt-24 lg:pb-32">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Now in public beta
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Build faster with{" "}
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                intelligent
              </span>{" "}
              tools
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Create stunning products in half the time. Our platform combines 
              powerful features with an intuitive interface.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="group bg-foreground text-background hover:bg-foreground/90 min-w-[160px]">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="min-w-[160px]">
                View Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-muted to-muted-foreground/20"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(var(--muted)), hsl(var(--muted-foreground) / 0.2))`
                    }}
                  />
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +2k
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">2,000+</span> developers
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 lg:px-12 border-t border-border/50">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Powerful features to help you build, launch, and scale your products.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-border/50 bg-muted/30 p-6 backdrop-blur-sm transition-all hover:border-border hover:bg-muted/50"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 text-violet-600 dark:text-violet-400">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-24 lg:px-12 border-t border-border/50">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-blue-500/10 p-12 text-center border border-border/50">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
              Join thousands of developers building the future with our platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-blue-500">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold">Acme</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Acme Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with edge deployment and global CDN coverage."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and SOC 2 compliance built-in from day one."
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Leverage the latest AI models to automate and enhance your workflow."
  },
  {
    icon: Check,
    title: "Zero Config",
    description: "Get started instantly with sensible defaults and automatic scaling."
  },
  {
    icon: ArrowRight,
    title: "API First",
    description: "Build on a robust API designed for developers, by developers."
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description: "Live collaboration with WebSocket-based real-time data synchronization."
  }
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50ms", label: "Avg. Response" },
  { value: "10M+", label: "Requests/day" },
  { value: "150+", label: "Countries" }
];
