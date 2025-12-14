"use client";

import { useState } from "react";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock Automation Rules
const MOCK_RULES = [
    { id: 1, name: "검사 미완료 알림 (7일)", trigger: "test_incomplete_7d", channel: "sms", status: true, sent: 154 },
    { id: 2, name: "수강 기간 만료 임박 (3일전)", trigger: "course_expire_3d", channel: "email_sms", status: true, sent: 890 },
    { id: 3, name: "상담 예약 리마인드 (1일전)", trigger: "consulting_remind_1d", channel: "kakao", status: true, sent: 45 },
    { id: 4, name: "VIP 회원 승급 축하", trigger: "vip_upgrade", channel: "email", status: false, sent: 12 },
];

export default function MarketingAutomationPage() {
  const [rules, setRules] = useState(MOCK_RULES);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <div>
           <h2 className="text-3xl font-bold tracking-tight">자동화/마케팅 (CRM)</h2>
           <p className="text-muted-foreground">이벤트 기반 자동 알림 및 캠페인 규칙 설정</p>
         </div>
         <Dialog>
             <DialogTrigger asChild>
                 <Button><Plus className="w-4 h-4 mr-2" /> 새 자동화 규칙</Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[500px]">
                 <DialogHeader>
                     <DialogTitle>새 자동화 규칙 만들기</DialogTitle>
                     <DialogDescription>
                         특정 조건 만족 시 회원에게 자동으로 알림을 보냅니다.
                     </DialogDescription>
                 </DialogHeader>
                 <div className="grid gap-4 py-4">
                     <div className="grid gap-2">
                         <Label>규칙 이름</Label>
                         <Input placeholder="예: 장바구니 유기 알림" />
                     </div>
                     <div className="grid gap-2">
                         <Label>트리거 조건</Label>
                         <Select>
                             <SelectTrigger>
                                 <SelectValue placeholder="조건 선택" />
                             </SelectTrigger>
                             <SelectContent>
                                 <SelectItem value="test_start">검사 시작 후 미완료</SelectItem>
                                 <SelectItem value="course_end">수강 종료일 임박</SelectItem>
                                 <SelectItem value="cart_abandon">장바구니 담고 미구매</SelectItem>
                             </SelectContent>
                         </Select>
                     </div>
                     <div className="grid gap-2">
                         <Label>발송 채널</Label>
                         <div className="flex gap-4">
                             <div className="flex items-center space-x-2">
                                 <Switch id="sms" />
                                 <Label htmlFor="sms">SMS</Label>
                             </div>
                             <div className="flex items-center space-x-2">
                                 <Switch id="email" />
                                 <Label htmlFor="email">Email</Label>
                             </div>
                         </div>
                     </div>
                     <div className="grid gap-2">
                         <Label>메시지 내용</Label>
                         <Textarea placeholder="발송할 메시지를 입력하세요. (변수 사용 가능: {name}, {date})" />
                     </div>
                 </div>
                 <DialogFooter>
                     <Button type="submit">규칙 저장</Button>
                 </DialogFooter>
             </DialogContent>
         </Dialog>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Active Rules List */}
           <Card className="lg:col-span-2">
               <CardHeader>
                   <CardTitle>활성 규칙 목록</CardTitle>
                   <CardDescription>현재 시스템에서 동작 중인 자동화 규칙입니다.</CardDescription>
               </CardHeader>
               <CardContent>
                   <div className="space-y-4">
                       {rules.map((rule) => (
                           <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                               <div className="flex items-center gap-4">
                                   <div className={`p-2 rounded-full ${rule.status ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                       {rule.channel === 'email' ? <Mail className="w-5 h-5"/> : <MessageSquare className="w-5 h-5"/>}
                                   </div>
                                   <div>
                                       <div className="font-semibold flex items-center gap-2">
                                           {rule.name}
                                           {!rule.status && <Badge variant="secondary" className="text-xs">비활성</Badge>}
                                       </div>
                                       <div className="text-sm text-muted-foreground flex items-center gap-2">
                                           <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{rule.trigger}</span>
                                           <span>• 누적 발송: {rule.sent}건</span>
                                       </div>
                                   </div>
                               </div>
                               <div className="flex items-center gap-4">
                                   <Switch checked={rule.status} />
                                   <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
                                       <Trash2 className="w-4 h-4" />
                                   </Button>
                               </div>
                           </div>
                       ))}
                   </div>
               </CardContent>
           </Card>

           {/* Stats / Logs Placeholder */}
           <Card>
               <CardHeader>
                   <CardTitle>오늘 발송 현황</CardTitle>
               </CardHeader>
               <CardContent>
                   <div className="text-3xl font-bold mb-2">1,245건</div>
                   <p className="text-sm text-muted-foreground">어제 대비 +12% 증가</p>
                   <div className="mt-4 flex gap-2">
                       <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">SMS 80%</Badge>
                       <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">Email 20%</Badge>
                   </div>
               </CardContent>
           </Card>

           <Card>
               <CardHeader>
                   <CardTitle>시스템 상태</CardTitle>
               </CardHeader>
               <CardContent>
                   <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-medium">알림 발송 서버 정상</span>
                   </div>
                   <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-medium">조건 체크 스케줄러 정상 동작중</span>
                   </div>
                   <div className="mt-6 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-md flex gap-2 items-start border border-yellow-100">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <div>
                            <strong>유의사항:</strong> 마케팅성 정보 수신 동의를 한 회원에게만 발송됩니다.
                        </div>
                   </div>
               </CardContent>
           </Card>
       </div>
    </div>
  );
}
