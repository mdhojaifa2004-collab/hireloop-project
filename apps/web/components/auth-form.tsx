"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  Building2Icon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"
import { authClient } from "@/lib/auth-client"

type AuthMode = "sign-in" | "sign-up"

/** Public sign-up roles only. Admin accounts are provisioned separately. */
export type UserRole = "seeker" | "recruiter" | "admin"

export type AuthFormData = {
  /** Empty string on the sign-in page. */
  name: string
  email: string
  password: string
  /** Empty string on the sign-in page. */
  confirmPassword: string
  /** "seeker" on the sign-in page. */
  role: UserRole
  remember: boolean
  acceptTerms: boolean
}

type AuthFormProps = {
  mode: AuthMode
  /** Called with the validated form values. Wire this to better-auth. */
  onSubmit?: (data: AuthFormData) => void | Promise<void>
}

const fieldLabelClass =
  "font-label text-[13px] font-medium tracking-[0.01em] text-white/80"
const inputClass =
  "h-full rounded-none border-0 bg-transparent! pr-4 pl-11 text-base text-white shadow-none placeholder:text-white/35 focus-visible:ring-0 aria-invalid:ring-0"
const fieldShellClass =
  "relative flex h-12 items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors focus-within:border-primary/60 focus-within:bg-white/[0.06]"
const fieldIconClass =
  "pointer-events-none absolute left-4 size-[18px] text-white/40"

const USER_ROLES: { value: UserRole; label: string; icon: typeof UserIcon }[] = [
  { value: "seeker", label: "Job Seeker", icon: UserIcon },
  { value: "recruiter", label: "Recruiter", icon: Building2Icon },
]

function Field({
  id,
  label,
  icon: Icon,
  hint,
  children,
}: {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id} className={fieldLabelClass}>
          {label}
        </Label>
        {hint ? (
          <span id={`${id}-hint`} className="text-xs text-white/35">
            {hint}
          </span>
        ) : null}
      </div>
      <div className={fieldShellClass}>
        <Icon className={fieldIconClass} aria-hidden />
        {children}
      </div>
    </div>
  )
}

function PasswordField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  hint,
}: {
  id: string
  name: string
  label: string
  placeholder: string
  autoComplete: string
  hint?: string
}) {
  const [visible, setVisible] = React.useState(false)

  return (
    <Field id={id} label={label} icon={LockIcon} hint={hint}>
      <Input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        minLength={8}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(inputClass, "pr-12")}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute right-3 flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors after:absolute after:-inset-2 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
      >
        {visible ? (
          <EyeOffIcon className="size-[18px]" />
        ) : (
          <EyeIcon className="size-[18px]" />
        )}
      </button>
    </Field>
  )
}

