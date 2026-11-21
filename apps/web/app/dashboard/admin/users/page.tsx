
"use client"

import { useMemo, useState } from "react"
import {
    Download,
    Search,
    Users,
    UserCheck,
    UserX,
    ShieldCheck,
} from "lucide-react"

import {
    SectionCard,
    StatCard,
    StatusPill,
} from "../../../components/dashboard-ui"

// FIX: Explicit types prevent incorrect role and status values.
type UserRole = "Seeker" | "Recruiter" | "Admin"
type UserStatus = "Active" | "Suspended"

type AdminUser = {
    id: number
    name: string
    email: string
    role: UserRole
    joined: string
    status: UserStatus
}

// SAMPLE DATA: Replace with the real users API when the backend is ready.
const INITIAL_USERS: AdminUser[] = [
    { id: 1, name: "Jordan Blake", email: "jordan.blake@example.com", role: "Seeker", joined: "Nov 12, 2026", status: "Active" },
    { id: 2, name: "Emma Walker", email: "emma.walker@example.com", role: "Recruiter", joined: "Nov 10, 2026", status: "Active" },
    { id: 3, name: "Matthew Wilson", email: "matthew.w@example.com", role: "Seeker", joined: "Oct 28, 2026", status: "Suspended" },
    { id: 4, name: "Tom Henderson", email: "tom.h@example.com", role: "Recruiter", joined: "Nov 02, 2026", status: "Active" },
    { id: 5, name: "Olivia Martin", email: "olivia.m@example.com", role: "Seeker", joined: "Nov 05, 2026", status: "Active" },
]

export default function ManageUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS)
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("All Roles")
    const [statusFilter, setStatusFilter] = useState("All Status")

    // FIX: Search and filters are combined and update immediately.
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())

            const matchesRole =
                roleFilter === "All Roles" || user.role === roleFilter

            const matchesStatus =
                statusFilter === "All Status" || user.status === statusFilter

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [users, search, roleFilter, statusFilter])

    // UPDATED: Status action updates local state.
    // Backend API integration is still required for permanent changes.
    const toggleUserStatus = (id: number) => {
        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        status: user.status === "Active" ? "Suspended" : "Active",
                    }
                    : user
            )
        )
    }

    const activeUsers = users.filter((user) => user.status === "Active").length
    const recruiters = users.filter((user) => user.role === "Recruiter").length
    const seekers = users.filter((user) => user.role === "Seeker").length
    const suspendedUsers = users.filter((user) => user.status === "Suspended").length

    // UPDATED: Reuses the existing dashboard StatCard component.
    const stats = [
        { label: "Total Active Users", value: activeUsers.toLocaleString(), change: "Current sample data", icon: Users, tone: "purple" as const },
        { label: "Recruiter Users", value: recruiters.toLocaleString(), change: "Registered recruiters", icon: ShieldCheck, tone: "blue" as const },
        { label: "Seeker Users", value: seekers.toLocaleString(), change: "Registered job seekers", icon: UserCheck, tone: "green" as const },
        { label: "Suspended Accounts", value: suspendedUsers.toLocaleString(), change: "Requires attention", icon: UserX, tone: "amber" as const },
    ]

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header>
                <p className="text-xs font-medium text-muted-foreground">
                    Admin / Manage Users
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    User Management
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review, filter, and manage all registered users.
                </p>
            </header>

            <section
                aria-label="User statistics"
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
                title="All Users"
                description="Manage user accounts, roles, and access status."
                action={
                    <button
                        type="button"
                        onClick={() => alert("Connect the users export API to download real data.")}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
                    >
                        <Download className="size-3.5" />
                        Export List
                    </button>
                }
            >
                <div className="mb-4 flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search name or email..."
                            aria-label="Search users"
                            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(event) => setRoleFilter(event.target.value)}
                        aria-label="Filter by role"
                        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none"
                    >
                        <option>All Roles</option>
                        <option>Seeker</option>
                        <option>Recruiter</option>
                        <option>Admin</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        aria-label="Filter by status"
                        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none"
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Suspended</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-border text-xs text-muted-foreground">
                                <th className="px-3 py-3 font-medium">User</th>
                                <th className="px-3 py-3 font-medium">Role</th>
                                <th className="px-3 py-3 font-medium">Join Date</th>
                                <th className="px-3 py-3 font-medium">Status</th>
                                <th className="px-3 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="transition-colors hover:bg-muted/40">
                                    <td className="px-3 py-4">
                                        <p className="font-medium">{user.name}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
                                    </td>
                                    <td className="px-3 py-4 text-muted-foreground">{user.role}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{user.joined}</td>
                                    <td className="px-3 py-4">
                                        <StatusPill tone={user.status === "Active" ? "green" : "red"}>
                                            {user.status}
                                        </StatusPill>
                                    </td>
                                    <td className="px-3 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => toggleUserStatus(user.id)}
                                            className="text-xs font-medium text-[#645AFF] hover:underline"
                                        >
                                            {user.status === "Active" ? "Suspend" : "Activate"}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                    Showing {filteredUsers.length} of {users.length} sample users.
                </p>
            </SectionCard>

            {/* SAMPLE DATA: User records are local until the backend API is connected. */}
            <p className="text-xs text-muted-foreground">
                Sample data for now — connect this page to MongoDB through the backend API.
            </p>
        </div>
    )
}
