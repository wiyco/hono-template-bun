import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  /** @see {@link https://vitest.dev/config} */
  test: {
    include: ["test/**/*.test.{js,ts}", "src/**/*.test.{js,ts}"],
    globals: true,
  },
});
