
'use client'

import { AuthForm } from "@/components/auth-form";
import type { AuthFormData } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";




export default function SignUpPage() {
  const handleSignUp = async (data: AuthFormData) => {
    const { data: signUpResponse, error } =
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

    if (error) {
      console.error("SignUp Error:", error);
      return;
    }

    console.log("SignUp Success:", signUpResponse);
  };

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />;
}
