"use client";

import Image from "next/image";
import { User, Settings, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_USER = {
  name: "김철수",
  email: "soo@example.com",
  phone: "010-1234-5678",
  image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
  grade: "VIP",
  points: 2500,
  coupons: 2
};

export function ProfileCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
         <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
            <Settings className="w-5 h-5" />
         </Button>
      </div>

      {/* Avatar */}
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-700 shadow-md">
            <Image src={MOCK_USER.image} alt={MOCK_USER.name} fill className="object-cover" />
        </div>
        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border hover:bg-slate-50">
            <PenLine className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Info */}
      <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center md:justify-start">
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{MOCK_USER.name}님</h2>
             <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0">{MOCK_USER.grade}</Badge>
          </div>
          <p className="text-muted-foreground">{MOCK_USER.email} | {MOCK_USER.phone}</p>
          
          <div className="flex justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="text-center px-4">
                  <div className="text-sm text-slate-500 mb-1">보유 포인트</div>
                  <div className="text-xl font-bold text-primary">{MOCK_USER.points.toLocaleString()}P</div>
              </div>
              <div className="w-px bg-slate-200 dark:bg-slate-700 h-10" />
              <div className="text-center px-4">
                  <div className="text-sm text-slate-500 mb-1">사용 가능 쿠폰</div>
                  <div className="text-xl font-bold text-primary">{MOCK_USER.coupons}장</div>
              </div>
          </div>
      </div>
    </div>
  );
}
