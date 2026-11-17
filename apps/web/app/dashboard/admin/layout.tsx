import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { AdminSidebar } from "../../components/AdminSidebar"

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* This sidebar lives only inside the /dashboard/admin folder. */}
            <AdminSidebar />

            <main className="flex-1">
                {/* This button opens/closes this dashboard's sidebar. */}
                <div className="flex items-center gap-2 p-2">
                    <SidebarTrigger />
                </div>
                {children}
            </main>
        </>
    )
}
