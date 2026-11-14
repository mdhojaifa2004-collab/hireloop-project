import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import dots from "@/app/assets/hero-dots.png"
import globe from "@/app/assets/globe.png"
import logo from "@/app/assets/logo.png"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="dark relative isolate flex min-h-svh flex-col overflow-hidden bg-[#010103] text-white">
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-240px] left-1/2 h-[760px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(92,83,254,0.32),rgba(92,83,254,0.12)_55%,transparent_100%)] blur-[100px]" />

        <div className="absolute inset-x-0 top-0 h-[520px] opacity-25">
          <Image
            src={dots}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="absolute -bottom-[560px] left-1/2 h-[1882px] w-[1440px] -translate-x-1/2 opacity-45">
          <Image
            src={globe}
            alt=""
            fill
            priority
            sizes="1440px"
            className="object-cover object-top brightness-[0.65]"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#010103] via-[#010103]/70 to-transparent" />
      </div>

      <header className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <Image src={logo} alt="HireLoop" priority className="h-8 w-auto sm:h-10" />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg font-label text-sm text-white/60 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
        >
          <ArrowLeftIcon className="size-4" />
          Back to home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  )
}
