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

// Recruiter-only navigation. No Admin or Seeker links belong in this file.
const RECRUITER_LINKS = [
    { label: "Dashboard", href: "/dashboard/recruiter" },
] as const

export function RecruiterSidebar() {
    // Current URL, used to highlight the active link.
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarGroupLabel>Recruiter</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus />
                        <span className="sr-only">Post a Job</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {RECRUITER_LINKS.map((link) => (
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
