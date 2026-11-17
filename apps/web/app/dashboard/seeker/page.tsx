import React from 'react';

const SeekerDashboardPage = () => {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Seeker Dashboard Page
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Search jobs, track applications, and improve your profile.
                </p>
            </header>

            {/* Seeker-only statistics */}
            <section
                aria-label="Seeker statistics"
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Applications</p>
                    <p className="mt-1 text-2xl font-semibold">7</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Saved Jobs</p>
                    <p className="mt-1 text-2xl font-semibold">12</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Interviews</p>
                    <p className="mt-1 text-2xl font-semibold">2</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Profile Strength</p>
                    <p className="mt-1 text-2xl font-semibold">80%</p>
                </div>
            </section>

            {/* Seeker-only job search overview */}
            <section className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">Recommended jobs</h3>
                <ul className="mt-3 divide-y divide-border">
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Frontend Engineer — Nova Labs</span>
                        <span className="text-muted-foreground">Remote</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>React Developer — Pixel Works</span>
                        <span className="text-muted-foreground">Hybrid</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>UI Engineer — Bright Studio</span>
                        <span className="text-muted-foreground">On-site</span>
                    </li>
                </ul>
            </section>

            {/* Seeker-only application tracking */}
            <section className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">Application status</h3>
                <ul className="mt-3 divide-y divide-border">
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Frontend Engineer — Nova Labs</span>
                        <span className="text-muted-foreground">Interview</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>React Developer — Pixel Works</span>
                        <span className="text-muted-foreground">Under review</span>
                    </li>
                </ul>
            </section>

            <p className="text-xs text-muted-foreground">
                Sample data for now — replace these numbers with real MongoDB queries later.
            </p>
        </div>
    );
};

export default SeekerDashboardPage;
