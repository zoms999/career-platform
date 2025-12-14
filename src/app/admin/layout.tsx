import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 justify-between">
             <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-200">관리자 모드</h1>
             <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
             </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
      </div>
    </div>
  );
}
