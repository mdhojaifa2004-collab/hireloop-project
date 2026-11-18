import {
    Briefcase,
    Building,
    ChartColumn,
    CreditCard,
    FileText,
    House,
    LayoutDashboard,
    Search,
    UserCheck,
    Users,
    type LucideIcon,
} from "lucide-react"

// The three roles your app supports. Keep in sync with lib/auth.ts.
export type Role = "seeker" | "recruiter" | "admin"

// Shape of one sidebar row. Every item must have these four keys.
export type MenuItem = {
    id: string // unique key for React
    name: string // text the user sees
    url: string // where clicking goes
    icon: LucideIcon // the icon component itself (not JSX)
}

/**
 * Navigation shared by the three independent dashboards.
 * Each sidebar reads ONLY its own key, so no role ever sees another role's links.
 */
export const menuItemsByRole: Record<Role, MenuItem[]> = {
    seeker: [
        { id: "seeker-overview", name: "Overview", url: "/dashboard/seeker", icon: LayoutDashboard },
        { id: "seeker-stats", name: "Statistics", url: "/dashboard/seeker#stats", icon: ChartColumn },
        { id: "seeker-jobs", name: "Recommended Jobs", url: "/dashboard/seeker#recommended-jobs", icon: Search },
        { id: "seeker-apps", name: "Applications", url: "/dashboard/seeker#applications", icon: FileText },
    ],
    recruiter: [
        { id: "recruiter-overview", name: "Overview", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { id: "recruiter-stats", name: "Statistics", url: "/dashboard/recruiter#stats", icon: ChartColumn },
        { id: "recruiter-jobs", name: "Job Posts", url: "/dashboard/recruiter#job-posts", icon: Briefcase },
        { id: "recruiter-candidates", name: "Candidates", url: "/dashboard/recruiter#candidates", icon: UserCheck },
    ],
    admin: [
        { id: "admin-overview", name: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
        { id: "admin-stats", name: "Statistics", url: "/dashboard/admin#stats", icon: ChartColumn },
        { id: "admin-users", name: "User Management", url: "/dashboard/admin#users", icon: Users },
    ],
}

/**
 * Links to the public website. Every role sees this same list.
 * These are plain pages, so they are kept separate from the role menus above.
 */
export const publicLinks: MenuItem[] = [
    { id: "public-home", name: "Home", url: "/", icon: House },
    { id: "public-jobs", name: "Browse Jobs", url: "/jobs", icon: Search },
    { id: "public-companies", name: "Companies", url: "/companies", icon: Building },
    { id: "public-pricing", name: "Pricing", url: "/pricing", icon: CreditCard },
]
