
"use client"

import { useMemo, useState } from "react"
import {
    CreditCard,
    DollarSign,
    Users,
    CalendarDays,
    Search,
    Download,
    TrendingUp,
} from "lucide-react"

import {
    SectionCard,
    StatCard,
    StatusPill,
} from "../../../components/dashboard-ui"

// FIX: Explicit transaction status type.
type PaymentStatus = "Paid" | "Pending" | "Failed"

type Transaction = {
    id: string
    user: string
    plan: string
    amount: number
    date: string
    status: PaymentStatus
}

// SAMPLE DATA: Replace with real MongoDB payment records through the backend API.
const INITIAL_TRANSACTIONS: Transaction[] = [
    { id: "TXN-10284", user: "Jordan Blake", plan: "Enterprise Monthly", amount: 1299, date: "Nov 18, 2026", status: "Paid" },
    { id: "TXN-10283", user: "Emma Walker", plan: "Professional Monthly", amount: 499, date: "Nov 17, 2026", status: "Paid" },
    { id: "TXN-10282", user: "Matthew Wilson", plan: "Starter Monthly", amount: 49, date: "Nov 16, 2026", status: "Pending" },
    { id: "TXN-10281", user: "Olivia Martin", plan: "Enterprise Monthly", amount: 1299, date: "Nov 15, 2026", status: "Failed" },
    { id: "TXN-10280", user: "Tom Henderson", plan: "Professional Monthly", amount: 499, date: "Nov 14, 2026", status: "Paid" },
]

export default function AdminPaymentsPage() {
    const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")

    // FIX: Calculate revenue only from successful payments.
    const totalRevenue = transactions
        .filter((transaction) => transaction.status === "Paid")
        .reduce((total, transaction) => total + transaction.amount, 0)

    // FIX: Search and status filtering work together.
    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesSearch =
                `${transaction.user} ${transaction.id} ${transaction.plan}`
                    .toLowerCase()
                    .includes(search.toLowerCase())

            const matchesStatus =
                statusFilter === "All Status" || transaction.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [transactions, search, statusFilter])

    const paidCount = transactions.filter((item) => item.status === "Paid").length
    const pendingCount = transactions.filter((item) => item.status === "Pending").length
    const failedCount = transactions.filter((item) => item.status === "Failed").length

    // UPDATED: All cards use the existing dashboard StatCard component.
    const stats = [
        { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "From successful sample payments", icon: DollarSign, tone: "green" as const },
        { label: "Monthly Revenue", value: "$94,210", change: "Sample monthly figure", icon: CalendarDays, tone: "purple" as const },
        { label: "Active Pro Users", value: "12,408", change: "Sample subscription count", icon: Users, tone: "blue" as const },
        { label: "Expired Subscriptions", value: "842", change: "Sample expired count", icon: CreditCard, tone: "amber" as const },
    ]

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header>
                <p className="text-xs font-medium text-muted-foreground">
                    Admin / Payments &amp; Subscriptions
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Payments &amp; Subscriptions
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Monitor platform revenue, subscriptions, and payment activity.
                </p>
            </header>

            <section
                aria-label="Payment statistics"
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

            {/* UPDATED: Payment status summary uses the shared SectionCard and StatusPill. */}
            <SectionCard
                title="Transaction Summary"
                description="Overview of the sample transaction statuses"
            >
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                        <StatusPill tone="green">Paid</StatusPill>
                        <span className="text-sm font-semibold">{paidCount}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                        <StatusPill tone="amber">Pending</StatusPill>
                        <span className="text-sm font-semibold">{pendingCount}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                        <StatusPill tone="red">Failed</StatusPill>
                        <span className="text-sm font-semibold">{failedCount}</span>
                    </div>
                </div>
            </SectionCard>

            <SectionCard
                title="Recent Transactions"
                description="Latest subscription payments on the platform"
                action={
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="size-3.5 text-emerald-500" />
                        Payment activity
                    </span>
                }
            >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search user, transaction ID or plan..."
                            aria-label="Search transactions"
                            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        aria-label="Filter by payment status"
                        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none"
                    >
                        <option>All Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Failed</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => alert("Connect the payments export API to download real transaction data.")}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium transition-colors hover:bg-muted"
                    >
                        <Download className="size-3.5" />
                        Export CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-border text-xs text-muted-foreground">
                                <th className="px-3 py-3 font-medium">User / Name</th>
                                <th className="px-3 py-3 font-medium">Plan</th>
                                <th className="px-3 py-3 font-medium">Transaction ID</th>
                                <th className="px-3 py-3 font-medium">Amount</th>
                                <th className="px-3 py-3 font-medium">Date</th>
                                <th className="px-3 py-3 font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.id} className="transition-colors hover:bg-muted/40">
                                    <td className="px-3 py-4 font-medium">{transaction.user}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{transaction.plan}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{transaction.id}</td>
                                    <td className="px-3 py-4 font-medium">
                                        ${transaction.amount.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-4 text-muted-foreground">{transaction.date}</td>
                                    <td className="px-3 py-4">
                                        <StatusPill
                                            tone={
                                                transaction.status === "Paid" ? "green" :
                                                transaction.status === "Pending" ? "amber" : "red"
                                            }
                                        >
                                            {transaction.status}
                                        </StatusPill>
                                    </td>
                                </tr>
                            ))}

                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                    Showing {filteredTransactions.length} of {transactions.length} sample transactions.
                </p>
            </SectionCard>

            {/* SAMPLE DATA: Payment figures are placeholders, not real financial records. */}
            <p className="text-xs text-muted-foreground">
                Sample data for now — connect your payment API and MongoDB records before using this for real financial reporting.
            </p>
        </div>
    )
}


