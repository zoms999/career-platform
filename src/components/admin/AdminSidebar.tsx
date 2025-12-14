"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Truck, 
  Users, 
  Settings, 
  LogOut,
  CalendarDays,
  BookOpen,
  UserSearch, // Added for CRM
  ShoppingCart, // Added for updated 주문 관리 icon
  Building2,
  Megaphone,
  BarChart3,
  ShieldAlert
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "대시보드", href: "/admin" },
  { icon: ShoppingCart, label: "주문 관리", href: "/admin/orders" }, // Changed icon from ShoppingBag to ShoppingCart
  { icon: UserSearch, label: "리드 관리 (CRM)", href: "/admin/leads" }, // Added CRM link
  { icon: BookOpen, label: "교육 프로그램", href: "/admin/courses" },
  { icon: Truck, label: "배송 관리", href: "/admin/delivery" },
  { icon: CalendarDays, label: "예약 관리", href: "/admin/reservations" },
  {
    label: "회원 관리",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "기관 관리",
    href: "/admin/organizations",
    icon: Building2, // Imported below
  },
  {
    label: "마케팅 자동화",
    href: "/admin/marketing/automation",
    icon: Megaphone, // Imported below
  },
  {
    label: "콘텐츠 관리",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    label: "통계 및 정산",
    href: "/admin/statistics",
    icon: BarChart3,
  },
  {
    label: "보안 / 로그",
    href: "/admin/logs",
    icon: ShieldAlert,
  },
  {
    label: "설정",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-4">
      <div className="mb-8 px-2 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">A</div>
        <span className="text-lg font-bold">Admin Console</span>
      </div>

      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-3 py-3 mt-auto text-slate-400 hover:text-red-400 text-sm font-medium transition-colors">
        <LogOut className="w-5 h-5" />
        로그아웃
      </button>
    </div>
  );
}
