import path from "node:path"

import { loadEnvConfig } from "@next/env"
import type { NextConfig } from "next"

// Next.js only reads `.env*` from this app's directory (apps/web), but this
// monorepo keeps its secrets in the repo-root `.env`. Load that as well so
// `process.env.BETTER_AUTH_*` is populated for lib/auth.ts and friends.
//
// `forceReload` is required: Next calls `loadEnvConfig(appDir)` before it
// evaluates this file, which caches the result, so a plain call would no-op.
const repoRoot = path.resolve(process.cwd(), "../..")
loadEnvConfig(repoRoot, process.env.NODE_ENV !== "production", console, true)

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
}

export default nextConfig
