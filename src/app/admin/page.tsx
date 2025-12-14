"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Activity, AlertCircle } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const REVENUE_DATA = [
  { name: '7월', revenue: 1500 },
  { name: '8월', revenue: 2300 },
  { name: '9월', revenue: 3200 },
  { name: '10월', revenue: 4500 },
  { name: '11월', revenue: 6000 },
  { name: '12월', revenue: 8500 },
];

const USER_DATA = [
  { name: '7월', users: 120 },
  { name: '8월', users: 200 },
  { name: '9월', users: 450 },
  { name: '10월', users: 800 },
  { name: '11월', users: 1500 },
  { name: '12월', users: 2100 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">관리자 대시보드</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">총 매출 (12월)</CardTitle>
             <DollarSign className="h-4 w-4 text-green-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">₩ 8,500,000</div>
             <p className="text-xs text-muted-foreground">+32% from last month</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">신규 회원</CardTitle>
             <Users className="h-4 w-4 text-blue-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">+1,234</div>
             <p className="text-xs text-muted-foreground">+18% from last month</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">검사 응시 건수</CardTitle>
             <Activity className="h-4 w-4 text-orange-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">+573</div>
             <p className="text-xs text-muted-foreground">+7% from last month</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">미처리 티켓</CardTitle>
             <AlertCircle className="h-4 w-4 text-red-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">12</div>
             <p className="text-xs text-muted-foreground">Action required</p>
           </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <CardHeader>
                  <CardTitle>월별 매출 추이</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={REVENUE_DATA}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip />
                          <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle>누적 회원 성장</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={USER_DATA}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip />
                          <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
