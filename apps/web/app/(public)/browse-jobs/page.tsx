import type { Metadata } from "next"

import { SearchBar } from "@/components/browse-jobs/search-bar"
import { JobFilters } from "@/components/browse-jobs/job-filters"

export const metadata: Metadata = {
  title: "Browse Jobs - HireLoop",
  description:
    "Search thousands of curated job openings on HireLoop by title, location, category and work mode.",
}

/**
 * Browse Jobs page.
 *
 * The search bar and the filters are UI only (no state, no requests) and the
 * results section is empty until real job data is connected.
 */
export default function BrowseJobsPage() {
  return (
    <main className="mx-auto w-full max-w-[1368px] px-5 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20">
      <header className="max-w-[720px]">
        {/* Small accent badge. #645AFF is used only on this page. */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-eyebrow text-[11px] tracking-[0.18em] text-white/70 uppercase">
          <span aria-hidden className="size-1.5 rounded-full bg-[#645AFF]" />
          50,000+ open roles
        </span>

        <h1 className="mt-4 font-display text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[40px] lg:text-[48px]">
          Browse Jobs
        </h1>

        <p className="mt-3 font-display text-sm leading-[1.7] text-white/70 sm:text-base">
          Find your next role by job title, location, category and work mode.
        </p>
      </header>

      {/* Search bar and filters. Neither one filters anything yet. */}
      <div id="job-search-and-filters" className="mt-8 space-y-4 sm:mt-10">
        <SearchBar />
        <JobFilters />
      </div>

      {/* Results area: real job cards will be added when data is connected. */}
      <section aria-label="Job results" className="mt-10 sm:mt-12" />
    </main>
  )
}
