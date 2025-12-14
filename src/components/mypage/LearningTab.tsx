"use client";

import { 
  FileText, 
  Download, 
  BookOpen, 
  PlayCircle,
  Award,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock Data
const MY_TESTS = [
  { id: 1, name: "OCTO 진로 적성 검사", date: "2023.11.16", result: "탐구형 (Investigative)", canDownload: true },
  { id: 2, name: "학습 성향 진단", date: "2024.01.05", result: "시각적 학습자", canDownload: true }
];

const MY_COURSES = [
  { id: 1, title: "청소년을 위한 자기주도학습", progress: 100, status: "completed", lastPlayed: "2024.02.20" },
  { id: 2, title: "2025 대입 전략 특강", progress: 45, status: "in_progress", lastPlayed: "2024.03.14" }
];

export function LearningTab() {
  const handleDownload = (name: string) => {
    // In real app, this would trigger API or PDF generation
    // window.print() is a simple fallback for demo
    alert(`[${name}] 리포트를 다운로드합니다.`);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* SECTION 1: MY TESTS */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
           <FileText className="w-5 h-5 text-primary" /> 나의 검사 내역
        </h3>
        <div className="space-y-4">
            {MY_TESTS.map(test => (
                <Card key={test.id} className="overflow-hidden border-l-4 border-l-blue-500">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">{test.name}</CardTitle>
                        <CardDescription>{test.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            결과: {test.result}
                         </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => handleDownload(test.name)}>
                            <Download className="w-4 h-4" /> 결과 리포트
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            
            <Button variant="ghost" className="w-full text-muted-foreground dashed border-2 border-dashed">
                + 새 검사 하러가기
            </Button>
        </div>
      </div>

      {/* SECTION 2: MY COURSES */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
           <BookOpen className="w-5 h-5 text-green-600" /> 수강 중인 강의
        </h3>
        <div className="space-y-4">
             {MY_COURSES.map(course => (
                 <Card key={course.id}>
                    <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-base line-clamp-1">{course.title}</CardTitle>
                            {course.status === 'completed' ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 pointer-events-none whitespace-nowrap">수료완료</Badge>
                            ) : (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 pointer-events-none whitespace-nowrap">수강중</Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>진도율</span>
                                <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                             <PlayCircle className="w-3 h-3" /> 최근학습: {course.lastPlayed}
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                        {course.status === 'completed' ? (
                            <Button variant="outline" size="sm" className="w-full gap-2 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                                <Award className="w-4 h-4" /> 수료증 발급
                            </Button>
                        ) : (
                            <Button size="sm" className="w-full gap-2">
                                이어보기 <ChevronRight className="w-4 h-4" />
                            </Button>
                        )}
                    </CardFooter>
                 </Card>
             ))}
        </div>
      </div>
    </div>
  );
}
