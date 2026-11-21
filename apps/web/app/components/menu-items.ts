import {
    Bookmark,
    Briefcase,
    Building,
    CreditCard,
    FileText,
    House,
    LayoutDashboard,
    Plus,
    Search,
    Settings,
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
 *
 * FIX: Every entry now points to a real page that exists in app/dashboard.
 * The previous anchor-only links (#stats, #users, ...) were replaced so each
 * sidebar item opens an actual dashboard page.
 */
export const menuItemsByRole: Record<Role, MenuItem[]> = {
    seeker: [
        { id: "seeker-overview", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { id: "seeker-saved", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
        { id: "seeker-applications", name: "My Applications", url: "/dashboard/seeker/my-applications", icon: FileText },
        { id: "seeker-billing", name: "Billing & Subscription", url: "/dashboard/seeker/billing", icon: CreditCard },
        { id: "seeker-settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    recruiter: [
        { id: "recruiter-overview", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { id: "recruiter-new", name: "Add New Job", url: "/dashboard/recruiter/new", icon: Plus },
        { id: "recruiter-jobs", name: "Manage Job Posts", url: "/dashboard/recruiter/manage-jobs", icon: Briefcase },
    ],
    admin: [
        { id: "admin-overview", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { id: "admin-users", name: "Manage Users", url: "/dashboard/admin/users", icon: Users },
        { id: "admin-jobs", name: "Manage Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
        { id: "admin-payments", name: "Payments & Subscriptions", url: "/dashboard/admin/payments", icon: CreditCard },
    ],
}

/**
 * FIX: Nested routes now keep their parent item highlighted.
 * Dashboard roots only match exactly so "/dashboard/admin" is not highlighted
 * while browsing "/dashboard/admin/users".
 */
const DASHBOARD_ROOTS = new Set([
    "/dashboard/admin",
    "/dashboard/recruiter",
    "/dashboard/seeker",
])

export function isNavItemActive(pathname: string, url: string) {
    if (DASHBOARD_ROOTS.has(url)) {
        return pathname === url
    }

    return pathname === url || pathname.startsWith(`${url}/`)
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
