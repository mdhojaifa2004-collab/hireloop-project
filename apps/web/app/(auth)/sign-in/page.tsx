import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign In — HireLoop",
  description: "Sign in to your HireLoop account to track applications and saved jobs.",
}

export default function SignInPage() {
  return <AuthForm mode="sign-in" />
}
