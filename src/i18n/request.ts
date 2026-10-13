import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    timeZone: "Asia/Kolkata",
    messages: (await import("../../messages/en.json")).default,
  };
});
