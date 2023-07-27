import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
