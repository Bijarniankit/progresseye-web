"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
  hasBackend?: boolean;
}

export function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
  className = "",
  hasBackend: explicitHasBackend,
}: TurnstileWidgetProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | null>(null);
  const isBackendActive = explicitHasBackend ?? siteConfig.hasLeadBackend;
  const siteKey = siteConfig.turnstileSiteKey || "1x00000000000000000000AA";

  React.useEffect(() => {
    // Only mount if feature flag is active and siteKey is configured
    if (!isBackendActive || !siteKey || !containerRef.current) {
      return;
    }

    let isMounted = true;

    function renderWidget() {
      if (!isMounted || !containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current) return; // Already rendered

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (isMounted) onVerify(token);
          },
          "error-callback": () => {
            if (isMounted && onError) onError();
          },
          "expired-callback": () => {
            if (isMounted && onExpire) onExpire();
          },
          theme: "auto",
        });
        widgetIdRef.current = id;
      } catch {
        // Fail gracefully
      }
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      // Load script if not already added
      const existingScript = document.getElementById("cf-turnstile-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "cf-turnstile-script";
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          renderWidget();
        };
        document.head.appendChild(script);
      } else {
        const checkInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkInterval);
            renderWidget();
          }
        }, 50);
        return () => clearInterval(checkInterval);
      }
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore removal errors on teardown
        }
        widgetIdRef.current = null;
      }
    };
  }, [isBackendActive, siteKey, onVerify, onExpire, onError]);

  if (!isBackendActive || !siteKey) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-testid="turnstile-widget"
      className={`min-h-[65px] flex items-center justify-start ${className}`}
    />
  );
}
