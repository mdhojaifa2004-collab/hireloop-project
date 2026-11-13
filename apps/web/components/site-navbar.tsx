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

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

const navLinkClass =
  "text-[16px] tracking-[-0.2px] text-white/90 transition-colors hover:text-white"
const navLinkActiveClass =
  "font-bold text-white underline underline-offset-[6px]"
const signInClass =
  "h-[52px] rounded-xl px-6 font-label text-[18px] font-semibold tracking-tight text-primary hover:bg-white/5 hover:text-primary/80"
const getStartedClass =
  "h-[52px] rounded-xl border border-[#090a15]/10 bg-primary px-6 font-label text-[18px] font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-primary/90"

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 bg-linear-to-b from-[#010103] from-70% to-[#010103]/0 px-4 pt-4 pb-4 sm:px-6 sm:pt-6">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between rounded-2xl bg-[#222222] pr-2 pl-5 sm:h-[74px] sm:pl-6"
      >
        <Link
          href="/"
          aria-label="HireLoop home"
          className="flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-7 w-auto sm:h-11"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden h-full items-center gap-6 lg:flex">
          <div className="flex items-center gap-10">
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

          <span aria-hidden className="h-6 w-px bg-[#a8a8a8]/40" />

          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                signInClass
              )}
            >
              Sign In
            </Link>
            <Link href="/sign-up" className={cn(buttonVariants(), getStartedClass)}>
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile / tablet navigation */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants(),
              "hidden h-10 rounded-xl border border-[#090a15]/10 bg-primary px-4 font-label text-sm font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-primary/90 sm:inline-flex"
            )}
          >
            Get Started
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open menu"
                  className="size-11 rounded-xl text-white hover:bg-white/10"
                />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm border-l border-white/10 bg-[#151519] p-6 text-white"
            >
              <SheetHeader className="p-0">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse the HireLoop public pages
                </SheetDescription>
                <Link
                  href="/"
                  aria-label="HireLoop home"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <Image src={logo} alt="HireLoop" className="h-8 w-auto" />
                </Link>
              </SheetHeader>

              <div className="mt-2 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base text-white/80 transition-colors hover:bg-white/5 hover:text-white",
                      isActive(link.href) && "bg-white/5 font-semibold text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 w-full rounded-xl border-white/15 bg-transparent font-label text-base font-medium text-white hover:bg-white/5 hover:text-white"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "h-11 w-full rounded-xl border border-[#090a15]/10 bg-primary font-label text-base font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-primary/90"
                  )}
                >
                  Get Started
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
