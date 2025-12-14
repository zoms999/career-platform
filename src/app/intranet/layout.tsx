import { IntranetSidebar } from "@/components/intranet/IntranetSidebar";
import { Toaster } from "@/components/ui/sonner";

export default function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <IntranetSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header (Optional - Breadcrumbs or Search could go here) */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
            <h2 className="font-semibold text-slate-700">사내 인트라넷</h2>
            <div className="text-sm text-slate-500">
                오늘의 명언: "성공은 준비된 자에게 찾아온다."
            </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
           {children}
        </main>
      </div>
    </div>
  );
}
