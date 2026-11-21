/**
 * Shared role helpers.
 *
 * This file deliberately has no server-only imports so it can be used by both
 * client components (post-login redirects) and server layouts (route guards).
 */

export type UserRole = "seeker" | "recruiter" | "admin"

/** The landing page for each role. Keep in sync with app/dashboard/*. */
export const DASHBOARD_BY_ROLE: Record<UserRole, string> = {
  admin: "/dashboard/admin",
  recruiter: "/dashboard/recruiter",
  seeker: "/dashboard/seeker",
}

/**
 * Treat a missing or unexpected role as a seeker instead of trusting the value.
 * Admin is still recognized for existing admin accounts.
 */
export function normalizeRole(value: unknown): UserRole {
  if (value === "admin" || value === "recruiter") {
    return value
  }

  return "seeker"
}

export function dashboardPathForRole(value: unknown): string {
  return DASHBOARD_BY_ROLE[normalizeRole(value)]
}
