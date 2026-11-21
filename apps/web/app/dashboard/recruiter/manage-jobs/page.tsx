
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  CalendarDays,
  BriefcaseBusiness,
  ChevronDown,
} from "lucide-react";

// UPDATED: Backend URL environment variable থেকে নেওয়া হবে।
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

// FIX: MongoDB document-এর আসল _id ব্যবহার করা হচ্ছে।
type Job = {
  id: string;
  title: string;
  company: string;
  category: string;
  type: string;
  salary: string;
  applicants: number;
  status: "Active" | "Closed" | "Draft";
  deadline: string;
};

// Backend থেকে আসা MongoDB document-এর structure.
// The create form writes jobType/minSalary/maxSalary/frequency while older
// rows use type/salary, so both shapes are accepted below.
type MongoJob = {
  _id: string;
  title?: string;
  company?: string;
  category?: string;
  type?: string;
  jobType?: string;
  salary?: string;
  minSalary?: string;
  maxSalary?: string;
  frequency?: string;
  location?: string;
  applicants?: number;
  status?: string;
  deadline?: string;
};

function formatSalary(job: MongoJob): string {
  if (job.salary) return job.salary;

  const min = job.minSalary?.trim();
  const max = job.maxSalary?.trim();

  if (min && max) {
    return `${min} - ${max}${job.frequency ? ` (${job.frequency})` : ""}`;
  }

  if (min) return `${min}+${job.frequency ? ` (${job.frequency})` : ""}`;

  return "Not specified";
}

function normalizeJob(job: MongoJob): Job {
  // UPDATED: API data-কে UI-এর প্রয়োজনীয় format-এ রূপান্তর করা হচ্ছে।
  const allowedStatuses = ["Active", "Closed", "Draft"];

  // FIX: POST /jobs does not store a status, so previously every real job was
  // shown as "Draft". Default new/live rows to Active instead of fake data.
  const status = allowedStatuses.includes(job.status || "")
    ? (job.status as Job["status"])
    : "Active";

  return {
    id: job._id,
    title: job.title || "Untitled Job",
    company: job.company || "Company not specified",
    category: job.category || "Other",
    // Older rows use `type`; new rows from the form use `jobType`.
    type: job.type || job.jobType || "Not specified",
    salary: formatSalary(job),
    applicants: Number(job.applicants) || 0,
    status,
    deadline: job.deadline || "Not specified",
  };
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // UPDATED: API loading এবং error state যোগ করা হয়েছে।
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // FIX: MongoDB থেকে Job List আনা হচ্ছে।
  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/jobs`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load jobs (${response.status})`);
        }

        const data: MongoJob[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid jobs response from server");
        }

        if (isMounted) {
          setJobs(data.map(normalizeJob));
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading jobs."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Search এবং Filter
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchValue) ||
        job.company.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || job.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [jobs, search, statusFilter, categoryFilter]);

  // FIX: শুধু Frontend থেকে নয়, Backend ও MongoDB থেকেও Delete হবে।
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Failed to delete job");
      }

      // UPDATED: Backend সফলভাবে Delete করার পর UI Update হবে।
      setJobs((previous) => previous.filter((job) => job.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete job."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const statusClasses: Record<Job["status"], string> = {
    Active: "bg-green-500/15 text-green-400",
    Closed: "bg-red-500/15 text-red-400",
    Draft: "bg-yellow-500/15 text-yellow-400",
  };

  return (
    <div className="min-h-full bg-[#0c0c0f] px-5 py-7 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Manage Jobs / Job Listings & Postings
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Manage Job Posts
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review job listings, monitor applicants, and update job details.
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/new"
            className="flex items-center gap-2 rounded-lg bg-[#645AFF] px-4 py-3 text-sm font-semibold transition hover:bg-[#5147e8]"
          >
            <Plus size={17} />
            Post New Job
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
          >
            {error}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Statistics */}
        <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#15151a] p-4">
            <p className="text-xs text-gray-500">Total Job Posts</p>
            <p className="mt-2 text-2xl font-bold">
              {loading ? "..." : jobs.length}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#15151a] p-4">
            <p className="text-xs text-gray-500">Active Jobs</p>
            <p className="mt-2 text-2xl font-bold text-green-400">
              {loading
                ? "..."
                : jobs.filter((job) => job.status === "Active").length}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#15151a] p-4">
            <p className="text-xs text-gray-500">Total Applicants</p>
            <p className="mt-2 text-2xl font-bold">
              {loading
                ? "..."
                : jobs.reduce((total, job) => total + job.applicants, 0)}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#15151a] p-4">
            <p className="text-xs text-gray-500">Closed Jobs</p>
            <p className="mt-2 text-2xl font-bold">
              {loading
                ? "..."
                : jobs.filter((job) => job.status === "Closed").length}
            </p>
          </div>
        </section>

        {/* Job Table */}
        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#15151a]">

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
            <div>
              <h2 className="font-semibold">All Job Listings</h2>
              <p className="mt-1 text-xs text-gray-500">
                Showing {loading ? "..." : filteredJobs.length} of{" "}
                {loading ? "..." : jobs.length} jobs
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <div className="relative min-w-[200px] flex-1 sm:flex-none">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-500"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search job..."
                  aria-label="Search job posts"
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#101014] pl-9 pr-3 text-sm outline-none focus:border-[#645AFF]"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 appearance-none rounded-lg border border-white/10 bg-[#101014] px-3 pr-9 text-sm text-gray-300 outline-none focus:border-[#645AFF]"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-3 text-gray-500"
                />
              </div>

              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-10 appearance-none rounded-lg border border-white/10 bg-[#101014] px-3 pr-9 text-sm text-gray-300 outline-none focus:border-[#645AFF]"
                >
                  <option value="All">All Categories</option>
                  <option value="Engineering & Tech">Engineering & Tech</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-3 text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-4">Job Title</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Compensation</th>
                  <th className="px-5 py-4">Applicants</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Deadline</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-gray-400"
                    >
                      Loading jobs from database...
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="transition hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#645AFF]/15 text-[#a49eff]">
                              <BriefcaseBusiness size={16} />
                            </div>

                            <div>
                              <p className="font-medium">{job.title}</p>
                              <p className="mt-1 text-[11px] text-gray-500">
                                {job.category}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-gray-400">
                          {job.company}
                        </td>

                        <td className="px-5 py-4 text-gray-400">
                          {job.type}
                        </td>

                        <td className="px-5 py-4 text-gray-300">
                          {job.salary}
                        </td>

                        <td className="px-5 py-4">
                          <span className="flex items-center gap-2 text-gray-300">
                            <Users size={15} className="text-gray-500" />
                            {job.applicants}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${statusClasses[job.status]}`}
                          >
                            {job.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="flex items-center gap-2 text-gray-400">
                            <CalendarDays size={14} />
                            {job.deadline}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/dashboard/recruiter/manage-jobs/${job.id}/edit`}
                              aria-label="Edit job"
                              className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-[#645AFF] hover:text-[#a49eff]"
                            >
                              <Pencil size={15} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDelete(job.id)}
                              disabled={deletingId === job.id}
                              aria-label="Delete job"
                              className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-red-500/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredJobs.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-12 text-center text-gray-500"
                        >
                          No job posts found.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-white/10 px-5 py-4 text-xs text-gray-500">
            Showing {loading ? "..." : filteredJobs.length} job posts
          </div>
        </section>
      </div>
    </div>
  );
}
