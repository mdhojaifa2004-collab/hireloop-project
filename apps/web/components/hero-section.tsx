import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseBusinessIcon,
  Building2Icon,
  MapPinIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

import dots from "@/app/assets/hero-dots.png"
import globe from "@/app/assets/globe.png"

const TRENDING_POSITIONS = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const STATS = [
  { value: "50K", label: "Active Jobs", icon: BriefcaseBusinessIcon },
  { value: "12K", label: "Companies", icon: Building2Icon },
  { value: "2M", label: "Job Seekers", icon: UsersIcon },
  { value: "97%", label: "Satisfaction Rate", icon: StarIcon },
] as const

const fieldClass =
  "flex h-12 flex-1 items-center gap-2 rounded-xl px-3 sm:h-auto sm:px-0"
const inputClass =
  "w-full min-w-0 bg-transparent font-sans text-base leading-[1.7] text-white outline-none placeholder:text-white/80"

export function HeroSection() {
  return (
    <section className="relative isolate -mt-24 overflow-hidden sm:-mt-[114px]">
      {/* Planet backdrop — globe.png is 1440x1882, matching the design canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-20 h-[1882px] w-[1440px] -translate-x-1/2 w-full min-h-screen max-w-none"
      >
        <Image
          src={globe}
          alt=""
          fill
          priority
          sizes="1440px"
          className=" object-cover object-top brightness-[0.7] mx-100%"
        />
      </div>

    
      {/* Decorative backdrop extracted from the design file */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Starfield */}
        <div className="absolute top-[240px] left-1/2 h-[500px] w-[1180px] -translate-x-1/2 opacity-60 sm:top-[360px] lg:top-[424px] lg:h-[731px]">
          <Image
            src={dots}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1180px, 100vw"
            className="object-fill"
          />
        </div>

        {/* Violet bloom behind the stats */}
        <div
          className="absolute top-[440px] left-1/2 h-[760px] w-[960px] -translate-x-1/2 rounded-full blur-[100px] sm:top-[560px] lg:top-[707px] lg:h-[1037px] lg:w-[1208px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(92,83,254,0.85) 0%, rgba(92,83,254,0.5) 38%, rgba(92,83,254,0.32) 62%, rgba(92,83,254,0) 100%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[832px] flex-col items-center px-5 pt-48 text-center sm:px-6 sm:pt-[242px] lg:pt-[274px]">
        {/* Eyebrow badge */}
        <div className="flex h-[50px] items-center justify-center">
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-r from-[#010123] to-[#a8a8a8]/70 sm:block"
          />
          <span className="flex h-10 items-center gap-3 rounded-full border border-white/10 bg-[#242424] px-4 shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.1)] sm:h-12 sm:gap-4 sm:px-6">
            <SparklesIcon className="size-4 shrink-0 text-white sm:size-6" />
            <span className="font-eyebrow text-[13px] whitespace-nowrap text-white sm:text-xl">
              50,000+ new jobs this month
            </span>
          </span>
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-l from-[#010123] to-[#a8a8a8]/70 sm:block"
          />
        </div>

        {/* Headline */}
        <h1 className="mt-6 font-display text-[40px] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-white sm:mt-8 sm:text-[48px] lg:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-[784px] font-display text-base leading-[1.6] text-white/70 sm:text-lg lg:text-xl">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search */}
        <div className="mt-8 w-full sm:mt-10 lg:mt-12">
          <form
            action="/jobs"
            method="get"
            role="search"
            className="flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 transition-colors focus-within:border-white/35 sm:h-16 sm:flex-row sm:items-center sm:gap-6 sm:pr-2 sm:pl-6"
          >
            <label className={fieldClass}>
              <span className="sr-only">Job title, skill or company</span>
              <SearchIcon className="size-5 shrink-0 text-white sm:size-6" />
              <input
                type="search"
                name="q"
                placeholder="Job title, skill or company"
                className={inputClass}
              />
            </label>

            <span aria-hidden className="hidden h-[23px] w-px bg-white/20 sm:block" />

            <label className={fieldClass}>
              <span className="sr-only">Location or remote</span>
              <MapPinIcon className="size-5 shrink-0 text-white sm:size-6" />
              <input
                type="search"
                name="location"
                placeholder="Location or Remote"
                className={inputClass}
              />
            </label>

            <button
              type="submit"
              aria-label="Search jobs"
              className="flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-white/30 focus-visible:outline-none sm:size-12 sm:w-12"
            >
              <SearchIcon className="size-6" />
            </button>
          </form>

          {/* Trending searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <span className="font-display text-sm text-white/70 sm:text-base">
              Trending Position
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TRENDING_POSITIONS.map((position) => (
                <Link
                  key={position}
                  href={`/jobs?q=${encodeURIComponent(position)}`}
                  className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 font-display text-xs leading-[1.5] text-white transition-colors hover:border-white/25 hover:bg-white/10 sm:text-sm"
                >
                  {position}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live stats */}
      <div className="mx-auto w-full max-w-[1368px] px-5 pt-40 pb-16 sm:px-6 sm:pt-52 lg:pt-[356px] lg:pb-[72px]">
        <h2 className="mx-auto max-w-[600px] text-center font-label text-[28px] leading-[1.3] font-medium tracking-[-1px] text-white/80 [text-shadow:0_1px_18px_rgba(1,1,3,0.55)] sm:text-[34px] lg:text-[40px]">
          Assisting over 15,000 job seekers find their dream positions.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {STATS.map(({ value, label, icon: Icon }) => (
            <article
              key={label}
              className={cn(
                "flex h-[220px] flex-col justify-between rounded-2xl border border-white/10 p-6",
                "bg-[linear-gradient(180deg,#313131_0%,#010101_72%)]",
                "lg:h-[254px]"
              )}
            >
              <Icon className="size-6 text-white" aria-hidden />
              <div>
                <p className="font-numeric text-[44px] leading-[1.15] font-semibold tracking-[-0.02em] text-white lg:text-[56px]">
                  {value}
                </p>
                <p className="mt-3 font-tight text-base text-white lg:mt-4 lg:text-lg">
                  {label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
