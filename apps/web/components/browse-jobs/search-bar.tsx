"use client"

import { SearchIcon } from "lucide-react"

/**
 * Browse Jobs search bar.
 *
 * Visual only for now: it never sends a request and never changes the URL.
 * The real search logic will be connected later in this form's onSubmit.
 */
export function SearchBar() {
  return (
    <form
      role="search"
      // Stops the browser from reloading the page when the button is pressed.
      onSubmit={(event) => event.preventDefault()}
      className="flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 transition-colors focus-within:border-white/35 sm:h-16 sm:flex-row sm:items-center sm:gap-4 sm:pr-2 sm:pl-6"
    >
      <label className="flex h-12 flex-1 items-center gap-2 rounded-xl px-3 sm:h-auto sm:px-0">
        <span className="sr-only">Job title, skill or company</span>
        <SearchIcon className="size-5 shrink-0 text-white sm:size-6" aria-hidden />
        <input
          type="search"
          name="q"
          placeholder="Job title, skill or company"
          className="w-full min-w-0 bg-transparent font-sans text-base leading-[1.7] text-white outline-none placeholder:text-white/80"
        />
      </label>

      <button
        type="submit"
        aria-label="Search jobs"
        className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#645AFF] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#645AFF]/90 focus-visible:ring-3 focus-visible:ring-white/30 focus-visible:outline-none sm:w-auto"
      >
        <SearchIcon className="size-5 sm:hidden" aria-hidden />
        Search
      </button>
    </form>
  )
}
