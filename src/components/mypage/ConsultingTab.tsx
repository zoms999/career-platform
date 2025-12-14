"use client";

import { Calendar, Clock, Video, FileText, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock Data
const MOCK_RESERVATIONS = [
  {
    id: "r1",
    consultant: "김진로 수석",
    date: "2025.12.18 (목)",
    time: "14:00",
    status: "confirmed",
    type: "Zoom 화상상담",
    link: "https://zoom.us/j/123456789",
    canCancel: true
  },
  {
    id: "r2",
    consultant: "박심리 상담사",
    date: "2025.11.20 (수)",
    time: "10:00",
    status: "completed",
    type: "대면 상담 (강남센터)",
    reportAvailable: true,
    canCancel: false
  }
];

export function ConsultingTab() {
  const handleCancel = (id: string) => {
      alert(`예약(ID: ${id})이 취소 요청되었습니다.`);
  };

  return (
    <div className="space-y-8">
        {/* Upcoming */}
        <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> 다가오는 상담
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_RESERVATIONS.filter(r => r.status === 'confirmed').map(r => (
                    <Card key={r.id} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow relative">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{r.consultant}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {r.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {r.time}</span>
                                    </CardDescription>
                                </div>
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">예약확정</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-3 text-sm text-slate-600 dark:text-slate-300">
                            {r.type}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button className="w-full" asChild>
                                <a href={r.link} target="_blank" rel="noreferrer">
                                    <Video className="w-4 h-4 mr-2" /> 상담 입장하기
                                </a>
                            </Button>
                            
                            {r.canCancel && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="w-full text-slate-400 hover:text-red-500">
                                            예약 취소
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>정말 예약을 취소하시겠습니까?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                상담 24시간 전까지만 전액 환불이 가능합니다. 취소하시겠습니까?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>돌아가기</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleCancel(r.id)} className="bg-red-500 hover:bg-red-600">예약 취소하기</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </CardFooter>
                    </Card>
                ))}
                
                {MOCK_RESERVATIONS.filter(r => r.status === 'confirmed').length === 0 && (
                     <div className="col-span-full py-12 text-center text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
                        예정된 상담이 없습니다.
                     </div>
                )}
            </div>
        </section>

        {/* History */}
        <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 mt-8">
                <FileText className="w-5 h-5 text-slate-400" /> 상담 종료 내역
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
                {MOCK_RESERVATIONS.filter(r => r.status === 'completed').map(r => (
                    <Card key={r.id} className="bg-slate-50 dark:bg-slate-800/50 opacity-90">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg text-slate-700 dark:text-slate-300">{r.consultant}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                        <span>{r.date}</span>
                                    </CardDescription>
                                </div>
                                <Badge variant="outline">상담완료</Badge>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            {r.reportAvailable && (
                                <Button variant="outline" className="w-full sm:w-auto border-primary/20 text-primary hover:bg-primary/5">
                                    <FileText className="w-4 h-4 mr-2" /> 결과 리포트 보기
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    </div>
  );
}
