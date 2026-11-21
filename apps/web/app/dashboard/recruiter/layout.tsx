import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { RecruiterSidebar } from "../../components/RecruiterSidebar"
import { requireRole } from "@/lib/auth-guard"

export default async function RecruiterDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // SECURITY: server-side guard. Only signed-in recruiters reach this layout.
    await requireRole("recruiter")

    return (
        <>
            {/* This sidebar lives only inside the /dashboard/recruiter folder. */}
            <RecruiterSidebar />

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
