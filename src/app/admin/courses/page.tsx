"use client";

import Link from "next/link";
import { Plus, Search, MoreHorizontal, FileText, Users, Clock, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MOCK_ADMIN_COURSES = [
  { id: "p1", title: "진로 적성 상담사 2급 자격 과정", category: "자격증", instructor: "김진로", students: 1250, status: "공개중", date: "2023-11-15" },
  { id: "p2", title: "청소년 학습 코칭 전문가 과정", category: "전문가", instructor: "이학습", students: 890, status: "공개중", date: "2023-10-20" },
  { id: "p3", title: "MBTI 활용 진로 지도법", category: "직무역량", instructor: "박심리", students: 3400, status: "수정중", date: "2023-12-05" },
];

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">교육 프로그램 관리</h1>
        <Button asChild>
            <Link href="/admin/courses/create">
                <Plus className="w-5 h-5 mr-2" />
                새 과정 등록
            </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                    placeholder="과정명 검색..." 
                    className="pl-9 bg-white dark:bg-slate-800"
                />
            </div>
            <div className="flex items-center gap-2">
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>전체 카테고리</option>
                    <option>자격증</option>
                    <option>전문가</option>
                    <option>직무역량</option>
                </select>
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>전체 상태</option>
                    <option>공개중</option>
                    <option>비공개</option>
                    <option>수정중</option>
                </select>
            </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">과정명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>강사</TableHead>
              <TableHead>수강생</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ADMIN_COURSES.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            {course.title}
                            <div className="text-xs text-muted-foreground mt-0.5">ID: {course.id}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                </TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        {course.students.toLocaleString()}
                    </div>
                </TableCell>
                <TableCell>
                    <Badge className={course.status === "공개중" ? "bg-green-100 text-green-700 hover:bg-green-200 border-0" : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-0"}>
                        {course.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{course.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                          <Link href={`/admin/courses/${course.id}/edit`}>
                             <Edit className="w-4 h-4 mr-2" /> 기본 정보 수정
                          </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                          <Link href={`/admin/courses/${course.id}/curriculum`}>
                             <FileText className="w-4 h-4 mr-2" /> 커리큘럼 관리
                          </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                         <Trash className="w-4 h-4 mr-2" /> 삭제
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
