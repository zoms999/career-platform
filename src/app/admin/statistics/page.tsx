"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileSpreadsheet } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from "recharts";

const MONTHLY_STATS = [
  { name: '7월', sales: 1500000, visits: 5000 },
  { name: '8월', sales: 2300000, visits: 6200 },
  { name: '9월', sales: 3200000, visits: 8000 },
  { name: '10월', sales: 4500000, visits: 12000 },
  { name: '11월', sales: 6000000, visits: 15000 },
  { name: '12월', sales: 8500000, visits: 21000 },
];

const CATEGORY_STATS = [
  { name: '검사권', value: 45 },
  { name: '컨설팅', value: 25 },
  { name: '강의', value: 20 },
  { name: '교구', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function StatisticsPage() {
  const handleDownload = () => {
    alert("통계 데이터를 Excel 파일로 다운로드합니다.");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">통계 및 정산</h1>
           <p className="text-muted-foreground">매출 현황과 서비스 이용 통계를 분석합니다.</p>
        </div>
        <Button onClick={handleDownload} variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
            <FileSpreadsheet className="w-4 h-4 mr-2" /> 엑셀 다운로드
        </Button>
      </div>

      <Tabs defaultValue="revenue">
          <TabsList>
              <TabsTrigger value="revenue">매출 통계</TabsTrigger>
              <TabsTrigger value="service">서비스 이용 현황</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="col-span-2">
                      <CardHeader>
                          <CardTitle>월별 매출 추이</CardTitle>
                          <CardDescription>(단위: 원)</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[400px]">
                          <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={MONTHLY_STATS}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
                                  <Bar dataKey="sales" fill="#3b82f6" name="매출액" radius={[4, 4, 0, 0]} />
                              </BarChart>
                          </ResponsiveContainer>
                      </CardContent>
                  </Card>

                  <Card>
                      <CardHeader>
                          <CardTitle>카테고리별 매출 비중</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[400px]">
                          <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                  <Pie
                                      data={CATEGORY_STATS}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      outerRadius={120}
                                      fill="#8884d8"
                                      dataKey="value"
                                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                  >
                                      {CATEGORY_STATS.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                  </Pie>
                                  <Tooltip />
                              </PieChart>
                          </ResponsiveContainer>
                      </CardContent>
                  </Card>
              </div>
          </TabsContent>

          <TabsContent value="service">
              <Card>
                  <CardHeader>
                      <CardTitle>준비 중입니다.</CardTitle>
                      <CardDescription>서비스 이용 통계 화면은 개발 예정입니다.</CardDescription>
                  </CardHeader>
              </Card>
          </TabsContent>
      </Tabs>
    </div>
  );
}
