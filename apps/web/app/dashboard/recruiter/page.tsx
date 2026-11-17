import React from 'react';

const RecruiterDashboardPage = () => {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            <header>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Recruiter Dashboard Page
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Post jobs and manage the candidates who apply.
                </p>
            </header>

            {/* Recruiter-only statistics */}
            <section
                aria-label="Recruiter statistics"
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Active Jobs</p>
                    <p className="mt-1 text-2xl font-semibold">3</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">New Applicants</p>
                    <p className="mt-1 text-2xl font-semibold">12</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Interviews Scheduled</p>
                    <p className="mt-1 text-2xl font-semibold">4</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-medium text-muted-foreground">Offers Sent</p>
                    <p className="mt-1 text-2xl font-semibold">1</p>
                </div>
            </section>

            {/* Recruiter-only job posting overview */}
            <section className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">Your job posts</h3>
                <ul className="mt-3 divide-y divide-border">
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Senior Frontend Engineer</span>
                        <span className="text-muted-foreground">8 applicants</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Product Designer</span>
                        <span className="text-muted-foreground">4 applicants</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Backend Developer</span>
                        <span className="text-muted-foreground">0 applicants</span>
                    </li>
                </ul>
            </section>

            {/* Recruiter-only candidate management */}
            <section className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">Candidates to review</h3>
                <ul className="mt-3 divide-y divide-border">
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Alex Morgan — Senior Frontend Engineer</span>
                        <span className="text-muted-foreground">New</span>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span>Priya Shah — Product Designer</span>
                        <span className="text-muted-foreground">Interview</span>
                    </li>
                </ul>
            </section>

            <p className="text-xs text-muted-foreground">
                Sample data for now — replace these numbers with real MongoDB queries later.
            </p>
        </div>
    );
};

export default RecruiterDashboardPage;
