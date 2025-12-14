"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Folder, 
  FileText, 
  FileSpreadsheet, 
  File as FileIcon,
  Download,
  MoreVertical,
  Plus
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock Data
const FILES = [
  { id: 1, name: "2024 회사소개서.pdf", type: "pdf", size: "12.5 MB", date: "2024.11.01", author: "마케팅팀" },
  { id: 2, name: "지출결의서 양식 (2025).xlsx", type: "xlsx", size: "45 KB", date: "2024.12.01", author: "재무팀" },
  { id: 3, name: "브랜드 가이드라인 v2.0.pdf", type: "pdf", size: "25.0 MB", date: "2024.09.15", author: "디자인팀" },
  { id: 4, name: "신규 입사자 매뉴얼.docx", type: "docx", size: "2.1 MB", date: "2024.10.20", author: "인사팀" },
];

const FOLDERS = [
  { id: 101, name: "공통 서식", count: 12 },
  { id: 102, name: "교육 자료", count: 8 },
  { id: 103, name: "로고 및 이미지", count: 45 },
];

export default function ResourcesPage() {
  const handleDownload = (name: string) => {
    alert(`[${name}] 파일을 다운로드합니다.`);
  };

  const getIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="w-8 h-8 text-red-500" />;
    if (type === 'xlsx') return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
    if (type === 'docx') return <FileText className="w-8 h-8 text-blue-600" />;
    return <FileIcon className="w-8 h-8 text-slate-400" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">자료실</h1>
           <p className="text-muted-foreground">업무에 필요한 각종 서식과 자료를 다운로드하세요.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><Plus className="w-4 h-4 mr-2" /> 폴더 생성</Button>
            <Button><Plus className="w-4 h-4 mr-2" /> 파일 업로드</Button>
        </div>
      </div>

      {/* Folders */}
      <div>
          <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Folders</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {FOLDERS.map(folder => (
                  <div key={folder.id} className="bg-white p-4 rounded-xl border hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group">
                      <Folder className="w-8 h-8 text-yellow-400 fill-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-semibold text-slate-800 truncate">{folder.name}</div>
                      <div className="text-xs text-slate-400">{folder.count} files</div>
                  </div>
              ))}
          </div>
      </div>

      {/* Recent Files */}
      <div>
          <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Recent Files</h3>
          <div className="bg-white rounded-xl border divide-y">
              {FILES.map(file => (
                  <div key={file.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                          {getIcon(file.type)}
                          <div>
                              <div className="font-medium text-slate-900">{file.name}</div>
                              <div className="text-xs text-slate-500 flex gap-2">
                                  <span>{file.size}</span>
                                  <span>•</span>
                                  <span>{file.author}</span>
                                  <span>•</span>
                                  <span>{file.date}</span>
                              </div>
                          </div>
                      </div>
                      <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(file.name)} className="text-slate-400 hover:text-blue-600">
                              <Download className="w-5 h-5" />
                          </Button>
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-slate-400">
                                      <MoreVertical className="w-5 h-5" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  <DropdownMenuItem>이름 변경</DropdownMenuItem>
                                  <DropdownMenuItem>이동</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
