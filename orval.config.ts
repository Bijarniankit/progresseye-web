import { defineConfig } from "orval";

export default defineConfig({
  progresseye: {
    input: {
      target: "./openapi/openapi.json",
      validation: false,
    },
    output: {
      mode: "tags-split",
      target: "src/lib/api/generated/endpoints",
      schemas: "src/lib/api/generated/model",
      client: "react-query",
      mock: false,
      override: {
        mutator: {
          path: "src/lib/api/client.ts",
          name: "customFetchInstance",
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
});
