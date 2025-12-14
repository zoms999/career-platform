"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Bell, 
  FolderOpen, 
  Layout, 
  LogOut,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { href: "/intranet", label: "대시보드", icon: Layout },
  { href: "/intranet/notices", label: "공지사항", icon: Bell },
  { href: "/intranet/resources", label: "자료실", icon: FolderOpen },
  { href: "/intranet/workspace", label: "업무 보드", icon: Building2 },
];

export function IntranetSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 min-h-screen flex flex-col text-slate-300">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <span className="text-white">In</span>
           </div>
           <span>HumanX Intranet</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Area */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <UserCircle className="w-8 h-8 text-slate-400" />
            <div>
                <div className="text-sm font-bold text-white">김직원 매니저</div>
                <div className="text-xs text-slate-500">교육운영팀</div>
            </div>
        </div>
        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20 gap-2">
            <LogOut className="w-4 h-4" /> 로그아웃
        </Button>
      </div>
    </div>
  );
}
