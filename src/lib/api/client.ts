export const customFetchInstance = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api/v1";
  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API error: ${response.statusText}`);
  }

  return response.json();
};

export default customFetchInstance;
