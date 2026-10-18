import { getRequestConfig } from "next-intl/server";
import { deepMerge } from "./deep-merge";

export default getRequestConfig(async () => {
  const locale = "en";
  const enMessages = (await import("../../messages/en.json")).default;

  let messages = enMessages;
  if (locale !== "en") {
    try {
      const localeMessages = (await import(`../../messages/${locale}.json`)).default;
      messages = deepMerge(enMessages, localeMessages);
    } catch {
      messages = enMessages;
    }
  }

  return {
    locale,
    timeZone: "Asia/Kolkata",
    messages,
  };
});
