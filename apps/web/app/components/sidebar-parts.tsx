"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { Skeleton } from "@workspace/ui/components/skeleton"

import logo from "@/app/assets/logo.png"
import { signOut, useSession } from "@/lib/auth-client"

import { publicLinks, type Role } from "./menu-items"

/**
 * Shared sidebar pieces used by AdminSidebar, RecruiterSidebar and SeekerSidebar.
 * Putting them here means the three sidebars look identical and we fix a bug once.
 */

// The role name the user sees on screen. (Database values are lowercase.)
const ROLE_LABELS: Record<Role, string> = {
    seeker: "Job Seeker",
    recruiter: "Recruiter",
    admin: "Super Admin",
}

// `session.user.role` is optional, so turn anything unexpected into "seeker".
function toRole(value: unknown): Role {
    return value === "admin" || value === "recruiter" || value === "seeker"
        ? value
        : "seeker"
}

// "Mahmud Hasan" -> "MH" (used when the user has no profile photo).
function getInitials(name?: string | null) {
    if (!name) return "HL"

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
}

/** Logo at the top of the sidebar. Clicking it goes back to the public home page. */
export function SidebarBrand() {
    return (
        <Link
            href="/"
            aria-label="HireLoop home"
            className="flex items-center rounded-lg px-2 py-1.5 outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
            <Image src={logo} alt="HireLoop" priority className="h-8 w-auto" />
        </Link>
    )
}

/**
 * Small card showing who is logged in: avatar, name, email and role.
 * While the session is loading we show grey placeholder blocks instead of empty text.
 */
export function SidebarUserCard() {
    const { data: session, isPending } = useSession()

    if (isPending) {
        return (
            <div className="flex items-center gap-3 rounded-xl border border-sidebar-border/60 bg-sidebar-accent/40 p-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
        )
    }

    // Nobody is logged in: the sidebar stays usable, just without user details.
    if (!session?.user) {
        return (
            <div className="rounded-xl border border-sidebar-border/60 bg-sidebar-accent/40 p-3">
                <p className="text-sm font-medium text-sidebar-foreground">Guest</p>
                <Link
                    href="/sign-in"
                    className="mt-1 inline-block text-xs text-[#8E85FF] underline-offset-4 hover:underline"
                >
                    Sign in to continue
                </Link>
            </div>
        )
    }

    const { name, email, image, role } = session.user
    const roleLabel = ROLE_LABELS[toRole(role)]

    return (
        <div className="rounded-xl border border-sidebar-border/60 bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-3">
                {image ? (
                    <Image
                        src={image}
                        alt={name ? `${name}'s avatar` : "User avatar"}
                        width={40}
                        height={40}
                        unoptimized
                        className="size-10 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <span
                        aria-hidden
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#645AFF] text-sm font-semibold text-white"
                    >
                        {getInitials(name)}
                    </span>
                )}

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-sidebar-foreground">
                        {name || "HireLoop user"}
                    </p>
                    <p className="truncate text-xs text-sidebar-foreground/60">
                        {email}
                    </p>
                </div>
            </div>

            {/* Role pill */}
            <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#645AFF]/15 px-2.5 py-1 text-[11px] font-semibold text-[#8E85FF]">
                <span aria-hidden className="size-1.5 rounded-full bg-[#8E85FF]" />
                {roleLabel}
            </p>
        </div>
    )
}

/** Home, Browse Jobs, Companies and Pricing — the same for every role. */
export function SidebarPublicLinks() {
    const pathname = usePathname()

    // "/" must match exactly, otherwise every page would look active.
    const isActive = (url: string) =>
        url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(`${url}/`)

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Public Pages</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {publicLinks.map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                isActive={isActive(item.url)}
                                render={<Link href={item.url} aria-current={isActive(item.url) ? "page" : undefined} />}
                            >
                                <item.icon />
                                <span>{item.name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

/** Ends the session, then sends the user back to the public home page. */
export function SidebarLogoutButton() {
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = React.useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)

        try {
            await signOut()
            router.push("/")
            // Ask Next.js to re-render so the navbar also forgets the old session.
            router.refresh()
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
