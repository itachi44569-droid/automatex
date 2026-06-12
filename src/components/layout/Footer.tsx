import Link from "next/link";
import { Zap, Mail, MapPin, Phone } from "lucide-react";

const GithubSVG = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// Minimal inline SVG icons for social media not in this lucide version
const TwitterX = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinSVG = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const footerLinks = {
  Services: [
    { label: "AI Chatbots", href: "/services#ai-chatbots" },
    { label: "AI Agents", href: "/services#ai-agents" },
    { label: "Workflow Automation", href: "/services#workflow-automation" },
    { label: "CRM Automation", href: "/services#crm-automation" },
    { label: "Lead Generation", href: "/services#lead-generation" },
    { label: "Custom AI Solutions", href: "/services#custom-ai" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Pricing", href: "/pricing" },
    { label: "Book a Call", href: "/contact#booking" },
    { label: "Client Portal", href: "/login" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background">
      <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display gradient-text">AutomateX</span>
              <span className="text-xl font-bold">AI</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              We help ambitious businesses in the USA, UK, and Europe automate their operations with cutting-edge AI solutions — saving time, cutting costs, and scaling faster.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>New York, NY · London, UK · Berlin, DE</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>hello@automatex.ai</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+1 (888) 123-4567</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { SvgIcon: TwitterX, href: "#", label: "Twitter / X" },
                { SvgIcon: LinkedinSVG, href: "#", label: "LinkedIn" },
              ].map(({ SvgIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-all duration-200"
                >
                  <SvgIcon />
                </a>
              ))}
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg glass-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-all duration-200"
              >
                <GithubSVG />
              </a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">{section}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AutomateX AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="text-red-500">♥</span>
            <span>for ambitious businesses worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
