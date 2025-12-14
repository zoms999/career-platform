"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Building2, 
  Users, 
  Download, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock Institution Data
const MOCK_ORG = {
  name: "한국고등학교",
  contact: "김철수 선생님 (진로부장)",
  email: "chulsoo@school.kr",
  activePrograms: 2,
  totalStudents: 150
};

// Mock Programs
const MOCK_PROGRAMS = [
  {
    id: "prog_001",
    name: "2024학년도 1학기 진로 탐색 캠프",
    date: "2024.03.15 ~ 2024.05.20",
    participants: 80,
    completionRate: 92,
    status: "in_progress", // scheduled, in_progress, completed
    nextAction: "중간 리포트 확인"
  },
  {
    id: "prog_002",
    name: "교직원 역량 강화 연수",
    date: "2024.01.10 ~ 2024.01.12",
    participants: 25,
    completionRate: 100,
    status: "completed",
    nextAction: "결과 보고서 다운로드"
  }
];

export default function BusinessDashboard() {
  const handleDownload = (programName: string) => {
    alert(`[${programName}] 전체 결과 리포트를 다운로드합니다.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
       <Header />
       
       <main className="flex-1 container mx-auto px-4 py-8 mt-20 max-w-6xl">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    기관 대시보드 <Building2 className="w-8 h-8 text-blue-600" />
                </h1>
                <p className="text-muted-foreground mt-2">
                    {MOCK_ORG.name}의 프로그램 운영 현황입니다.
                </p>
            </div>
            <div className="flex gap-3">
                 <div className="text-right hidden md:block">
                     <div className="text-sm font-bold">{MOCK_ORG.contact}</div>
                     <div className="text-xs text-muted-foreground">{MOCK_ORG.email}</div>
                 </div>
                 <Button variant="outline">내 정보 수정</Button>
            </div>
         </div>

         {/* Stats Overview */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
             <Card className="bg-blue-600 text-white border-0 shadow-lg">
                 <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium opacity-90">진행 중 프로그램</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <div className="text-4xl font-bold">{MOCK_ORG.activePrograms}건</div>
                 </CardContent>
             </Card>
             <Card>
                 <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium text-muted-foreground">총 참여 인원</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <div className="text-4xl font-bold text-slate-900 dark:text-white">{MOCK_ORG.totalStudents}명</div>
                 </CardContent>
             </Card>
             <Card>
                 <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium text-muted-foreground">평균 수료율</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <div className="text-4xl font-bold text-green-600">94%</div>
                 </CardContent>
             </Card>
         </div>

         {/* Program List */}
         <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-slate-500" /> 나의 프로그램
         </h2>
         <div className="space-y-6">
             {MOCK_PROGRAMS.map((prog) => (
                 <Card key={prog.id} className="overflow-hidden">
                     <div className="flex flex-col md:flex-row">
                         {/* Left: Info */}
                         <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700">
                             <div className="flex justify-between items-start mb-2">
                                 <h3 className="text-lg font-bold">{prog.name}</h3>
                                 {prog.status === 'in_progress' && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">진행중</Badge>}
                                 {prog.status === 'completed' && <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">종료됨</Badge>}
                             </div>
                             <div className="text-sm text-muted-foreground mb-4">
                                 {prog.date}
                             </div>
                             
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <div className="text-xs text-slate-500 mb-1">참여 인원</div>
                                     <div className="font-semibold">{prog.participants}명</div>
                                 </div>
                                 <div>
                                     <div className="text-xs text-slate-500 mb-1">진행 현황</div>
                                     <div className="flex items-center gap-2">
                                         <span className="font-semibold text-blue-600">{prog.completionRate}%</span>
                                         <Progress value={prog.completionRate} className="w-20 h-2 bg-slate-100" />
                                     </div>
                                 </div>
                             </div>
                         </div>

                         {/* Right: Actions */}
                         <div className="w-full md:w-64 bg-slate-50/50 dark:bg-slate-800/50 p-6 flex flex-col justify-center gap-3">
                             <Button className="w-full" onClick={() => handleDownload(prog.name)}>
                                 <Download className="w-4 h-4 mr-2" /> 결과 리포트 (전체)
                             </Button>
                             <Button variant="outline" className="w-full">
                                 <Users className="w-4 h-4 mr-2" /> 참여자 명단 관리
                             </Button>
                             {prog.status === 'in_progress' && (
                                 <div className="mt-2 text-xs text-center text-blue-600 flex items-center justify-center gap-1">
                                     <AlertCircle className="w-3 h-3" /> 다음 일정: {prog.nextAction}
                                 </div>
                             )}
                         </div>
                     </div>
                 </Card>
             ))}
         </div>

       </main>
       
       <Footer />
    </div>
  );
}
