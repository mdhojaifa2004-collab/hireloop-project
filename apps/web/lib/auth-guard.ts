import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { dashboardPathForRole, normalizeRole, type UserRole } from "@/lib/roles"

/**
 * Read the current better-auth session on the server.
 *
 * `headers()` opts the calling route into dynamic rendering, so role-specific
 * dashboard HTML is never statically cached and shared between users.
 */
export async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() })

  return session?.user ?? null
}

/**
 * Server-side role guard for dashboard layouts.
 *
 * - No session -> /sign-in
 * - Signed in with the wrong role -> that user's own dashboard
 *
 * Calling this from a layout protects every nested page in that segment.
 * Client-side checks alone are never sufficient.
 */
export async function requireRole(required: UserRole) {
  const user = await getSessionUser()

  if (!user) {
    redirect("/sign-in")
  }

  // `role` is an additional better-auth field, so keep the read defensive.
  const role = normalizeRole((user as { role?: unknown }).role)

  if (role !== required) {
    redirect(dashboardPathForRole(role))
  }

  return user
}
