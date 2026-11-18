"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"

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

import { menuItemsByRole } from "./menu-items"
import {
    SidebarBrand,
    SidebarLogoutButton,
    SidebarPublicLinks,
    SidebarUserCard,
} from "./sidebar-parts"

// Seeker-only navigation. No Admin or Recruiter links belong in this file.
const SEEKER_LINKS = menuItemsByRole.seeker

export function SeekerSidebar() {
    // Current URL, used to highlight the active link.
    const pathname = usePathname()

    return (
        <Sidebar>
            {/* Brand + the logged-in user's avatar, name, email and role */}
            <SidebarHeader>
                <SidebarBrand />
                <SidebarUserCard />
            </SidebarHeader>
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
                            {SEEKER_LINKS.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={pathname === item.url}
                                        render={<Link href={item.url} />}
                                    >
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Links that leave the dashboard and go to the public website */}
                <SidebarPublicLinks />
            </SidebarContent>
            <SidebarFooter>
                <SidebarLogoutButton />
            </SidebarFooter>
        </Sidebar>
    )
}
