import Link from "next/link"
import {
    ArrowUpRight,
    Briefcase,
    CalendarCheck,
    Clock,
    MapPin,
    Plus,
    Sparkles,
    Trophy,
    Users,
} from "lucide-react"

import {
    BarChart,
    BreakdownBar,
    SectionCard,
    StatCard,
    StatusPill,
} from "../../components/dashboard-ui"

/**
 * Recruiter dashboard overview.
 *
 * FIX: This file used to be a copy of the recruiter layout, so the page rendered
 * a second sidebar inside <main> and had no dashboard content. It is now a real
 * overview page that uses the shared dashboard-ui components.
 * All numbers below are SAMPLE data until the backend API is connected.
 */

const STATS = [
    {
        id: "active-jobs",
        label: "Active Job Posts",
        value: "3",
        change: "2 closing this month",
        icon: Briefcase,
        tone: "purple" as const,
    },
    {
        id: "applicants",
        label: "Total Applicants",
        value: "100",
        change: "+18 this week",
        icon: Users,
        tone: "blue" as const,
    },
    {
        id: "interviews",
        label: "Interviews Scheduled",
        value: "6",
        change: "3 upcoming",
        icon: CalendarCheck,
        tone: "green" as const,
    },
    {
        id: "hired",
        label: "Hired This Month",
        value: "2",
        change: "Offers accepted",
        icon: Trophy,
        tone: "amber" as const,
    },
] as const

// Applications received per month (sample).
const APPLICANT_ACTIVITY = [
    { label: "Mar", value: 9 },
    { label: "Apr", value: 14 },
    { label: "May", value: 11 },
    { label: "Jun", value: 18 },
    { label: "Jul", value: 16 },
    { label: "Aug", value: 23 },
]

// Where applicants currently sit in the pipeline (sample).
const PIPELINE = [
    { label: "New applications", value: "34", percent: 100, tone: "purple" as const },
    { label: "In review", value: "21", percent: 62, tone: "blue" as const },
    { label: "Interviewing", value: "6", percent: 18, tone: "green" as const },
    { label: "Hired", value: "2", percent: 6, tone: "amber" as const },
]

const JOB_POSTS = [
    {
        id: 1,
        title: "Frontend Developer",
        category: "Engineering & Tech",
        place: "Dhaka",
        applicants: 24,
        status: "Active",
        tone: "green" as const,
    },
    {
        id: 2,
        title: "Senior Product Designer",
        category: "Design",
        place: "Hybrid",
        applicants: 18,
        status: "Active",
        tone: "green" as const,
    },
    {
        id: 3,
        title: "DevOps Specialist",
        category: "Engineering & Tech",
        place: "Remote",
        applicants: 12,
        status: "Active",
        tone: "green" as const,
    },
] as const

// Next interviews on the calendar (sample).
const UPCOMING_INTERVIEWS = [
    {
        id: "interview-1",
        candidate: "Ayesha Rahman",
        role: "Frontend Developer",
        time: "Today · 3:00 PM",
    },
    {
        id: "interview-2",
        candidate: "Daniel Kim",
        role: "Senior Product Designer",
        time: "Tomorrow · 11:30 AM",
    },
    {
        id: "interview-3",
        candidate: "Fatima Noor",
        role: "Frontend Developer",
        time: "Nov 22 · 1:00 PM",
    },
] as const

export default function RecruiterDashboardPage() {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-[#645AFF]/10 px-3 py-1 text-xs font-semibold text-[#645AFF] dark:text-[#8E85FF]">
                        <Sparkles className="size-3.5" />
                        Recruiter workspace
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                        Recruiter Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Post jobs, review applicants and keep hiring on track.
                    </p>
                </div>

                <Link
                    href="/dashboard/recruiter/new"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#645AFF] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5146e8] focus-visible:ring-2 focus-visible:ring-[#645AFF]/60 focus-visible:outline-none"
                >
                    <Plus className="size-4" />
                    Post a Job
                </Link>
            </header>

            {/* Recruiter-only statistics */}
            <section
                aria-label="Recruiter statistics"
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
                {STATS.map((stat) => (
                    <StatCard
                        key={stat.id}
                        label={stat.label}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        tone={stat.tone}
                    />
                ))}
            </section>

            {/* Applicant activity + pipeline */}
            <section className="grid gap-3 lg:grid-cols-3">
                <SectionCard
                    className="lg:col-span-2"
                    title="Applicant activity"
                    description="Applications received over the last 6 months"
                    action={
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="size-3.5" />
                            +11.4%
                        </span>
                    }
                >
                    <BarChart data={APPLICANT_ACTIVITY} />
                </SectionCard>

                <SectionCard
                    title="Hiring pipeline"
                    description="Where your applicants are right now"
                >
                    <BreakdownBar items={PIPELINE} />

                    <div className="mt-4 rounded-lg bg-muted/60 p-3">
                        <p className="text-xs text-muted-foreground">
                            Response rate (7 days)
                        </p>
                        <p className="mt-1 text-lg font-semibold">86%</p>
                    </div>
                </SectionCard>
            </section>

            {/* Current job posts */}
            <SectionCard
                title="Your job posts"
                description="Open roles and how many people applied"
                action={
                    <Link
                        href="/dashboard/recruiter/manage-jobs"
                        className="text-xs font-medium text-[#645AFF] hover:underline dark:text-[#8E85FF]"
                    >
                        Manage all
                    </Link>
                }
            >
                <ul className="divide-y divide-border">
                    {JOB_POSTS.map((job) => (
                        <li
                            key={job.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#645AFF]/10 text-[#645AFF] dark:text-[#8E85FF]">
                                    <Briefcase className="size-4" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-medium">
                                        {job.title}
                                    </p>
                                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        <span>{job.category}</span>
                                        <span aria-hidden>•</span>
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin className="size-3" />
                                            {job.place}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground">
                                    {job.applicants} applicants
                                </span>
                                <StatusPill tone={job.tone}>{job.status}</StatusPill>
                                {/* FIX: These overview rows are sample data, so
                                    link to the live management list instead of a
                                    demo id that does not exist in MongoDB. */}
                                <Link
                                    href="/dashboard/recruiter/manage-jobs"
                                    aria-label="Manage job posts"
                                    className="text-xs font-medium text-[#645AFF] hover:underline dark:text-[#8E85FF]"
                                >
                                    Manage
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* Upcoming interviews */}
            <SectionCard
                title="Upcoming interviews"
                description="Your next conversations with candidates"
            >
                <ul className="space-y-3">
                    {UPCOMING_INTERVIEWS.map((interview) => (
                        <li key={interview.id} className="flex gap-3">
                            <span
                                aria-hidden
                                className="mt-1.5 size-2 shrink-0 rounded-full bg-[#645AFF]"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-medium">
                                    {interview.candidate} — {interview.role}
                                </p>
                                <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="size-3" />
                                    {interview.time}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            <p className="text-xs text-muted-foreground">
                Sample data for now — replace these numbers with real MongoDB
                queries when the recruiter API is connected.
            </p>
        </div>
    )
}
