"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, MoreHorizontal, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Reservation {
  id: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
}

const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "RSV-2024-001",
    user: { name: "김철수", email: "kim@example.com", phone: "010-1234-5678" },
    service: "1:1 진로 상담 (60분)",
    date: "2024-03-25",
    time: "14:00",
    status: "confirmed",
    amount: 150000
  },
  {
    id: "RSV-2024-002",
    user: { name: "이영희", email: "lee@example.com", phone: "010-9876-5432" },
    service: "직무 적성 검사 해석",
    date: "2024-03-26",
    time: "10:30",
    status: "pending",
    amount: 50000
  },
  {
    id: "RSV-2024-003",
    user: { name: "박지민", email: "park@example.com", phone: "010-5555-5555" },
    service: "취업 면접 코칭",
    date: "2024-03-26",
    time: "16:00",
    status: "cancelled",
    amount: 200000
  },
  {
    id: "RSV-2024-004",
    user: { name: "최준호", email: "choi@example.com", phone: "010-1111-2222" },
    service: "자기소개서 첨삭",
    date: "2024-03-27",
    time: "13:00",
    status: "completed",
    amount: 80000
  },
  {
    id: "RSV-2024-005",
    user: { name: "정다은", email: "jung@example.com", phone: "010-3333-4444" },
    service: "1:1 진로 상담 (90분)",
    date: "2024-03-27",
    time: "15:30",
    status: "confirmed",
    amount: 200000
  },
];

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 hover:bg-green-600">예약 확정</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">대기중</Badge>;
      case "completed":
        return <Badge className="bg-blue-500 hover:bg-blue-600">상담 완료</Badge>;
      case "cancelled":
        return <Badge variant="destructive">취소됨</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredReservations = MOCK_RESERVATIONS.filter((reservation) => {
    const matchesSearch = 
      reservation.user.name.includes(searchTerm) || 
      reservation.user.email.includes(searchTerm) ||
      reservation.id.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">예약 관리</h1>
          <p className="text-muted-foreground">상담 및 코칭 예약 현황을 관리합니다.</p>
        </div>
        <Button>
            <CalendarDays className="w-4 h-4 mr-2" /> 예약 일정 보기
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
            <CardTitle>예약 목록</CardTitle>
            <CardDescription>총 {filteredReservations.length}건의 예약이 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input 
                        placeholder="예약번호, 이름, 이메일 검색" 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <div className="flex items-center">
                            <Filter className="w-4 h-4 mr-2 text-slate-500" />
                            <SelectValue placeholder="상태 필터" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">전체 상태</SelectItem>
                        <SelectItem value="confirmed">예약 확정</SelectItem>
                        <SelectItem value="pending">대기중</SelectItem>
                        <SelectItem value="completed">상담 완료</SelectItem>
                        <SelectItem value="cancelled">취소됨</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>예약 정보</TableHead>
                            <TableHead>서비스 정보</TableHead>
                            <TableHead>일정</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead className="text-right">결제 금액</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredReservations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    검색 결과가 없습니다.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredReservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    <TableCell>
                                        <div className="font-medium">{reservation.user.name}</div>
                                        <div className="text-sm text-muted-foreground">{reservation.id}</div>
                                        <div className="text-xs text-muted-foreground">{reservation.user.phone}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{reservation.service}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{reservation.date}</div>
                                        <div className="text-sm text-muted-foreground">{reservation.time}</div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(reservation.status)}
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {reservation.amount.toLocaleString()}원
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">메뉴 열기</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>작업</DropdownMenuLabel>
                                                <DropdownMenuItem>상세 보기</DropdownMenuItem>
                                                <DropdownMenuItem>정보 수정</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">예약 취소</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
