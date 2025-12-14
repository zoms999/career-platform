"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Pin, MessageSquare } from "lucide-react";

// Mock Notices
const NOTICES = [
  { id: 1, title: "[필독] 2025년도 시무식 일정 안내", author: "인사팀", date: "2024.12.14", views: 125, isImportant: true, comments: 2 },
  { id: 2, title: "12월 급여 지급일 변경 안내", author: "재무팀", date: "2024.12.12", views: 89, isImportant: true, comments: 0 },
  { id: 3, title: "신규 입사자 소개 (김철수, 이영희)", author: "인사팀", date: "2024.12.10", views: 240, isImportant: false, comments: 5 },
  { id: 4, title: "사내 카페테리아 메뉴 설문조사", author: "총무팀", date: "2024.12.08", views: 156, isImportant: false, comments: 12 },
  { id: 5, title: "IT 보안 업데이트 공지 (윈도우11)", author: "IT지원팀", date: "2024.12.05", views: 67, isImportant: false, comments: 1 },
];

export default function NoticePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotices = NOTICES.filter(n => n.title.includes(searchTerm));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">공지사항</h1>
           <p className="text-muted-foreground">사내 주요 소식을 확인하세요.</p>
        </div>
        <Button>공지사항 작성</Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
          <Input 
             placeholder="제목 검색..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-white"
          />
          <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px] text-center">번호</TableHead>
                      <TableHead>제목</TableHead>
                      <TableHead className="w-[120px] text-center">작성자</TableHead>
                      <TableHead className="w-[120px] text-center">등록일</TableHead>
                      <TableHead className="w-[80px] text-center">조회</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {filteredNotices.map((notice) => (
                      <TableRow key={notice.id} className="hover:bg-slate-50 cursor-pointer">
                          <TableCell className="text-center font-medium">
                              {notice.isImportant ? <Pin className="w-4 h-4 inline text-red-500" /> : notice.id}
                          </TableCell>
                          <TableCell>
                              <div className="flex items-center gap-2">
                                  {notice.isImportant && <Badge variant="destructive" className="text-[10px] px-1 py-0 h-5">중요</Badge>}
                                  <span className={notice.isImportant ? "font-bold text-slate-900" : ""}>{notice.title}</span>
                                  {notice.comments > 0 && (
                                      <span className="text-xs text-slate-400 flex items-center gap-0.5">
                                          <MessageSquare className="w-3 h-3" /> {notice.comments}
                                      </span>
                                  )}
                              </div>
                          </TableCell>
                          <TableCell className="text-center text-slate-600">{notice.author}</TableCell>
                          <TableCell className="text-center text-slate-600 text-sm">{notice.date}</TableCell>
                          <TableCell className="text-center text-slate-600 text-sm">{notice.views}</TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </div>
    </div>
  );
}
