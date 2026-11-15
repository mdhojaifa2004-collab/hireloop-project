import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In — HireLoop",
  description:
    "Sign in to your HireLoop account to track applications and saved jobs.",
}

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
