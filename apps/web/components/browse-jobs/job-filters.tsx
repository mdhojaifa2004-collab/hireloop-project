import { ChevronDownIcon } from "lucide-react"

import { FilterField } from "./filter-field"

/**
 * Browse Jobs filters.
 *
 * UI only: there is no state, no filtering and no request. The controls simply
 * show their options. Real filtering will be connected later.
 *
 * Options come from the values the "Add New Job" form already uses, so the
 * filters match the real `JobInput` fields (category, jobType, location,
 * remote, minSalary, maxSalary).
 */

// Same categories as the Add New Job form.
const CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Business",
  "Finance",
  "Customer Support",
  "Other",
] as const

// Same job types as the Add New Job form.
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const

// Work mode comes from the single `remote` boolean in JobInput.
const WORK_MODES = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
] as const

type SelectOption = { value: string; label: string }

// Most selects use the same text for the value and the label.
function toOptions(values: readonly string[]): SelectOption[] {
  return values.map((value) => ({ value, label: value }))
}

const CATEGORY_OPTIONS = toOptions(CATEGORIES)
const JOB_TYPE_OPTIONS = toOptions(JOB_TYPES)

// Shared look for every control, so selects and inputs match the SearchBar.
const controlClass =
  "h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white transition-colors outline-none placeholder:text-white/40 focus:border-[#645AFF]/70 focus:bg-white/[0.06]"

// Native options need their own colours, otherwise Windows renders them white.
const optionClass = "bg-[#101010] text-white"

/**
 * One native <select> with the shared styling and a chevron icon.
 * Used three times, so keeping it in one place avoids repeating the markup.
 */
function SelectControl({
  id,
  name,
  placeholder,
  options,
}: {
  id: string
  name: string
  /** Label of the empty "no filter" option. */
  placeholder: string
  options: readonly SelectOption[]
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue=""
        className={`${controlClass} appearance-none pr-10`}
      >
        <option value="" className={optionClass}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className={optionClass}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-white/40"
      />
    </div>
  )
}

export function JobFilters() {
  return (
    <section
      aria-label="Job filters"
      className="rounded-2xl border border-white/20 bg-[#101010] p-4 sm:p-5"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className="size-1.5 rounded-full bg-[#645AFF]" />
        <h2 className="font-display text-sm font-semibold text-white">
          Filters
        </h2>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FilterField label="Category" htmlFor="filter-category">
          <SelectControl
            id="filter-category"
            name="category"
            placeholder="All categories"
            options={CATEGORY_OPTIONS}
          />
        </FilterField>

        <FilterField label="Job type" htmlFor="filter-job-type">
          <SelectControl
            id="filter-job-type"
            name="jobType"
            placeholder="All job types"
            options={JOB_TYPE_OPTIONS}
          />
        </FilterField>

        {/* Location is free text in the database, so a text input avoids making up a city list. */}
        <FilterField label="Location" htmlFor="filter-location">
          <input
            id="filter-location"
            name="location"
            type="text"
            placeholder="City or country"
            className={controlClass}
          />
        </FilterField>

        <FilterField label="Work mode" htmlFor="filter-work-mode">
          <SelectControl
            id="filter-work-mode"
            name="workMode"
            placeholder="Any work mode"
            options={WORK_MODES}
          />
        </FilterField>

        {/* Salary uses the existing minSalary / maxSalary fields. */}
        <FilterField
          label="Salary range"
          htmlFor="filter-salary-min"
          className="sm:col-span-2"
        >
          <div className="flex items-center gap-2">
            <input
              id="filter-salary-min"
              name="minSalary"
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Min"
              className={controlClass}
            />
            <span aria-hidden className="text-white/40">
              -
            </span>
            <input
              id="filter-salary-max"
              name="maxSalary"
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Max"
              aria-label="Maximum salary"
              className={controlClass}
            />
          </div>
        </FilterField>
      </div>
    </section>
  )
}
