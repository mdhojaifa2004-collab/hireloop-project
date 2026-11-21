
import Link from "next/link";
import {
  Bell,
  Search,
  BriefcaseBusiness,
  Users,
  Eye,
  Clock,
  Plus,
  FileText,
  Bookmark,
  ArrowUpRight,
} from "lucide-react";

// FIX: Sidebar duplicated by the shared Seeker layout was removed from this page.
const stats = [
  { title: "Total Applications", value: "12", icon: FileText, color: "text-blue-400" },
  { title: "Applications Interview", value: "24", icon: Users, color: "text-purple-400" },
  { title: "Profile Views", value: "3", icon: Eye, color: "text-yellow-400" },
  { title: "Saved Jobs", value: "1", icon: Bookmark, color: "text-green-400" },
];

const activities = [
  {
    title: "Application Status Updated",
    description: "Your application for Senior Product Designer is now under review.",
    time: "2 hours ago",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    title: "New Job Recommendation",
    description: "A new Frontend Developer position matches your profile.",
    time: "5 hours ago",
    icon: BriefcaseBusiness,
    color: "text-green-400",
  },
  {
    title: "Profile Viewed",
    description: "Your profile was viewed by a recruiter.",
    time: "Yesterday",
    icon: Eye,
    color: "text-purple-400",
  },
  {
    title: "Application Submitted",
    description: "Your application was successfully submitted.",
    time: "Yesterday",
    icon: FileText,
    color: "text-yellow-400",
  },
];

export default function SeekerDashboardPage() {
  return (
    <div className="min-h-full bg-[#0c0c0f] text-white">

      {/* Topbar */}
          <header className="flex h-[72px] items-center justify-between border-b border-white/10 px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  placeholder="Search opportunities..."
                  aria-label="Search opportunities"
                  className="h-10 w-64 rounded-lg border border-white/10 bg-[#17171d] pl-10 pr-4 text-sm outline-none focus:border-[#645AFF]"
                />
              </div>
              <h1 className="text-lg font-semibold sm:hidden">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <button aria-label="Notifications" className="relative rounded-lg p-2 text-gray-400 hover:bg-white/5">
                <Bell size={19} />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-[#645AFF]" />
              </button>

              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#645AFF] font-semibold">
                  S
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Seeker</p>
                  <p className="text-xs text-gray-500">Job Seeker</p>
                </div>
              </div>
            </div>
          </header>

          <div className="p-5 sm:p-8">

            {/* Welcome */}
            <section className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-sm text-gray-400">Overview</p>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Welcome back, Seeker!
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Here's what's happening with your job search.
                </p>
              </div>

              <Link
                href="/jobs"
                className="flex items-center gap-2 rounded-lg bg-[#645AFF] px-4 py-3 text-sm font-semibold transition hover:bg-[#5147e8]"
              >
                <Plus size={17} />
                Find Jobs
              </Link>
            </section>

            {/* Statistics */}
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-xl border border-white/10 bg-[#15151a] p-5 transition hover:border-[#645AFF]/40"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <Icon size={19} className={stat.color} />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      Your account overview
                    </p>
                  </div>
                );
              })}
            </section>

            {/* Recent Activity */}
            <section className="overflow-hidden rounded-xl border border-white/10 bg-[#15151a]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
                <div>
                  <h3 className="font-semibold">Recent Activity</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Your latest job search activities
                  </p>
                </div>

                <button className="flex items-center gap-2 text-xs text-[#8b83ff] hover:text-white">
                  View All <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 px-5 py-5 transition hover:bg-white/[0.02]"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#22222a]">
                        <Icon size={18} className={activity.color} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium">
                          {activity.title}
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {activity.description}
                        </p>
                      </div>

                      <div className="hidden shrink-0 items-center gap-1 text-xs text-gray-500 sm:flex">
                        <Clock size={12} />
                        {activity.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <footer className="mt-8 text-center text-xs text-gray-600">
              © 2026 HireLoop. All rights reserved.
            </footer>
          </div>
    </div>
  );
}
