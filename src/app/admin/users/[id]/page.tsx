"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  MoreVertical,
  CreditCard,
  BookOpen,
  MessageSquare,
  FileCheck,
  Tag,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Mock User Detail
const USER_DETAIL = {
    id: "user_001",
    name: "김민철",
    email: "mincheol@example.com",
    phone: "010-1234-5678",
    avatar: "",
    tags: ["진로고민", "고3", "서울거주"],
    joinDate: "2023-11-15",
    lastLogin: "2024-03-20 14:30",
    stats: {
        totalSpent: 450000,
        completedCourses: 2,
        consultationCount: 1,
        testCount: 2
    },
    // Mock History Data
    history: {
        tests: [
            { id: 1, name: "OCTO 진로 적성 검사", date: "2023-11-16", result: "탐구형 (Investigative)", score: 85 },
            { id: 2, name: "학습 성향 진단", date: "2024-01-05", result: "시각적 학습자", score: 92 }
        ],
        consultings: [
            { id: 1, consultant: "이영희 전문가", date: "2024-02-10", type: "진로 심층 상담", status: "completed", memo: "이공계열 진학 희망함." }
        ],
        courses: [
            { id: 1, title: "청소년을 위한 자기주도학습", progress: 100, status: "completed" },
            { id: 2, title: "2024 대입 전략 특강", progress: 45, status: "in_progress" }
        ],
        payments: [
            { id: "ord_001", item: "OCTO 검사 및 상담 패키지", amount: 150000, date: "2023-11-15", status: "paid" },
            { id: "ord_002", item: "온라인 강의 구독 (3개월)", amount: 300000, date: "2024-01-01", status: "paid" }
        ]
    }
};

export default function UserDetailPage() {
    const params = useParams();
    // In real app, fetch data using params.id
    
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/users"><ArrowLeft className="w-5 h-5" /></Link>
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">회원 상세 정보</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Profile Card */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader className="text-center pb-2">
                             <Avatar className="w-24 h-24 mx-auto mb-4">
                                 <AvatarFallback className="text-2xl">{USER_DETAIL.name[0]}</AvatarFallback>
                             </Avatar>
                             <CardTitle className="text-xl">{USER_DETAIL.name}</CardTitle>
                             <CardDescription>{USER_DETAIL.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap justify-center gap-1.5 pb-4">
                                {USER_DETAIL.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">#{tag}</Badge>
                                ))}
                                <Button variant="outline" size="sm" className="h-6 w-6 rounded-full p-0">
                                    <Plus className="w-3 h-3" />
                                </Button>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone className="w-4 h-4" /> <span>{USER_DETAIL.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Calendar className="w-4 h-4" /> <span>가입일: {USER_DETAIL.joinDate}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Clock className="w-4 h-4" /> <span>최근 접속: {USER_DETAIL.lastLogin}</span>
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold">{USER_DETAIL.stats.totalSpent.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">총 결제금액</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{USER_DETAIL.stats.testCount + USER_DETAIL.stats.consultationCount}</div>
                                    <div className="text-xs text-muted-foreground">활동 횟수</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Integrated History Tabs */}
                <div className="md:col-span-2">
                    <Tabs defaultValue="tests" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="tests">검사 이력</TabsTrigger>
                            <TabsTrigger value="consulting">상담 이력</TabsTrigger>
                            <TabsTrigger value="courses">수강 이력</TabsTrigger>
                            <TabsTrigger value="payments">결제 이력</TabsTrigger>
                        </TabsList>
                        
                        {/* Test History */}
                        <TabsContent value="tests" className="mt-4 space-y-4">
                            {USER_DETAIL.history.tests.map((test) => (
                                <Card key={test.id}>
                                    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                <FileCheck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{test.name}</CardTitle>
                                                <CardDescription className="text-xs">{test.date}</CardDescription>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-sm">{test.result}</div>
                                            <div className="text-xs text-slate-500">점수: {test.score}</div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </TabsContent>

                        {/* Consulting History */}
                        <TabsContent value="consulting" className="mt-4 space-y-4">
                             {USER_DETAIL.history.consultings.map((c) => (
                                <Card key={c.id}>
                                    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                                <MessageSquare className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{c.type}</CardTitle>
                                                <CardDescription className="text-xs">{c.consultant} | {c.date}</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant={c.status === "completed" ? "default" : "secondary"}>
                                            {c.status === "completed" ? "상담완료" : "예약중"}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 text-sm text-slate-600 bg-slate-50/50 mt-2 rounded-b-xl border-t">
                                        <span className="font-semibold text-xs mr-2">[상담 메모]</span>
                                        {c.memo}
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        {/* Course History */}
                        <TabsContent value="courses" className="mt-4 space-y-4">
                            {USER_DETAIL.history.courses.map((course) => (
                                <Card key={course.id}>
                                    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{course.title}</CardTitle>
                                                <CardDescription className="text-xs">
                                                    {course.status === "completed" ? "수료함" : "수강중"}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-lg text-green-600">{course.progress}%</div>
                                            <div className="text-xs text-slate-500">진도율</div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </TabsContent>
                        
                        {/* Payment History */}
                        <TabsContent value="payments" className="mt-4 space-y-4">
                            {USER_DETAIL.history.payments.map((pay) => (
                                <Card key={pay.id}>
                                    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                                <CreditCard className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{pay.item}</CardTitle>
                                                <CardDescription className="text-xs">{pay.date} | {pay.id}</CardDescription>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">{pay.amount.toLocaleString()}원</div>
                                            <Badge variant="outline" className="text-xs font-normal text-slate-500 border-slate-300">결제완료</Badge>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
