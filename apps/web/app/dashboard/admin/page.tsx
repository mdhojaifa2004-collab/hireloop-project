import {
    ArrowUpRight,
    Briefcase,
    Building,
    Clock,
    CreditCard,
    ListChecks,
    ShieldCheck,
    Sparkles,
    UserCheck,
    Users,
    Wallet,
} from "lucide-react"

import {
    BarChart,
    BreakdownBar,
    SectionCard,
    StatCard,
    StatusPill,
} from "../../components/dashboard-ui"

/**
 * Admin dashboard.
 * All numbers below are SAMPLE data. Later we replace them with real MongoDB queries.
 * Section ids (stats / users) are the sidebar anchor targets.
 */

// The four numbers this page already showed, now with icons and extra detail.
const STATS = [
    {
        id: "total-users",
        label: "Total Users",
        value: "1,248",
        change: "+38 this week",
        icon: Users,
        tone: "purple" as const,
    },
    {
        id: "recruiters",
        label: "Recruiters",
        value: "96",
        change: "6 awaiting approval",
        icon: UserCheck,
        tone: "blue" as const,
    },
    {
        id: "seekers",
        label: "Seekers",
        value: "1,142",
        change: "91% of all users",
        icon: Users,
        tone: "green" as const,
    },
    {
        id: "pending",
        label: "Pending Approvals",
        value: "6",
        change: "Needs your review",
        icon: ShieldCheck,
        tone: "amber" as const,
    },
] as const

// Platform totals from the Figma design.
const PLATFORM_TOTALS = [
    {
        id: "companies",
        label: "Total Companies",
        value: "214",
        icon: Building,
        tone: "blue" as const,
    },
    {
        id: "jobs-posted",
        label: "Jobs Posted",
        value: "1,376",
        icon: Briefcase,
        tone: "purple" as const,
    },
    {
        id: "revenue",
        label: "Platform Revenue",
        value: "$48.2k",
        icon: Wallet,
        tone: "green" as const,
    },
] as const

// Monthly revenue in thousands of dollars (sample).
const MONTHLY_REVENUE = [
    { label: "Mar", value: 6.1 },
    { label: "Apr", value: 7.4 },
    { label: "May", value: 6.8 },
    { label: "Jun", value: 9.2 },
    { label: "Jul", value: 10.5 },
    { label: "Aug", value: 12.1 },
]

/*
 * User mix. These three numbers add up to the Total Users card:
 * 1,142 seekers + 96 recruiters + 10 admins = 1,248
 * The bars are relative to the biggest group, so they show real proportions.
 */
const USER_MIX = [
    { label: "Seekers", value: "1,142", percent: 100, tone: "purple" as const },
    { label: "Recruiters", value: "96", percent: 8.4, tone: "blue" as const },
    { label: "Admins", value: "10", percent: 0.9, tone: "amber" as const },
]

// The three management tasks that were already on the page.
const MANAGEMENT_TASKS = [
    {
        id: "task-1",
        label: "Approve new recruiter accounts",
        count: "6 pending",
        tone: "amber" as const,
    },
    {
        id: "task-2",
        label: "Review reported accounts",
        count: "2 open",
        tone: "red" as const,
    },
    {
        id: "task-3",
        label: "Manage user roles and permissions",
        count: "3 roles",
        tone: "gray" as const,
    },
] as const

// Recent subscription payments (from the Figma design).
const RECENT_TRANSACTIONS = [
    {
        id: "tx-1",
        company: "Nova Labs",
        plan: "Pro plan · monthly",
        amount: "$49.00",
        status: "Paid",
        tone: "green" as const,
    },
    {
        id: "tx-2",
        company: "Pixel Works",
        plan: "Enterprise · yearly",
        amount: "$299.00",
        status: "Paid",
        tone: "green" as const,
    },
    {
        id: "tx-3",
        company: "Bright Studio",
        plan: "Pro plan · monthly",
        amount: "$49.00",
        status: "Pending",
        tone: "amber" as const,
    },
] as const

const AdminDashboardPage = () => {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-[#645AFF]/10 px-3 py-1 text-xs font-semibold text-[#645AFF] dark:text-[#8E85FF]">
                        <Sparkles className="size-3.5" />
                        Admin console
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                        Admin Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Platform-wide statistics and user management.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    All systems operational
                </div>
            </header>

            {/* Admin-only statistics */}
            <section
                id="stats"
                aria-label="Admin statistics"
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

            {/* Platform totals */}
            <section
                aria-label="Platform totals"
                className="grid gap-3 sm:grid-cols-3"
            >
                {PLATFORM_TOTALS.map((total) => (
                    <div
                        key={total.id}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                    >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#645AFF]/10 text-[#645AFF] dark:text-[#8E85FF]">
                            <total.icon className="size-4" />
                        </span>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">
                                {total.label}
                            </p>
                            <p className="text-xl font-semibold">{total.value}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Revenue chart + user mix */}
            <section className="grid gap-3 lg:grid-cols-3">
                <SectionCard
                    className="lg:col-span-2"
                    title="Monthly revenue"
                    description="Subscription income in thousands of dollars"
                    action={
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="size-3.5" />
                            +15.2%
                        </span>
                    }
                >
                    <BarChart data={MONTHLY_REVENUE} unit="k" />
                </SectionCard>

                <SectionCard
                    title="User mix"
                    description="Who is on the platform right now"
                >
                    <BreakdownBar items={USER_MIX} />

                    <div className="mt-4 rounded-lg bg-muted/60 p-3">
                        <p className="text-xs text-muted-foreground">New signups (24h)</p>
                        <p className="mt-1 text-lg font-semibold">12</p>
                    </div>
                </SectionCard>
            </section>

            {/* Admin-only management tasks */}
            <SectionCard
                id="users"
                title="User management"
                description="Tasks that need an admin decision"
                action={
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <ListChecks className="size-3.5" />
                        3 open tasks
                    </span>
                }
            >
                <ul className="divide-y divide-border">
                    {MANAGEMENT_TASKS.map((task) => (
                        <li
                            key={task.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <span>{task.label}</span>
                            <StatusPill tone={task.tone}>{task.count}</StatusPill>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* Recent subscription payments */}
            <SectionCard
                title="Recent transactions"
                description="Latest subscription payments"
                action={
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <CreditCard className="size-3.5" />
                        Auto-renew on
                    </span>
                }
            >
                <ul className="divide-y divide-border">
                    {RECENT_TRANSACTIONS.map((transaction) => (
                        <li
                            key={transaction.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#645AFF]/10 text-xs font-semibold text-[#645AFF] dark:text-[#8E85FF]">
                                    {transaction.company.slice(0, 2).toUpperCase()}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-medium">
                                        {transaction.company}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {transaction.plan}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="size-3.5" />
                                    {transaction.amount}
                                </span>
                                <StatusPill tone={transaction.tone}>
                                    {transaction.status}
                                </StatusPill>
                            </div>
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

export default AdminDashboardPage;
