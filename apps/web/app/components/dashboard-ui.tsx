import type { LucideIcon } from "lucide-react"

/**
 * Small building blocks shared by the three dashboards.
 * No hooks and no "use client" here, so both server and client pages can use them.
 *
 * Keeping these styles in one file means a colour change happens in one place,
 * not in three page files.
 */

// A colour name we can pass around instead of long Tailwind class strings.
export type Tone = "purple" | "amber" | "green" | "blue" | "gray" | "red"

// Soft background + readable text, tested in light AND dark mode.
export const TONE_CLASSES: Record<Tone, string> = {
    purple: "bg-[#645AFF]/10 text-[#645AFF] dark:text-[#8E85FF]",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    blue: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    gray: "bg-muted text-muted-foreground",
    red: "bg-red-500/10 text-red-600 dark:text-red-400",
}

// Solid dot colours for the activity timeline.
export const DOT_CLASSES: Record<Tone, string> = {
    purple: "bg-[#645AFF]",
    amber: "bg-amber-500",
    green: "bg-emerald-500",
    blue: "bg-sky-500",
    gray: "bg-muted-foreground/50",
    red: "bg-red-500",
}

/** A rounded status badge, e.g. "Under review" or "Paid". */
export function StatusPill({
    tone = "gray",
    children,
}: {
    tone?: Tone
    children: React.ReactNode
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}
        >
            {children}
        </span>
    )
}

/** One number card at the top of a dashboard. */
export function StatCard({
    label,
    value,
    change,
    icon: Icon,
    tone = "purple",
}: {
    label: string
    value: string
    change?: string
    icon: LucideIcon
    tone?: Tone
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-[#645AFF]/40">
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${TONE_CLASSES[tone]}`}
                >
                    <Icon className="size-4" />
                </span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
            {change && (
                <p className="mt-1 text-xs text-muted-foreground">{change}</p>
            )}
        </div>
    )
}

/** A titled card wrapper, so every section has the same border and padding. */
export function SectionCard({
    id,
    title,
    description,
    action,
    className,
    children,
}: {
    id?: string
    title: string
    description?: string
    action?: React.ReactNode
    className?: string
    children: React.ReactNode
}) {
    return (
        <section
            id={id}
            className={`scroll-mt-20 rounded-xl border border-border bg-card p-4 ${className ?? ""}`}
        >
            <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    {description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
                {action}
            </div>
            <div className="mt-3">{children}</div>
        </section>
    )
}

/** Vertical CSS bar chart (used for time series like applications or revenue). */
export function BarChart({
    data,
    unit = "",
}: {
    data: { label: string; value: number }[]
    unit?: string
}) {
    // The tallest bar fills the chart, every other bar is relative to it.
    const max = Math.max(...data.map((item) => item.value), 1)

    return (
        <div>
            <div className="flex h-44 items-end gap-3 border-b border-border pb-2">
                {data.map((item) => (
                    <div
                        key={item.label}
                        className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                        <span className="text-[11px] font-medium text-muted-foreground">
                            {item.value}
                            {unit}
                        </span>
                        <div
                            className="w-full rounded-t-md bg-[#645AFF]/25 transition-colors group-hover:bg-[#645AFF]"
                            style={{ height: `${(item.value / max) * 100}%` }}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-2 flex gap-3">
                {data.map((item) => (
                    <span
                        key={item.label}
                        className="flex-1 text-center text-[11px] text-muted-foreground"
                    >
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    )
}

/** Horizontal bars, good for "share of total" breakdowns. */
export function BreakdownBar({
    items,
}: {
    items: { label: string; value: string; percent: number; tone?: Tone }[]
}) {
    const fill: Record<Tone, string> = {
        purple: "bg-[#645AFF]",
        amber: "bg-amber-500",
        green: "bg-emerald-500",
        blue: "bg-sky-500",
        gray: "bg-muted-foreground/60",
        red: "bg-red-500",
    }

    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item.label}>
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className={`h-full rounded-full ${fill[item.tone ?? "purple"]}`}
                            style={{ width: `${item.percent}%` }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}
