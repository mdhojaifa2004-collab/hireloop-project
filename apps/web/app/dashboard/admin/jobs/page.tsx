
"use client"

import { useEffect, useMemo, useState } from "react"
import {
    Briefcase,
    CheckCircle2,
    Clock,
    XCircle,
    Search,
} from "lucide-react"

import {
    SectionCard,
    StatCard,
    StatusPill,
} from "../../../components/dashboard-ui"
import {
    getJobs,
    updateJob,
    type JobRecord,
} from "@/lib/actions/job"

// FIX: Explicit job status and category types.
type JobStatus = "Active" | "Pending" | "Rejected"

type AdminJob = {
    id: string
    title: string
    company: string
    category: string
    location: string
    posted: string
    status: JobStatus
}

/**
 * Convert a MongoDB job document into the shape this table renders.
 * Real jobs created by recruiters have no approval status yet, so they are
 * treated as Active; an explicit Pending/Rejected value is preserved.
 */
function toAdminJob(job: JobRecord): AdminJob {
    const status: JobStatus =
        job.status === "Pending" || job.status === "Rejected"
            ? job.status
            : "Active"

    return {
        id: job._id,
        title: job.title || "Untitled job",
        company: job.company || "Company not specified",
        category: job.category || "Other",
        location: job.remote ? "Remote" : job.location || "Not specified",
        posted: job.createdAt
            ? new Date(job.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
              })
            : "—",
        status,
    }
}

export default function ManageJobsPage() {
    const [jobs, setJobs] = useState<AdminJob[]>([])
    const [search, setSearch] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All Categories")
    const [statusFilter, setStatusFilter] = useState("All Status")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    // FIX: Read the real jobs collection instead of the old hardcoded rows.
    useEffect(() => {
        let isMounted = true

        getJobs()
            .then((records) => {
                if (isMounted) setJobs(records.map(toAdminJob))
            })
            .catch((err: unknown) => {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Could not load jobs from the database."
                    )
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [])

    // Build the category filter from the data so new categories appear.
    const categoryOptions = useMemo(
        () =>
            Array.from(new Set(jobs.map((job) => job.category).filter(Boolean))).sort(),
        [jobs]
    )

    // FIX: Search, category, and status filters work together.
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                `${job.title} ${job.company}`.toLowerCase().includes(search.toLowerCase())

            const matchesCategory =
                categoryFilter === "All Categories" || job.category === categoryFilter

            const matchesStatus =
                statusFilter === "All Status" || job.status === statusFilter

            return matchesSearch && matchesCategory && matchesStatus
        })
    }, [jobs, search, categoryFilter, statusFilter])

    // FIX: Approve/reject now writes to MongoDB through PATCH /jobs/:id.
    const updateJobStatus = async (id: string, nextStatus: JobStatus) => {
        try {
            setUpdatingId(id)
            setError("")

            await updateJob(id, { status: nextStatus })

            setJobs((currentJobs) =>
                currentJobs.map((job) =>
                    job.id === id ? { ...job, status: nextStatus } : job
                )
            )
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not update the job status."
            )
        } finally {
            setUpdatingId(null)
        }
    }

    const stats = [
        { label: "Total Job Posts", value: jobs.length.toLocaleString(), change: "All listed jobs", icon: Briefcase, tone: "purple" as const },
        { label: "Active Jobs", value: jobs.filter((job) => job.status === "Active").length.toLocaleString(), change: "Currently active", icon: CheckCircle2, tone: "green" as const },
        { label: "Pending Review", value: jobs.filter((job) => job.status === "Pending").length.toLocaleString(), change: "Awaiting approval", icon: Clock, tone: "amber" as const },
        { label: "Rejected Jobs", value: jobs.filter((job) => job.status === "Rejected").length.toLocaleString(), change: "Not approved", icon: XCircle, tone: "red" as const },
    ]

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header>
                <p className="text-xs font-medium text-muted-foreground">
                    Admin / Manage Jobs
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Manage Jobs
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review and manage job posts across the platform.
                </p>
            </header>

            {error && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
                >
                    {error}
                </div>
            )}

            <section
                aria-label="Job statistics"
                className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
                {stats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        tone={stat.tone}
                    />
                ))}
            </section>

            <SectionCard
                title="All Job Posts"
                description="Review job details and manage approval status."
                action={
                    <span className="rounded-lg bg-[#645AFF]/10 px-3 py-2 text-xs font-medium text-[#645AFF] dark:text-[#8E85FF]">
                        {filteredJobs.length} Jobs
                    </span>
                }
            >
                <div className="mb-4 flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search job title or company..."
                            aria-label="Search jobs"
                            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>

                    <select
                        value={categoryFilter}
                        onChange={(event) => setCategoryFilter(event.target.value)}
                        aria-label="Filter by category"
                        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none"
                    >
                        <option>All Categories</option>
                        {categoryOptions.map((category) => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        aria-label="Filter by status"
                        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none"
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Rejected</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-border text-xs text-muted-foreground">
                                <th className="px-3 py-3 font-medium">Job Title</th>
                                <th className="px-3 py-3 font-medium">Company</th>
                                <th className="px-3 py-3 font-medium">Category</th>
                                <th className="px-3 py-3 font-medium">Location</th>
                                <th className="px-3 py-3 font-medium">Date Posted</th>
                                <th className="px-3 py-3 font-medium">Status</th>
                                <th className="px-3 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {loading && (
                                <tr>
                                    <td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                                        Loading jobs from the database...
                                    </td>
                                </tr>
                            )}

                            {!loading && filteredJobs.map((job) => (
                                <tr key={job.id} className="transition-colors hover:bg-muted/40">
                                    <td className="px-3 py-4 font-medium">{job.title}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{job.company}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{job.category}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{job.location}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{job.posted}</td>
                                    <td className="px-3 py-4">
                                        <StatusPill
                                            tone={
                                                job.status === "Active" ? "green" :
                                                job.status === "Pending" ? "amber" : "red"
                                            }
                                        >
                                            {job.status}
                                        </StatusPill>
                                    </td>
                                    <td className="px-3 py-4">
                                        <div className="flex justify-end gap-3">
                                            {job.status !== "Active" && (
                                                <button
                                                    type="button"
                                                    onClick={() => updateJobStatus(job.id, "Active")}
                                                    disabled={updatingId === job.id}
                                                    className="text-xs font-medium text-emerald-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {job.status !== "Rejected" && (
                                                <button
                                                    type="button"
                                                    onClick={() => updateJobStatus(job.id, "Rejected")}
                                                    disabled={updatingId === job.id}
                                                    className="text-xs font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {!loading && filteredJobs.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                                        No jobs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </SectionCard>

            {/* Live data: rows and approval changes come from the jobs API. */}
            <p className="text-xs text-muted-foreground">
                {loading
                    ? "Loading live jobs from the database."
                    : `Showing ${jobs.length} job${jobs.length === 1 ? "" : "s"} from the database.`}
            </p>
        </div>
    )
}
