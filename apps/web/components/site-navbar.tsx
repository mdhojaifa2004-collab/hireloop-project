
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"

import logo from "@/app/assets/logo.png"
import { useSession, signOut } from "@/lib/auth-client"

// Navbar-এর সব Navigation Link

// Navbar Link-এর Design
const navLinkClass =
  "text-[15px] font-medium tracking-[-0.2px] text-white/80 transition-all duration-300 hover:text-[#8E85FF]"

const navLinkActiveClass =
  "font-semibold text-[#8E85FF] underline underline-offset-[8px]"

// Sign In Button-এর Design
const signInClass =
  "h-10 rounded-xl px-5 font-semibold text-white/90 transition-all duration-300 hover:bg-[#645AFF]/10 hover:text-[#8E85FF]"

// Get Started Button-এর Design
const getStartedClass =
  "h-10 rounded-xl border border-[#645AFF] bg-[#645AFF] px-5 font-semibold text-white shadow-[0_4px_15px_rgba(100,90,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5146e8] hover:shadow-[0_6px_20px_rgba(100,90,255,0.4)]"

export function SiteNavbar() {
  const pathname = usePathname()

  // FIX: The session hook must run before NAV_LINKS is built. The old order
  // read `session` before it was declared, which crashed the navbar at runtime.
  const { data: session } = useSession()

  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  // FIX: Replaced `/Dashboard/seker` with the real lowercase dashboard routes.
  // Guests are sent to sign-in instead of a broken dashboard URL.
  const role = session?.user?.role
  const dashboardHref =
    role === "admin" || role === "recruiter"
      ? `/dashboard/${role}`
      : session?.user
        ? "/dashboard/seeker"
        : "/sign-in"

  const NAV_LINKS = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: dashboardHref },
  ] as const

  // Scroll করলে Navbar-এর Background পরিবর্তন হবে
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)

    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // বর্তমান Route Active কিনা চেক করবে
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  // User Sign Out করলে এই Function কাজ করবে
  const handleSignOut = async () => {
    await signOut()
  }


  return (
    <header
      className={cn(
        "sticky top-0 z-50 px-4 pb-4 pt-4 transition-colors duration-300 sm:px-6 sm:pt-6",
        scrolled &&
        "bg-linear-to-b from-[#010103]/95 via-[#010103]/55 to-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-none items-center justify-between rounded-2xl bg-[#222222] px-4 sm:h-[74px] sm:px-6"
      >
        {/* Logo: Click করলে Home Page-এ যাবে */}
        <Link
          href="/"
          aria-label="HireLoop home"
          className="flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#645AFF]/60"
        >
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-7 w-auto sm:h-11"
          />
        </Link>

        {/* ========================================= */}
        {/* Desktop Navigation */}
        {/* ========================================= */}

        <div className="hidden h-full items-center gap-5 lg:flex">

          {/* পরিবর্তন ১: Login/Logout উভয় অবস্থায় Menu দেখা যাবে */}
          <div className="flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  navLinkClass,
                  isActive(link.href) && navLinkActiveClass
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Menu এবং Authentication Button-এর মাঝে Divider */}
          <span
            aria-hidden
            className="h-6 w-px bg-white/20"
          />

          {/* পরিবর্তন ২: শুধু Authentication অংশ পরিবর্তন হবে */}
          <div className="flex items-center gap-3">

            {session?.user ? (
              <>
                {/* Login করা User-এর নাম দেখাবে */}
                <span className="max-w-[180px] truncate text-sm font-semibold text-[#EDEDEF]">
                  {session.user.name}
                </span>

                {/* Sign Out Button */}
                <Button
                  onClick={handleSignOut}
                  nativeButton={false}
                  className="h-10 rounded-xl border border-[#645AFF]/40 bg-[#645AFF]/10 px-5 font-semibold text-[#8E85FF] transition-all duration-300 hover:border-[#645AFF] hover:bg-[#645AFF] hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                {/* Logout থাকলে Sign In দেখাবে */}
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    signInClass
                  )}
                >
                  Sign In
                </Link>

                {/* Logout থাকলে Get Started দেখাবে */}
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants(),
                    getStartedClass
                  )}
                >
                  Get Started
                </Link>
              </>
            )}

          </div>
        </div>

        {/* ========================================= */}
        {/* Mobile / Tablet Navigation */}
        {/* ========================================= */}

        <div className="flex items-center gap-2 lg:hidden">

          {/* পরিবর্তন ৩: Logout থাকলে Mobile-এ Get Started Button */}
          {!session?.user && (
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                "hidden h-10 rounded-xl border border-[#645AFF] bg-[#645AFF] px-4 font-semibold text-white shadow-[0_4px_15px_rgba(100,90,255,0.2)] transition-all duration-300 hover:bg-[#5146e8] sm:inline-flex"
              )}
            >
              Get Started
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open menu"
                  className="size-11 rounded-xl border border-white/10 text-white transition-all duration-300 hover:border-[#645AFF]/50 hover:bg-[#645AFF]/15 hover:text-[#8E85FF]"
                />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[86vw] max-w-sm flex-col border-l border-white/10 bg-[#151519] p-6 text-white"
            >
              <SheetHeader className="p-0">

                <SheetTitle className="sr-only">
                  Navigation menu
                </SheetTitle>

                <SheetDescription className="sr-only">
                  Browse the HireLoop public pages
                </SheetDescription>

                {/* Mobile Menu Logo */}
                <Link
                  href="/"
                  aria-label="HireLoop home"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src={logo}
                    alt="HireLoop"
                    className="h-8 w-auto"
                  />
                </Link>

              </SheetHeader>

              {/* পরিবর্তন ৪: Login থাকলে User-এর নাম দেখাবে */}
              {session?.user && (
                <div className="mt-8 rounded-xl border border-[#645AFF]/20 bg-[#645AFF]/10 p-4">
                  <p className="text-xs text-white/50">
                    Welcome back
                  </p>

                  <p className="mt-1 truncate font-semibold text-white">
                    {session.user.name}
                  </p>
                </div>
              )}

              {/* পরিবর্তন ৫: Login/Logout উভয় অবস্থায় সব Menu থাকবে */}
              <div className="mt-8 flex flex-col gap-1">

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base text-white/80 transition-all duration-300 hover:bg-[#645AFF]/10 hover:text-[#8E85FF]",
                      isActive(link.href) &&
                      "bg-[#645AFF]/15 font-semibold text-[#8E85FF]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

              </div>

              {/* Mobile Authentication Buttons */}
              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">

                {session?.user ? (
                  <>
                    {/* Login থাকলে User-এর নাম */}
                    <p className="text-center font-semibold text-white">
                      {session.user.name}
                    </p>

                    {/* Mobile Sign Out */}
                    <Button
                      onClick={() => {
                        setOpen(false)
                        handleSignOut()
                      }}
                      nativeButton={false}
                      className="h-11 w-full rounded-xl border border-[#645AFF]/40 bg-[#645AFF]/10 font-semibold text-[#8E85FF] transition-all duration-300 hover:bg-[#645AFF] hover:text-white"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Logout থাকলে Sign In */}
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-11 w-full rounded-xl border border-white/15 bg-transparent font-semibold text-white transition-all duration-300 hover:border-[#645AFF] hover:bg-[#645AFF]/10 hover:text-[#8E85FF]"
                      )}
                    >
                      Sign In
                    </Link>

                    {/* Logout থাকলে Get Started */}
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants(),
                        "h-11 w-full rounded-xl border border-[#645AFF] bg-[#645AFF] font-semibold text-white shadow-[0_4px_15px_rgba(100,90,255,0.25)] transition-all duration-300 hover:bg-[#5146e8]"
                      )}
                    >
                      Get Started
                    </Link>
                  </>
                )}

              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  )
}
