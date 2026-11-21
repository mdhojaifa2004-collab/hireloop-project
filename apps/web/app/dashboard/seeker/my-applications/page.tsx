
"use client";

import { useState } from "react";
import { Bell, Search, Eye } from "lucide-react";

const applications = [
  { id: 1, role: "Senior Product Designer", company: "Google", date: "Nov 12, 2026", status: "Under Review" },
  { id: 2, role: "Frontend Engineer", company: "Microsoft", date: "Nov 10, 2026", status: "Interview" },
  { id: 3, role: "UX Researcher", company: "Meta", date: "Nov 08, 2026", status: "Pending" },
  { id: 4, role: "Full Stack Developer", company: "Amazon", date: "Nov 05, 2026", status: "Rejected" },
  { id: 5, role: "UI Designer", company: "Adobe", date: "Nov 02, 2026", status: "Accepted" },
];

// FIX: Removed the page's duplicate sidebar. The shared Seeker layout already
// renders the sidebar, so this page only renders its own content now.
export default function MyApplicationsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = applications.filter((item) =>
    (filter === "All" || item.status === filter) &&
    `${item.role} ${item.company}`.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor: Record<string, string> = {
    "Under Review": "bg-blue-500/15 text-blue-400",
    Interview: "bg-purple-500/15 text-purple-400",
    Pending: "bg-yellow-500/15 text-yellow-400",
    Rejected: "bg-red-500/15 text-red-400",
    Accepted: "bg-green-500/15 text-green-400",
  };

  return (
    <div className="min-h-full bg-[#0c0c0f] text-white">
      <header className="flex h-[72px] items-center justify-between border-b border-white/10 px-5 sm:px-8"><h1 className="font-semibold">My Applications</h1><div className="flex items-center gap-3"><Bell size={19} className="text-gray-400"/><span className="rounded-full bg-[#645AFF] px-3 py-2 text-sm">S</span></div></header>

      <div className="p-5 sm:p-8">
          <div className="mb-7"><p className="text-sm text-gray-400">Track your progress</p><h2 className="mt-1 text-2xl font-bold">My Applications</h2><p className="mt-2 text-sm text-gray-500">Monitor all your submitted job applications.</p></div>

          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[["Total Applications", applications.length], ["Under Review", applications.filter(x => x.status === "Under Review").length], ["Interviews", applications.filter(x => x.status === "Interview").length], ["Accepted", applications.filter(x => x.status === "Accepted").length]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-[#15151a] p-4"><p className="text-xs text-gray-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#15151a]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
              <h3 className="font-semibold">Application History</h3>
              <div className="relative"><Search className="absolute left-3 top-3 text-gray-500" size={15}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applications..." aria-label="Search applications" className="h-10 w-full rounded-lg border border-white/10 bg-[#101014] pl-9 pr-3 text-sm outline-none focus:border-[#645AFF] sm:w-56"/></div>
            </div>
            <div className="flex flex-wrap gap-2 px-5 py-4">
              {["All", "Under Review", "Interview", "Pending", "Accepted", "Rejected"].map(item => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-3 py-2 text-xs ${filter === item ? "bg-[#645AFF] text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>{item}</button>)}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-white/[0.03] text-xs text-gray-500"><tr><th className="px-5 py-4">Job Position</th><th className="px-5 py-4">Company</th><th className="px-5 py-4">Applied Date</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Action</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map(item => <tr key={item.id} className="hover:bg-white/[0.02]"><td className="px-5 py-4 font-medium">{item.role}</td><td className="px-5 py-4 text-gray-400">{item.company}</td><td className="px-5 py-4 text-gray-400">{item.date}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs ${statusColor[item.status]}`}>{item.status}</span></td><td className="px-5 py-4"><button className="text-gray-400 hover:text-white" title="View application" aria-label={`View ${item.role} application`}><Eye size={17}/></button></td></tr>)}
                  {filtered.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No applications found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}
