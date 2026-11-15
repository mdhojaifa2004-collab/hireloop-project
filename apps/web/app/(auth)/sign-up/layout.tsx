import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
  description: "Create a HireLoop account and land your next role faster.",
}

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
