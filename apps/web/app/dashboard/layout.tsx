import { SidebarProvider } from "@workspace/ui/components/sidebar"
// Original code preserved:
// import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"
// import { DashboardSidbar } from "../components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            {/* Original code preserved: the shared sidebar and <main> were rendered
                here. Each dashboard now has its own layout.tsx that renders its own
                sidebar and main area. */}
            {children}
        </SidebarProvider>
    )
};

export default DashboardLayout;
