export interface RequestConfig {
  url: string;
  method: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  data?: unknown;
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export const customFetchInstance = async <T>(
  config: RequestConfig,
  options: RequestInit = {},
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

  // Build full URL including query params
  let targetUrl = config.url.startsWith("http")
    ? config.url
    : `${baseUrl.replace(/\/api\/v1$/, "")}${config.url}`;

  if (config.params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(config.params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      targetUrl += (targetUrl.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...config.headers,
    ...options.headers,
  };

  const body =
    config.data !== undefined
      ? typeof config.data === "string"
        ? config.data
        : JSON.stringify(config.data)
      : options.body;

  const response = await fetch(targetUrl, {
    ...options,
    method: config.method || options.method || "GET",
    signal: config.signal || options.signal,
    headers,
    body,
    credentials: "include",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      (errorBody as { message?: string }).message || `API error: ${response.statusText}`,
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
};

export default customFetchInstance;
