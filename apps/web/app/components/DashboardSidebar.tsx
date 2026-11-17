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
import { useSession } from "@/lib/auth-client"

// Dashboard pages shown in the sidebar. Each href matches a real folder
// inside app/dashboard/, so every link navigates to an existing page.
const DASHBOARD_LINKS = [
    { label: "Seeker Dashboard", href: "/dashboard/seeker" },
    { label: "Recruiter Dashboard", href: "/dashboard/recruiter" },
    { label: "Admin Dashboard", href: "/dashboard/admin" },
] as const

const menuItemsByRole = {
    seeker: [

    ],
    recruiter: [

    ],
    admin: [

    ]
}

export function DashboardSidbar() {
    // Gives us the current URL so we can highlight the active link.
    const pathname = usePathname()
    const {data: session, isPending} = useSession();
    const role = session?.user?.role || 'sekker';

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>

                    <SidebarMenu>
                        {/* {menuItemsByRole[role].map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton render={<a href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))} */}
                    </SidebarMenu>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {DASHBOARD_LINKS.map((link) => (
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
