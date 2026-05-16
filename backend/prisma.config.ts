import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: "file:./dev.db",
  },
  migrations: {
    seed: "node prisma/seed.js",
  },
});