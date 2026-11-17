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

// Seeker-only navigation. No Admin or Recruiter links belong in this file.
const SEEKER_LINKS = [
    { label: "Dashboard", href: "/dashboard/seeker" },
] as const

export function SeekerSidebar() {
    // Current URL, used to highlight the active link.
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarGroupLabel>Seeker</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus />
                        <span className="sr-only">Save a Job</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SEEKER_LINKS.map((link) => (
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
