"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Search, 
  MoreVertical, 
  MapPin,
  TrendingUp,
  Users
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MOCK_ORGS = [
  {
    id: "org_001",
    name: "한국고등학교",
    type: "school",
    contactName: "김철수",
    phone: "02-1234-5678",
    region: "서울",
    programCount: 3,
    totalSpent: 4500000,
  },
  {
    id: "org_002",
    name: "(주)테크솔루션",
    type: "company",
    contactName: "이영희",
    phone: "031-111-2222",
    region: "경기",
    programCount: 1,
    totalSpent: 3500000,
  },
  {
    id: "org_003",
    name: "강남구청",
    type: "public",
    contactName: "박민수",
    phone: "02-555-7777",
    region: "서울",
    programCount: 5,
    totalSpent: 12000000,
  }
];

export default function AdminOrgsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredOrgs = MOCK_ORGS.filter(org => 
      org.name.includes(searchQuery) || org.contactName.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">기관 관리 (CRM)</h2>
          <p className="text-muted-foreground">기업 및 학교 고객의 통합 이력 관리</p>
        </div>
        <Button>
            <Building2 className="w-4 h-4 mr-2" /> 기관 등록
        </Button>
      </div>

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
      </div>

      <div className="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>기관 정보</TableHead>
                    <TableHead>지역</TableHead>
                    <TableHead>담당자</TableHead>
                    <TableHead className="text-right">진행 프로그램</TableHead>
                    <TableHead className="text-right">총 매출</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredOrgs.map((org) => (
                    <TableRow key={org.id}>
                        <TableCell>
                            <Link href={`/admin/organizations/${org.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium">{org.name}</div>
                                    <div className="text-xs text-muted-foreground uppercase">{org.type}</div>
                                </div>
                            </Link>
                        </TableCell>
                        <TableCell>
                             <div className="flex items-center gap-1 text-sm text-slate-500">
                                 <MapPin className="w-3 h-3" /> {org.region}
                             </div>
                        </TableCell>
                        <TableCell className="text-sm">
                            {org.contactName} <span className="text-xs text-slate-400">({org.phone})</span>
                        </TableCell>
                        <TableCell className="text-right">
                            <Badge variant="secondary">{org.programCount}건</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                            {org.totalSpent.toLocaleString()}원
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
                                        <TrendingUp className="w-4 h-4 mr-2" /> 매출 분석
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Users className="w-4 h-4 mr-2" /> 참여자 명단
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
