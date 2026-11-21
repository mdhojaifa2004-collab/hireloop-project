"use client"

import { useRouter } from "next/navigation"

import { AuthForm } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client";
import { dashboardPathForRole } from "@/lib/roles";
import type { AuthFormData } from "@/components/auth-form";



export default function SignInPage() {
  const router = useRouter()

  const handleSignin = async (data: AuthFormData) => {
    const { error } = await authClient.signIn.email({
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
      callbackURL: '/', // An optional URL to redirect to after the user signs in. (optional)
    });

    // FIX: Show sign-in failures in the form instead of only logging them.
    if (error) {
      throw new Error(error.message || "Could not sign in. Check your email and password.")
    }

    // FIX: Send each user to the dashboard that matches their stored role
    // instead of always dropping everyone on the public home page.
    const { data: session } = await authClient.getSession()
    router.push(dashboardPathForRole(session?.user?.role))
    router.refresh()
  }

  return <AuthForm mode="sign-in" onSubmit={handleSignin} />
}
