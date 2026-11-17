"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Plus } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@workspace/ui/components/sidebar"

// Admin-only navigation. No Seeker or Recruiter links belong in this file.
const ADMIN_LINKS = [
    { label: "Dashboard", href: "/dashboard/admin" },
] as const

export function AdminSidebar() {
    // Current URL, used to highlight the active link.
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus />
                        <span className="sr-only">Add User</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {ADMIN_LINKS.map((link) => (
                                <SidebarMenuItem key={link.href}>
                                    <SidebarMenuButton
                                        isActive={pathname === link.href}
                                        render={<Link href={link.href} />}
                                    >
                                        <LayoutDashboard />
                                        <span>{link.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
