import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { AdminSidebar } from "../../components/AdminSidebar"
import { requireRole } from "@/lib/auth-guard"

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // SECURITY: server-side guard. Unauthenticated users go to /sign-in and
    // non-admin users are sent to their own dashboard before anything renders.
    await requireRole("admin")

    return (
        <>
            {/* This sidebar lives only inside the /dashboard/admin folder. */}
            <AdminSidebar />

            {/* FIX: min-w-0 lets wide tables scroll inside the main column
                instead of forcing horizontal overflow on the whole page. */}
            <main className="min-w-0 flex-1">
                {/* This button opens/closes this dashboard's sidebar. */}
                <div className="flex items-center gap-2 p-2">
                    <SidebarTrigger />
                </div>
                {children}
            </main>
        </>
    )
}
