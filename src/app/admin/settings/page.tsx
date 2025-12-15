"use client";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">설정</h1>
        <p className="text-muted-foreground">관리자 대시보드 및 시스템 설정을 관리합니다.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>사이트 기본 정보</CardTitle>
              <CardDescription>
                사이트의 기본 정보를 설정합니다. 이 정보는 사이트 전반에 표시됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-name">사이트 이름</Label>
                <Input id="site-name" defaultValue="Career Platform" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="support-email">고객지원 이메일</Label>
                <Input id="support-email" defaultValue="support@humanx.co.kr" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">점검 모드</Label>
                    <p className="text-sm text-muted-foreground">
                        활성화 시 사용자 접속이 제한되고 점검 페이지가 표시됩니다.
                    </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button>변경사항 저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>알림 설정</CardTitle>
                    <CardDescription>이메일 및 시스템 알림 수신 여부를 설정합니다.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="new-order" className="flex flex-col space-y-1">
                            <span>신규 주문 알림</span>
                            <span className="font-normal text-xs text-muted-foreground">새로운 주문이 들어오면 알림을 받습니다.</span>
                        </Label>
                        <Switch id="new-order" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="new-reservation" className="flex flex-col space-y-1">
                            <span>신규 예약 알림</span>
                            <span className="font-normal text-xs text-muted-foreground">새로운 상담 예약이 접수되면 알림을 받습니다.</span>
                        </Label>
                        <Switch id="new-reservation" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                            <span>마케팅 이메일 발송 리포트</span>
                            <span className="font-normal text-xs text-muted-foreground">자동화 마케팅 발송 결과를 매일 아침 수신합니다.</span>
                        </Label>
                        <Switch id="marketing-emails" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">설정 초기화</Button>
                    <Button className="ml-auto">저장</Button>
                </CardFooter>
            </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>보안 설정</CardTitle>
                    <CardDescription>계정 및 접근 보안을 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="current-password">현재 비밀번호</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="new-password">새 비밀번호</Label>
                        <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                    <Separator className="my-2" />
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="2fa" className="flex flex-col space-y-1">
                            <span>2단계 인증</span>
                            <span className="font-normal text-xs text-muted-foreground">로그인 시 추가 인증을 요구합니다.</span>
                        </Label>
                        <Switch id="2fa" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>비밀번호 변경</Button>
                </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