function RoleSelector() {
  return (
    <div className="flex flex-col gap-2">
      <span id="role-label" className={fieldLabelClass}>
        Account type
      </span>
      <div
        role="radiogroup"
        aria-labelledby="role-label"
        className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1"
      >
        {USER_ROLES.map(({ value, label, icon: Icon }) => (
          <label key={value} className="cursor-pointer">
            <input
              type="radio"
              name="role"
              value={value}
              defaultChecked={value === "seeker"}
              className="peer sr-only"
            />
            <span className="flex h-10 items-center justify-center gap-1.5 rounded-lg font-label text-xs font-medium text-white/55 transition-colors peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50 sm:gap-2 sm:text-[13px]">
              <Icon className="hidden size-4 sm:block" aria-hidden />
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.46a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.96H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27a7.2 7.2 0 0 1 0-4.55v-3.1H1.28a12 12 0 0 0 0 10.75l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.6 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  )
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignUp = mode === "sign-up"
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)
  // Google only becomes interactive when credentials are configured and this
  // public flag is set. Never pretend OAuth works without real credentials.
  const googleEnabled =
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true"

  async function handleGoogleSignIn() {
    if (!googleEnabled) return

    setError(null)

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })

    if (error) {
      setError(error.message || "Could not start Google sign-in.")
    }
  }
  const [collected, setCollected] = React.useState<
    Record<string, FormDataEntryValue> | null
  >(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries())

    if (isSignUp && values.password !== values.confirmPassword) {
      setCollected(null)
      setError("Passwords do not match. Please try again.")
      return
    }

    const role =
      USER_ROLES.find(({ value }) => value === values.role)?.value ?? "seeker"

    const data: AuthFormData = {
      name: String(values.name ?? ""),
      email: String(values.email ?? ""),
      password: String(values.password ?? ""),
      confirmPassword: String(values.confirmPassword ?? ""),
      role,
      remember: values.remember === "on",
      acceptTerms: values.acceptTerms === "on",
    }

    setError(null)
    setCollected(values)
    setPending(true)

    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // No handler wired up yet — just surface what was collected.
        console.info(`[auth:${mode}] collected form data`, data)
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setPending(false)
    }
  }

  // Never render raw passwords back to the screen, even in this demo.
  const preview = collected
    ? Object.fromEntries(
        Object.entries(collected).map(([key, value]) => [
          key,
          /password/i.test(key) ? "••••••••" : value,
        ])
      )
    : null

  return (
    <div className="w-full max-w-[468px]">
      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(165deg,#1b1b22_0%,#0d0d11_48%,#08080b_100%)] p-5 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.95)] sm:p-7">
        {/* Page toggle */}
        <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
          <Link
            href="/sign-in"
            aria-current={!isSignUp ? "page" : undefined}
            className={cn(
              "flex h-10 items-center justify-center rounded-lg font-label text-sm font-medium transition-colors",
              !isSignUp
                ? "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                : "text-white/60 hover:text-white"
            )}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            aria-current={isSignUp ? "page" : undefined}
            className={cn(
              "flex h-10 items-center justify-center rounded-lg font-label text-sm font-medium transition-colors",
              isSignUp
                ? "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                : "text-white/60 hover:text-white"
            )}
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-6 text-center sm:mt-7">
          <h1 className="font-display text-[26px] leading-[1.2] font-bold tracking-[-0.02em] text-white sm:text-[28px]">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1.5 font-display text-sm leading-[1.6] text-white/60 sm:text-[15px]">
            {isSignUp
              ? "Join thousands of job seekers landing better roles, faster."
              : "Sign in to keep track of your applications and saved jobs."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:mt-5">
          {isSignUp ? (
            <Field id="name" label="Full name" icon={UserIcon}>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
                minLength={2}
                className={inputClass}
              />
            </Field>
          ) : null}

          <Field id="email" label="Email address" icon={MailIcon}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </Field>

          <PasswordField
            id="password"
            name="password"
            label="Password"
            placeholder={isSignUp ? "Create a password" : "Enter your password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            hint={isSignUp ? "At least 8 characters." : undefined}
          />

          {isSignUp ? (
            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              placeholder="Re-enter password"
              autoComplete="new-password"
            />
          ) : null}

          {isSignUp ? (
            <RoleSelector />
          ) : null}

          {isSignUp ? (
            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                required
                className="mt-0.5"
              />
              <Label
                htmlFor="acceptTerms"
                className="font-normal text-white/60"
              >
                <span className="block text-[13px] leading-[1.6]">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-white/80 underline underline-offset-2 hover:text-white"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-white/80 underline underline-offset-2 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </Label>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Checkbox id="remember" name="remember" defaultChecked />
                <Label
                  htmlFor="remember"
                  className="text-[13px] font-normal text-white/60"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="font-label text-[13px] font-medium text-primary transition-colors hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {error ? (
            <p
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] text-red-300"
            >
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={pending}
            className="h-12 w-full rounded-xl border border-[#090a15]/10 bg-primary font-label text-[15px] font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-primary/90"
          >
            {isSignUp ? "Create account" : "Sign In"}
            <ArrowRightIcon className="size-4" />
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-4 flex items-center gap-3">
          <span aria-hidden className="h-px flex-1 bg-white/10" />
          <span className="font-label text-xs tracking-wide text-white/40">
            or continue with
          </span>
          <span aria-hidden className="h-px flex-1 bg-white/10" />
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={!googleEnabled}
          onClick={handleGoogleSignIn}
          className="mt-2.5 h-12 w-full rounded-xl border-white/10 bg-white/[0.04] font-label text-[15px] font-medium text-white hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoogleIcon className="size-[18px]" />
          Continue with Google
        </Button>

        {!googleEnabled ? (
          <p className="mt-2 text-center text-xs text-white/40">
            Google sign-in is not configured yet. Use email and password.
          </p>
        ) : null}

        {preview ? (
          <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[0.07] p-4">
            <p className="font-label text-xs font-medium text-primary">
              Form data collected — check the console
            </p>
            <pre className="mt-2 overflow-x-auto text-[11px] leading-[1.6] text-white/60">
              {JSON.stringify(preview, null, 2)}
            </pre>
          </div>
        ) : null}

        <p className="mt-4 text-center font-display text-sm text-white/50">
          {isSignUp ? "Already have an account?" : "New to HireLoop?"}{" "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            {isSignUp ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-white/35">
        Protected by HireLoop. Your data stays private and secure.
      </p>
    </div>
  )
}
