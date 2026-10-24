"use client";

import defaultMessages from "@messages/en.json";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type * as React from "react";
import { Toaster } from "@/components/ui/sonner";

// Only pass namespaces used by client components (nav and footer)
const clientMessages = {
  nav: defaultMessages.nav,
  footer: defaultMessages.footer,
};

interface RootProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: AbstractIntlMessages;
}

export function RootProvider({
  children,
  locale = "en",
  messages = clientMessages as unknown as AbstractIntlMessages,
}: RootProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Kolkata">
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
