import {
    ArrowUpRight,
    Briefcase,
    CalendarCheck,
    CircleCheck,
    Clock,
    MapPin,
    Send,
    Sparkles,
    UserCheck,
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
 * Recruiter dashboard.
 * All numbers below are SAMPLE data. Later we replace them with real MongoDB queries.
 * Section ids (stats / job-posts / candidates) are the sidebar anchor targets.
 */

// Top stat cards — the same four numbers the page had before, now with icons.
const STATS = [
    {
        id: "active-jobs",
        label: "Active Jobs",
        value: "3",
        change: "2 closing this month",
        icon: Briefcase,
        tone: "purple" as const,
    },
    {
        id: "new-applicants",
        label: "New Applicants",
        value: "12",
        change: "+5 since yesterday",
        icon: Users,
        tone: "blue" as const,
    },
    {
        id: "interviews",
        label: "Interviews Scheduled",
        value: "4",
        change: "Next: tomorrow, 10:00",
        icon: CalendarCheck,
        tone: "green" as const,
    },
    {
        id: "offers",
        label: "Offers Sent",
        value: "1",
        change: "Waiting for reply",
        icon: Send,
        tone: "amber" as const,
    },
] as const

// Secondary one-line totals from the Figma design.
const TOTALS = [
    { id: "total-posts", label: "Total Job Posts", value: "3" },
    { id: "total-applicants", label: "Total Applicants", value: "12" },
    { id: "jobs-closed", label: "Jobs Closed", value: "1" },
] as const

// Applicants per job — reuses the numbers already shown in "Your job posts".
const APPLICANTS_PER_JOB = [
    { label: "Senior Frontend Engineer", value: "8", percent: 100, tone: "purple" as const },
    { label: "Product Designer", value: "4", percent: 50, tone: "blue" as const },
    { label: "Backend Developer", value: "0", percent: 3, tone: "gray" as const },
]

// Hiring funnel — each stage is a subset of the previous one.
const FUNNEL = [
    { label: "Applied", value: 12 },
    { label: "Screening", value: 5 },
    { label: "Interview", value: 4 },
    { label: "Offer", value: 1 },
]

// The original three job posts, now with extra detail.
const JOB_POSTS = [
    {
        id: "post-1",
        title: "Senior Frontend Engineer",
        place: "Remote",
        type: "Full-time",
        applicants: "8 applicants",
        status: "Active" as const,
        tone: "green" as const,
    },
    {
        id: "post-2",
        title: "Product Designer",
        place: "Hybrid — New York",
        type: "Full-time",
        applicants: "4 applicants",
        status: "Active" as const,
        tone: "green" as const,
    },
    {
        id: "post-3",
        title: "Backend Developer",
        place: "On-site — Austin",
        type: "Contract",
        applicants: "0 applicants",
        status: "Draft" as const,
        tone: "gray" as const,
    },
] as const

// The original two candidates to review.
const CANDIDATES = [
    {
        id: "cand-1",
        name: "Alex Morgan",
        role: "Senior Frontend Engineer",
        status: "New",
        tone: "purple" as const,
    },
    {
        id: "cand-2",
        name: "Priya Shah",
        role: "Product Designer",
        status: "Interview",
        tone: "green" as const,
    },
] as const

// Newest applications, matching the "Recent Applications" block in the design.
const RECENT_APPLICATIONS = [
    {
        id: "recent-1",
        name: "Alex Morgan",
        job: "Senior Frontend Engineer",
        time: "10 minutes ago",
    },
    {
        id: "recent-2",
        name: "Priya Shah",
        job: "Product Designer",
        time: "1 hour ago",
    },
    {
        id: "recent-3",
        name: "Jordan Lee",
        job: "Senior Frontend Engineer",
        time: "3 hours ago",
    },
] as const

// "Alex Morgan" -> "AM"
function initials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
}

const RecruiterDashboardPage = () => {
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
                        Post jobs and manage the candidates who apply.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                    <CircleCheck className="size-4 text-emerald-500" />
                    Hiring pipeline is active
                </div>
            </header>

            {/* Recruiter-only statistics */}
            <section
                id="stats"
                aria-label="Recruiter statistics"
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

            {/* Extra totals from the Figma design */}
            <section
                aria-label="Recruiter totals"
                className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-3"
            >
                {TOTALS.map((total) => (
                    <div key={total.id}>
                        <p className="text-xs font-medium text-muted-foreground">
                            {total.label}
                        </p>
                        <p className="mt-1 text-xl font-semibold">{total.value}</p>
                    </div>
                ))}
            </section>

            {/* Applicant breakdown + hiring funnel */}
            <section className="grid gap-3 lg:grid-cols-2">
                <SectionCard
                    title="Applicants per job"
                    description="Where your candidates are coming from"
                    action={
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="size-3.5" />
                            +12%
                        </span>
                    }
                >
                    <BreakdownBar items={APPLICANTS_PER_JOB} />
                </SectionCard>

                <SectionCard
                    title="Hiring funnel"
                    description="How candidates move through your process"
                >
                    <BarChart data={FUNNEL} />
                </SectionCard>
            </section>

            {/* Recruiter-only job posting overview */}
            <SectionCard
                id="job-posts"
                title="Your job posts"
                description="Live roles and how many people applied"
            >
                <ul className="divide-y divide-border">
                    {JOB_POSTS.map((post) => (
                        <li
                            key={post.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#645AFF]/10 text-[#645AFF] dark:text-[#8E85FF]">
                                    <Briefcase className="size-4" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{post.title}</p>
                                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin className="size-3" />
                                            {post.place}
                                        </span>
                                        <span aria-hidden>•</span>
                                        <span>{post.type}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground">
                                    {post.applicants}
                                </span>
                                <StatusPill tone={post.tone}>{post.status}</StatusPill>
                            </div>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* Recruiter-only candidate management */}
            <SectionCard
                id="candidates"
                title="Candidates to review"
                description="People waiting for your decision"
            >
                <ul className="divide-y divide-border">
                    {CANDIDATES.map((candidate) => (
                        <li
                            key={candidate.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#645AFF] text-xs font-semibold text-white">
                                    {initials(candidate.name)}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-medium">
                                        {candidate.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {candidate.role}
                                    </p>
                                </div>
                            </div>

                            <StatusPill tone={candidate.tone}>
                                {candidate.status}
                            </StatusPill>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* Recent applications (from the Figma design) */}
            <SectionCard
                title="Recent applications"
                description="Newest people who applied to your jobs"
                action={
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <UserCheck className="size-3.5" />
                        12 total
                    </span>
                }
            >
                <ul className="divide-y divide-border">
                    {RECENT_APPLICATIONS.map((application) => (
                        <li
                            key={application.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <span className="flex min-w-0 items-center gap-2">
                                <span className="font-medium">{application.name}</span>
                                <span className="text-muted-foreground">
                                    applied for
                                </span>
                                <span className="truncate">{application.job}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="size-3.5" />
                                {application.time}
                            </span>
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

export default RecruiterDashboardPage;
