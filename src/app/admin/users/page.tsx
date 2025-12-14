"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone,
  Calendar,
  Tag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock User Data
const MOCK_USERS = [
  {
    id: "user_001",
    name: "김민철",
    email: "mincheol@example.com",
    role: "student", // student, parent, teacher
    joinDate: "2023-11-15",
    tags: ["진로고민", "고3"],
    recentActivity: "OCTO 검사 완료 (어제)"
  },
  {
    id: "user_002",
    name: "이수진",
    email: "sujin.lee@example.com",
    role: "parent",
    joinDate: "2023-12-01",
    tags: ["학부모", "VIP"],
    recentActivity: "상담 예약 (오늘)"
  },
  {
    id: "user_003",
    name: "박준영",
    email: "junyoung@example.com",
    role: "student",
    joinDate: "2024-01-10",
    tags: [],
    recentActivity: "회원가입"
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = MOCK_USERS.filter(user => 
      user.name.includes(searchQuery) || user.email.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">회원 관리 (CRM)</h2>
          <p className="text-muted-foreground">개인 회원 목록 조회 및 통합 이력 관리</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="이름 또는 이메일 검색..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>회원 정보</TableHead>
                    <TableHead>가입일</TableHead>
                    <TableHead>태그</TableHead>
                    <TableHead>최근 활동</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="group">
                        <TableCell>
                            <Link href={`/admin/users/${user.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                </div>
                            </Link>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                            {user.joinDate}
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-1 flex-wrap">
                                {user.tags.length > 0 ? user.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                        #{tag}
                                    </Badge>
                                )) : <span className="text-xs text-slate-300">-</span>}
                            </div>
                        </TableCell>
                        <TableCell className="text-sm">
                            {user.recentActivity}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Users className="w-4 h-4 mr-2" /> 상세 정보 보기
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Tag className="w-4 h-4 mr-2" /> 태그 관리
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                        계정 정지
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>
    </div>
  );
}
