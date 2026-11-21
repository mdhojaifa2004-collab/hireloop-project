
'use client'

import { AuthForm } from "@/components/auth-form";
import type { AuthFormData } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";
import { dashboardPathForRole } from "@/lib/roles";
import { useRouter } from 'next/navigation'



export default function SignUpPage() {
const router = useRouter();

  const handleSignUp = async (data: AuthFormData) => {
    const { data: signUpResponse, error } =
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        callbackURL: '/' ,
      });

      if (error) {
        // Surface backend validation (e.g. an attempted admin role) in the form.
        throw new Error(error.message || "Could not create your account.")
      }

      // Send the new user straight to their role's dashboard.
      router.push(
        dashboardPathForRole(signUpResponse?.user?.role ?? data.role)
      )
      router.refresh()
  };

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />;
}
