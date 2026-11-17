import React from 'react';

const AdminDashboardPage = () => {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Admin Dashboard Page
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Platform-wide statistics and user management.
                </p>
            </header>

            {/* Admin-only statistics */}
            <section
                aria-label="Admin statistics"
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Total Users</p>
                    <p className="mt-1 text-2xl font-semibold">1,248</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Recruiters</p>
                    <p className="mt-1 text-2xl font-semibold">96</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Seekers</p>
                    <p className="mt-1 text-2xl font-semibold">1,142</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Pending Approvals</p>
                    <p className="mt-1 text-2xl font-semibold">6</p>
                </div>
            </section>

            {/* Admin-only management tasks */}
            <section className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">User management</h3>
                <ul className="mt-3 divide-y divide-border">
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Approve new recruiter accounts</span>
                        <span className="text-muted-foreground">6 pending</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Review reported accounts</span>
                        <span className="text-muted-foreground">2 open</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Manage user roles and permissions</span>
                        <span className="text-muted-foreground">3 roles</span>
                    </li>
                </ul>
            </section>

            <p className="text-xs text-muted-foreground">
                Sample data for now — replace these numbers with real MongoDB queries later.
            </p>
        </div>
    );
};

export default AdminDashboardPage;
