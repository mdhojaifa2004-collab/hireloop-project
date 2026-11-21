"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@workspace/ui/components/sidebar"

import { isNavItemActive, menuItemsByRole } from "./menu-items"
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
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SEEKER_LINKS.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={isNavItemActive(pathname, item.url)}
                                        render={<Link href={item.url} aria-current={isNavItemActive(pathname, item.url) ? "page" : undefined} />}
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
