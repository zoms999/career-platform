"use client";

import { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Search, 
  FileText,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock Lead Data
const MOCK_LEADS = [
  {
    id: "lead_001",
    orgName: "한국고등학교",
    picName: "김철수 선생님",
    contact: "010-1234-5678",
    program: "청소년 진로 탐색 캠프",
    people: 80,
    region: "서울",
    budget: 4000000,
    date: "2024-05-15",
    status: "requested",
    createdAt: "2024-03-20"
  },
  {
    id: "lead_002",
    orgName: "(주)테크솔루션",
    picName: "이영희 대리",
    contact: "010-9876-5432",
    program: "신입사원 비즈니스 역량 강화",
    people: 25,
    region: "경기/인천",
    budget: 3500000,
    date: "2024-04-10",
    status: "negotiating",
    createdAt: "2024-03-18"
  },
  {
    id: "lead_003",
    orgName: "강남구청",
    picName: "박민수 주무관",
    contact: "010-5555-7777",
    program: "은퇴 예정자 생애 설계",
    people: 40,
    region: "서울",
    budget: 2000000,
    date: "2024-06-01",
    status: "confirmed",
    createdAt: "2024-03-15"
  },
  {
    id: "lead_004",
    orgName: "행복복지관",
    picName: "최지혜 복지사",
    contact: "010-1111-2222",
    program: "디지털 리터러시 교육",
    people: 15,
    region: "지방",
    budget: 1500000,
    date: "2024-04-05",
    status: "closed",
    createdAt: "2024-03-10"
  }
];

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case "requested": return <Badge variant="outline" className="border-blue-500 text-blue-500 bg-blue-50"><Clock className="w-3 h-3 mr-1"/> 견적요청</Badge>;
        case "negotiating": return <Badge variant="outline" className="border-orange-500 text-orange-500 bg-orange-50"><TrendingUp className="w-3 h-3 mr-1"/> 협의중</Badge>;
        case "confirmed": return <Badge variant="outline" className="border-green-500 text-green-500 bg-green-50"><CheckCircle2 className="w-3 h-3 mr-1"/> 계약완료</Badge>;
        case "closed": return <Badge variant="secondary" className="text-slate-500"><XCircle className="w-3 h-3 mr-1"/> 종료/취소</Badge>;
        default: return <Badge variant="outline">{status}</Badge>;
    }
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = leads.filter(lead => {
      const matchesSearch = lead.orgName.includes(searchQuery) || lead.picName.includes(searchQuery);
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, newStatus: string) => {
      setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
      toast.success("상태가 변경되었습니다.");
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <div>
           <h2 className="text-3xl font-bold tracking-tight">리드 관리 (CRM)</h2>
           <p className="text-muted-foreground">견적 요청 및 B2B 상담 현황을 관리합니다.</p>
         </div>
       </div>

       {/* Filters */}
       <div className="flex items-center gap-4">
           <div className="relative flex-1 max-w-sm">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input 
                  placeholder="기관명 또는 담당자 검색..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
           </div>
           <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">전체 상태</SelectItem>
                    <SelectItem value="requested">견적요청</SelectItem>
                    <SelectItem value="negotiating">협의중</SelectItem>
                    <SelectItem value="confirmed">계약완료</SelectItem>
                    <SelectItem value="closed">종료/취소</SelectItem>
                </SelectContent>
           </Select>
       </div>

       {/* Data Table */}
       <div className="border rounded-md">
           <Table>
               <TableHeader>
                   <TableRow>
                       <TableHead>상태</TableHead>
                       <TableHead>기관명 / 담당자</TableHead>
                       <TableHead>프로그램 정보</TableHead>
                       <TableHead>지역 / 일정</TableHead>
                       <TableHead className="text-right">예상 견적</TableHead>
                       <TableHead className="text-right">요청일</TableHead>
                       <TableHead className="w-[50px]"></TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {filteredLeads.map((lead) => (
                       <TableRow key={lead.id}>
                           <TableCell><StatusBadge status={lead.status} /></TableCell>
                           <TableCell>
                               <div className="font-medium flex items-center gap-2">
                                   <Building2 className="w-4 h-4 text-slate-400" />
                                   {lead.orgName}
                               </div>
                               <div className="text-sm text-muted-foreground ml-6">
                                   {lead.picName} ({lead.contact})
                               </div>
                           </TableCell>
                           <TableCell>
                               <div className="font-medium text-sm">{lead.program}</div>
                               <div className="text-xs text-muted-foreground">
                                   {lead.people}명 규모
                               </div>
                           </TableCell>
                           <TableCell>
                               <div className="flex items-center gap-1 text-sm">
                                   <MapPin className="w-3 h-3 text-slate-400" /> {lead.region}
                               </div>
                               <div className="text-xs text-muted-foreground ml-4">
                                   {lead.date} 예정
                               </div>
                           </TableCell>
                           <TableCell className="text-right font-medium">
                               {lead.budget.toLocaleString()}원
                           </TableCell>
                           <TableCell className="text-right text-sm text-muted-foreground">
                               {lead.createdAt}
                           </TableCell>
                           <TableCell>
                               <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                       <Button variant="ghost" size="icon" className="h-8 w-8">
                                           <MoreVertical className="w-4 h-4" />
                                       </Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end">
                                       <DropdownMenuLabel>상태 변경</DropdownMenuLabel>
                                       <DropdownMenuSeparator />
                                       <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "negotiating")}>
                                           협의중으로 변경
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "confirmed")}>
                                           계약 완료 처리
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "closed")}>
                                           종료/취소 처리
                                       </DropdownMenuItem>
                                       <DropdownMenuSeparator />
                                       <DropdownMenuItem>
                                           <FileText className="w-4 h-4 mr-2" /> 견적서 보기
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
