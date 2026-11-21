import {
  BriefcaseBusinessIcon,
  Building2Icon,
  ClipboardListIcon,
  MapPinIcon,
  WalletIcon,
} from "lucide-react"

import type { JobRecord } from "@/lib/actions/job"

const NOT_SPECIFIED = "Not specified"

/** Some jobs are stored without a value, so show a friendly fallback. */
function textOr(value?: string | null) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : NOT_SPECIFIED
}

/**
 * Salary is stored as two text fields plus a frequency:
 * "500 - 5000 (Per month)", "From 500", "Up to 5000".
 */
function formatSalary(job: JobRecord) {
  const min = job.minSalary?.trim()
  const max = job.maxSalary?.trim()
  const frequency = job.frequency?.trim()

  if (!min && !max) return NOT_SPECIFIED

  const range =
    min && max ? `${min} - ${max}` : min ? `From ${min}` : `Up to ${max}`

  return frequency ? `${range} (${frequency})` : range
}

/** One small icon + text row inside a job card. */
function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPinIcon
  label: string
  value: string
}) {
  return (
    <li className="flex items-start gap-2">
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-white/40" />
      <span className="sr-only">{label}: </span>
      <span className="min-w-0 text-sm break-words text-white/70">{value}</span>
    </li>
  )
}

/**
 * One job from the backend.
 *
 * It only displays data; there is no detail page or click action yet.
 */
export function JobCard({ job }: { job: JobRecord }) {
  // `remote` is the only work-mode value the backend stores.
  const isRemote = job.remote === true

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#101010] p-5 transition-colors hover:border-[#645AFF]/60">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-snug font-semibold break-words text-white">
            {textOr(job.title)}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/60">
            <Building2Icon aria-hidden className="size-4 shrink-0" />
            <span className="truncate">{textOr(job.company)}</span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${
            isRemote
              ? "bg-[#645AFF]/15 text-[#a49eff]"
              : "bg-white/[0.06] text-white/60"
          }`}
        >
          {isRemote ? "Remote" : "On-site"}
        </span>
      </div>

      <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
        <MetaRow
          icon={BriefcaseBusinessIcon}
          label="Category"
          value={textOr(job.category)}
        />
        <MetaRow
          icon={ClipboardListIcon}
          label="Job type"
          value={textOr(job.jobType)}
        />
        <MetaRow icon={MapPinIcon} label="Location" value={textOr(job.location)} />
        <MetaRow icon={WalletIcon} label="Salary" value={formatSalary(job)} />
      </ul>
    </article>
  )
}
