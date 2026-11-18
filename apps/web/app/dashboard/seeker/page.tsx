import {
    ArrowUpRight,
    Bookmark,
    Briefcase,
    CalendarCheck,
    CircleCheck,
    Clock,
    FileText,
    MapPin,
    Sparkles,
    Target,
    Trophy,
} from "lucide-react"

import {
    BarChart,
    DOT_CLASSES,
    SectionCard,
    StatCard,
    StatusPill,
} from "../../components/dashboard-ui"

/**
 * Seeker dashboard.
 * All numbers below are SAMPLE data. Later we replace them with real MongoDB queries.
 * Section ids (stats / recommended-jobs / applications) are the sidebar anchor targets.
 */

// Top stat cards — labels match the Figma design.
const STATS = [
    {
        id: "saved",
        label: "Saved Jobs",
        value: "12",
        change: "+3 this week",
        icon: Bookmark,
        tone: "purple" as const,
    },
    {
        id: "applied",
        label: "Applications Submitted",
        value: "7",
        change: "+2 this week",
        icon: FileText,
        tone: "blue" as const,
    },
    {
        id: "interviews",
        label: "Interviews Scheduled",
        value: "2",
        change: "1 upcoming",
        icon: CalendarCheck,
        tone: "green" as const,
    },
    {
        id: "offers",
        label: "Offers Received",
        value: "1",
        change: "Awaiting reply",
        icon: Trophy,
        tone: "amber" as const,
    },
] as const

// Applications sent per month, drawn as CSS bars (no chart library needed).
const APPLICATION_ACTIVITY = [
    { label: "Mar", value: 2 },
    { label: "Apr", value: 4 },
    { label: "May", value: 3 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 5 },
    { label: "Aug", value: 8 },
]

const RECENT_ACTIVITY = [
    {
        id: "activity-1",
        text: "Application for Senior Product Designer at TechFlow updated to 'Under Review'",
        time: "2 hours ago",
        tone: "purple" as const,
    },
    {
        id: "activity-2",
        text: "Interview scheduled with Nova Labs for Frontend Engineer",
        time: "Yesterday",
        tone: "green" as const,
    },
    {
        id: "activity-3",
        text: "Your profile was viewed by 4 recruiters",
        time: "2 days ago",
        tone: "blue" as const,
    },
    {
        id: "activity-4",
        text: "You saved React Developer at Pixel Works",
        time: "3 days ago",
        tone: "gray" as const,
    },
] as const

// Original three jobs, now with a little more detail.
const RECOMMENDED_JOBS = [
    {
        id: "job-1",
        title: "Frontend Engineer",
        company: "Nova Labs",
        place: "Remote",
        type: "Full-time",
        salary: "$90k – $120k",
        posted: "Saved 2 hours ago",
    },
    {
        id: "job-2",
        title: "React Developer",
        company: "Pixel Works",
        place: "Hybrid",
        type: "Full-time",
        salary: "$80k – $110k",
        posted: "Saved yesterday",
    },
    {
        id: "job-3",
        title: "UI Engineer",
        company: "Bright Studio",
        place: "On-site",
        type: "Contract",
        salary: "$70k – $95k",
        posted: "Saved 3 days ago",
    },
] as const

// Original two applications, now with a coloured status badge.
const APPLICATIONS = [
    {
        id: "app-1",
        title: "Frontend Engineer",
        company: "Nova Labs",
        status: "Interview",
        tone: "purple" as const,
    },
    {
        id: "app-2",
        title: "React Developer",
        company: "Pixel Works",
        status: "Under review",
        tone: "amber" as const,
    },
] as const

const SeekerDashboardPage = () => {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-[#645AFF]/10 px-3 py-1 text-xs font-semibold text-[#645AFF] dark:text-[#8E85FF]">
                        <Sparkles className="size-3.5" />
                        Welcome back
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                        Seeker Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Search jobs, track applications, and improve your profile.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                    <Clock className="size-4" />
                    Last updated: today
                </div>
            </header>

            {/* Seeker-only statistics */}
            <section
                id="stats"
                aria-label="Seeker statistics"
                className="grid scroll-mt-20 gap-3 sm:grid-cols-2 lg:grid-cols-4"
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

            {/* Chart + profile strength, side by side on large screens */}
            <section className="grid gap-3 lg:grid-cols-3">
                <SectionCard
                    className="lg:col-span-2"
                    title="Application activity"
                    description="Applications sent over the last 6 months"
                    action={
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="size-3.5" />
                            +18%
                        </span>
                    }
                >
                    <BarChart data={APPLICATION_ACTIVITY} />
                </SectionCard>

                {/* Profile strength (kept from the original page) */}
                <SectionCard
                    title="Profile strength"
                    description="A complete profile gets 3x more recruiter views."
                >
                    <p className="text-3xl font-semibold">80%</p>

                    {/* Progress bar: the fill width comes from the 80% number */}
                    <div
                        role="progressbar"
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Profile strength"
                        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
                    >
                        <div
                            className="h-full rounded-full bg-[#645AFF]"
                            style={{ width: "80%" }}
                        />
                    </div>

                    <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <CircleCheck className="size-4 text-emerald-500" />
                            Resume uploaded
                        </li>
                        <li className="flex items-center gap-2">
                            <CircleCheck className="size-4 text-emerald-500" />
                            Skills added
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                            <Target className="size-4" />
                            Add a portfolio link
                        </li>
                    </ul>
                </SectionCard>
            </section>

            {/* Recent activity timeline */}
            <SectionCard title="Recent activity">
                <ul className="space-y-3">
                    {RECENT_ACTIVITY.map((item) => (
                        <li key={item.id} className="flex gap-3">
                            <span
                                aria-hidden
                                className={`mt-1.5 size-2 shrink-0 rounded-full ${DOT_CLASSES[item.tone]}`}
                            />
                            <div className="min-w-0">
                                <p className="text-sm">{item.text}</p>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* Seeker-only job search overview */}
            <SectionCard
                id="recommended-jobs"
                title="Recommended jobs"
                description="Matched to your profile"
            >
                <ul className="divide-y divide-border">
                    {RECOMMENDED_JOBS.map((job) => (
                        <li
                            key={job.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#645AFF]/10 text-xs font-semibold text-[#645AFF] dark:text-[#8E85FF]">
                                    {job.company.slice(0, 2).toUpperCase()}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-medium">
                                        {job.title} — {job.company}
                                    </p>
                                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin className="size-3" />
                                            {job.place}
                                        </span>
                                        <span aria-hidden>•</span>
                                        <span>{job.type}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-medium">{job.salary}</p>
                                <p className="text-xs text-muted-foreground">{job.posted}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* Seeker-only application tracking */}
            <SectionCard
                id="applications"
                title="Application status"
                description="Track your job applications and interview progress in real-time."
                action={
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Briefcase className="size-3.5" />
                        2 active
                    </span>
                }
            >
                <ul className="divide-y divide-border">
                    {APPLICATIONS.map((application) => (
                        <li
                            key={application.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <span>
                                {application.title} — {application.company}
                            </span>
                            <StatusPill tone={application.tone}>
                                {application.status}
                            </StatusPill>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            <p className="text-xs text-muted-foreground">
                Sample data for now — replace these numbers with real MongoDB queries later.
            </p>
        </div>
    );
};

export default SeekerDashboardPage;
