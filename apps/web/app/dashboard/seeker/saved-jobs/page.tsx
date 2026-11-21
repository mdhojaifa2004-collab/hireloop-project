
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell, Search, MapPin, Briefcase, Clock, Trash2,
  ExternalLink,
} from "lucide-react";

const jobs = [
  { id: 1, title: "Senior Product Designer", company: "Google", location: "Dhaka, Bangladesh", type: "Full Time", salary: "$2,000 - $3,000" },
  { id: 2, title: "Frontend Engineer", company: "Microsoft", location: "Remote", type: "Full Time", salary: "$1,500 - $2,500" },
  { id: 3, title: "Staff UX Researcher", company: "Meta", location: "Dhaka, Bangladesh", type: "Full Time", salary: "$2,000 - $3,500" },
  { id: 4, title: "Full Stack Developer", company: "Amazon", location: "Remote", type: "Contract", salary: "$1,800 - $2,800" },
  { id: 5, title: "Design Systems Lead", company: "Adobe", location: "Remote", type: "Full Time", salary: "$2,500 - $4,000" },
];

// FIX: The shared Seeker layout already provides the sidebar, so the duplicate
// sidebar markup was removed from this page.
export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState(jobs);
  const [search, setSearch] = useState("");

  const filteredJobs = savedJobs.filter((job) =>
    `${job.title} ${job.company}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full bg-[#0c0c0f] text-white">
      <header className="flex h-[72px] items-center justify-between border-b border-white/10 px-5 sm:px-8">
        <h1 className="font-semibold">Saved Jobs</h1>
        <div className="flex items-center gap-3"><Bell size={19} className="text-gray-400"/><span className="rounded-full bg-[#645AFF] px-3 py-2 text-sm">S</span></div>
      </header>

      <div className="p-5 sm:p-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">Your Career</p>
              <h2 className="mt-1 text-2xl font-bold">Saved Jobs</h2>
              <p className="mt-2 text-sm text-gray-500">Manage and track your saved job opportunities.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#15151a] px-5 py-3">
              <p className="text-xs text-gray-500">Total Saved Jobs</p>
              <p className="mt-1 text-2xl font-bold">{savedJobs.length}</p>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-3 top-3 text-gray-500" size={17}/>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved jobs..." aria-label="Search saved jobs" className="h-11 w-full rounded-lg border border-white/10 bg-[#15151a] pl-10 pr-4 text-sm outline-none focus:border-[#645AFF]"/>
            </div>
            <Link href="/jobs" className="rounded-lg bg-[#645AFF] px-5 py-3 text-sm font-semibold hover:bg-[#5147e8]">Find More Jobs</Link>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <article key={job.id} className="rounded-xl border border-white/10 bg-[#15151a] p-5 transition hover:border-[#645AFF]/40">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#24232f] text-lg font-bold text-[#9b94ff]">{job.company[0]}</div>
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="mt-1 text-sm text-gray-400">{job.company}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={13}/>{job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={13}/>{job.type}</span>
                        <span className="flex items-center gap-1"><Clock size={13}/>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSavedJobs((old) => old.filter((item) => item.id !== job.id))} className="rounded-lg border border-white/10 p-2 text-gray-400 hover:border-red-500/40 hover:text-red-400" aria-label="Remove saved job"><Trash2 size={17}/></button>
                    <Link href="/jobs" className="flex items-center gap-2 rounded-lg bg-[#645AFF] px-4 py-2 text-xs font-semibold hover:bg-[#5147e8]">Apply Now <ExternalLink size={13}/></Link>
                  </div>
                </div>
              </article>
            ))}
            {filteredJobs.length === 0 && <p className="rounded-xl border border-white/10 p-8 text-center text-sm text-gray-500">No saved jobs found.</p>}
          </div>
        </div>
    </div>
  );
}
