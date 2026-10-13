export const siteConfig = {
  // Configured via environment variables; defaults marked TODO-REAL-DATA
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "ProgressEye Technologies Pvt. Ltd.", // TODO-REAL-DATA: Confirm legal company name
  shortName: "ProgressEye",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://progresseye.com", // TODO-REAL-DATA: Confirm production domain
  description:
    "An advanced, end-to-end multi-tenant school operating system built for Indian schools — attendance, fees, exams, communication, all in one calm screen.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@progresseye.com", // TODO-REAL-DATA: Confirm support email

  // Social profile placeholders - marked TODO-REAL-DATA
  // Note: Omitted from Schema.org sameAs until real verified profiles are provided
  social: {
    twitter: "https://x.com/ProgressEyeApp", // TODO-REAL-DATA
    linkedin: "https://linkedin.com/company/progresseye", // TODO-REAL-DATA
    github: "https://github.com/progresseye", // TODO-REAL-DATA
  },

  navLinks: [
    { labelKey: "home", href: "/" },
    { labelKey: "features", href: "/features" },
    { labelKey: "pricing", href: "/pricing" }, // Next.js 308 redirect to /get-started
    { labelKey: "faq", href: "/faq" },
    { labelKey: "about", href: "/about" },
    { labelKey: "contact", href: "/contact" },
  ] as const,

  footerLinks: {
    product: [
      { labelKey: "features", href: "/features" },
      { labelKey: "pricing", href: "/pricing" },
      { labelKey: "demo", href: "/demo" },
      { labelKey: "faq", href: "/faq" },
    ],
    company: [
      { labelKey: "about", href: "/about" },
      { labelKey: "careers", href: "/careers", badgeKey: "careersBadge" },
      { labelKey: "contact", href: "/contact" },
    ],
    legal: [
      { labelKey: "privacy", href: "/privacy" },
      { labelKey: "terms", href: "/terms" },
      { labelKey: "cookies", href: "/cookies" },
      { labelKey: "gdpr", href: "/gdpr" },
    ],
  },
};
