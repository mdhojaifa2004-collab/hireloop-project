import { SiteNavbar } from "@/components/site-navbar"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-svh bg-[#010103]">
      <SiteNavbar />
      {children}
    </div>
  )
}
