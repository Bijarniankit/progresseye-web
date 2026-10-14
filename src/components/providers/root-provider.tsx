"use client";

import defaultMessages from "@messages/en.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { Toaster } from "@/components/ui/sonner";

interface RootProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: AbstractIntlMessages;
}

export function RootProvider({
  children,
  locale = "en",
  messages = defaultMessages as unknown as AbstractIntlMessages,
}: RootProviderProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Kolkata">
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
