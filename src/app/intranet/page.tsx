"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function IntranetDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">인트라넷 대시보드</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">읽지 않은 공지</CardTitle>
             <Bell className="h-4 w-4 text-red-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">3건</div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">진행 중 업무</CardTitle>
             <Clock className="h-4 w-4 text-blue-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">5건</div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">완료한 업무 (이번주)</CardTitle>
             <CheckCircle2 className="h-4 w-4 text-green-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">12건</div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">오늘의 일정</CardTitle>
             <Calendar className="h-4 w-4 text-orange-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">2개</div>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-full">
              <CardHeader>
                  <CardTitle>최근 공지사항</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3">
                      <li className="flex justify-between items-center text-sm border-b pb-2">
                          <span className="truncate">2025년도 상반기 인사발령 공고</span>
                          <span className="text-slate-500 text-xs whitespace-nowrap">2024.12.14</span>
                      </li>
                      <li className="flex justify-between items-center text-sm border-b pb-2">
                          <span className="truncate">연말 정산 관련 안내</span>
                          <span className="text-slate-500 text-xs whitespace-nowrap">2024.12.10</span>
                      </li>
                      <li className="flex justify-between items-center text-sm border-b pb-2">
                          <span className="truncate">사내 보안 점검 실시 (12/20)</span>
                          <span className="text-slate-500 text-xs whitespace-nowrap">2024.12.08</span>
                      </li>
                  </ul>
              </CardContent>
          </Card>

          <Card className="h-full">
              <CardHeader>
                  <CardTitle>나의 업무 현황</CardTitle>
              </CardHeader>
              <CardContent>
                   <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="flex-1 font-medium">B2B 제안서 작성 (삼성전자)</span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">진행중</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span className="flex-1 font-medium">홈페이지 리뉴얼 기획안 검토</span>
                          <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">검토대기</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-400 decoration-slate-400">
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                          <span className="flex-1 line-through">주간 업무 보고서 제출</span>
                          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded">완료</span>
                      </li>
                   </ul>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
