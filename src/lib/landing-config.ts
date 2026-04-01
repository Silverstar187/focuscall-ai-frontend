/**
 * Landing Page Configuration
 * 
 * Edit this file to customize your landing page content,
 * branding, and messaging without touching the components.
 */

export const landingConfig = {
  // Brand
  brand: {
    name: "Acme",
    logo: {
      icon: "Sparkles", // Lucide icon name
      gradient: ["from-violet-500", "to-blue-500"] as const,
    },
  },

  // Navigation
  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "About", href: "#about" },
      { label: "Pricing", href: "#pricing" },
    ],
    cta: {
      primary: "Get Started",
      secondary: "Sign In",
    },
  },

  // Hero Section
  hero: {
    badge: {
      text: "Now in public beta",
      dot: true,
    },
    headline: {
      prefix: "Build faster with",
      highlight: "intelligent",
      suffix: "tools",
    },
    subheadline:
      "Create stunning products in half the time. Our platform combines powerful features with an intuitive interface.",
    cta: {
      primary: {
        label: "Start Building",
        href: "/signup",
      },
      secondary: {
        label: "View Demo",
        href: "/demo",
      },
    },
    socialProof: {
      avatars: 4,
      count: "2,000+",
      label: "developers",
    },
  },

  // Features Section
  features: {
    title: "Everything you need",
    description:
      "Powerful features to help you build, launch, and scale your products.",
    items: [
      {
        icon: "Zap",
        title: "Lightning Fast",
        description:
          "Optimized for speed with edge deployment and global CDN coverage.",
      },
      {
        icon: "Shield",
        title: "Enterprise Security",
        description:
          "Bank-grade encryption and SOC 2 compliance built-in from day one.",
      },
      {
        icon: "Sparkles",
        title: "AI-Powered",
        description:
          "Leverage the latest AI models to automate and enhance your workflow.",
      },
      {
        icon: "Check",
        title: "Zero Config",
        description:
          "Get started instantly with sensible defaults and automatic scaling.",
      },
      {
        icon: "ArrowRight",
        title: "API First",
        description:
          "Build on a robust API designed for developers, by developers.",
      },
      {
        icon: "Zap",
        title: "Real-time Sync",
        description:
          "Live collaboration with WebSocket-based real-time data synchronization.",
      },
    ],
  },

  // Stats Section
  stats: {
    items: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "50ms", label: "Avg. Response" },
      { value: "10M+", label: "Requests/day" },
      { value: "150+", label: "Countries" },
    ],
  },

  // CTA Section
  cta: {
    title: "Ready to get started?",
    description:
      "Join thousands of developers building the future with our platform.",
    primary: {
      label: "Start Free Trial",
      href: "/signup",
    },
    secondary: {
      label: "Contact Sales",
      href: "/contact",
    },
    benefits: ["No credit card required", "14-day free trial", "Cancel anytime"],
  },

  // Footer
  footer: {
    socials: [
      { label: "Twitter", href: "https://twitter.com" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Discord", href: "https://discord.com" },
    ],
    copyright: `© ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
  },
} as const;

export type LandingConfig = typeof landingConfig;
