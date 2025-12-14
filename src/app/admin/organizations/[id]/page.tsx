"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail,
  User,
  Users,
  CheckCircle2,
  CalendarDays,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// Mock Org Detail
const ORG_DETAIL = {
    id: "org_001",
    name: "한국고등학교",
    type: "School",
    address: "서울시 강남구 삼성동 123",
    contact: {
        name: "김철수 선생님",
        role: "진로부장",
        phone: "010-1234-5678",
        email: "chulsoo@school.kr"
    },
    stats: {
        totalStudents: 150,
        totalPrograms: 3,
        totalRevenue: 4500000
    },
    programs: [
        { id: 1, name: "청소년 진로 탐색 캠프 1기", date: "2023-05-15", students: 80, revenue: 2000000, status: "completed" },
        { id: 2, name: "교사 역량 강화 연수", date: "2023-08-20", students: 20, revenue: 1000000, status: "completed" },
        { id: 3, name: "청소년 진로 탐색 캠프 2기", date: "2024-05-10", students: 50, revenue: 1500000, status: "scheduled" }
    ]
};

export default function OrgDetailPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/organizations"><ArrowLeft className="w-5 h-5" /></Link>
                </Button>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <Building2 className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{ORG_DETAIL.name}</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{ORG_DETAIL.type}</Badge>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ORG_DETAIL.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">총 참여 인원</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ORG_DETAIL.stats.totalStudents}명</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">진행 프로그램</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ORG_DETAIL.stats.totalPrograms}건</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">누적 매출</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ORG_DETAIL.stats.totalRevenue.toLocaleString()}원</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact Info */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">담당자 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full border">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                                <div>
                                    <div className="font-bold">{ORG_DETAIL.contact.name}</div>
                                    <div className="text-xs text-slate-500">{ORG_DETAIL.contact.role}</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span>{ORG_DETAIL.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span>{ORG_DETAIL.contact.email}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Program History */}
                <Card className="md:col-span-2">
                     <CardHeader>
                        <CardTitle className="text-lg">프로그램 이력</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {ORG_DETAIL.programs.map((prog) => (
                                <div key={prog.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{prog.name}</div>
                                            <div className="text-sm text-slate-500">{prog.date} | {prog.students}명</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-sm">{prog.revenue.toLocaleString()}원</div>
                                        <Badge variant={prog.status === "completed" ? "secondary" : "default"} className="mt-1">
                                            {prog.status === "completed" ? "종료됨" : "예정됨"}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
