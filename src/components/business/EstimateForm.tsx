"use client";

import { useState, useEffect } from "react";
import { Calculator, FileDown, MapPin, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
// import { ProgramLead } from "@/types/business"; // Removed missing import

interface EstimateFormProps {
    basePrice: number;
    programTitle: string;
    onGeneratePDF: (data: any) => void;
}

export function EstimateForm({ basePrice, programTitle, onGeneratePDF }: EstimateFormProps) {
    const [people, setPeople] = useState<number>(30);
    const [sessions, setSessions] = useState<number>(1);
    const [region, setRegion] = useState<string>("seoul");
    const [date, setDate] = useState<string>("");
    
    // Org Info
    const [orgName, setOrgName] = useState("");
    const [picName, setPicName] = useState("");
    const [contact, setContact] = useState("");

    const [totalPrice, setTotalPrice] = useState(0);

    // Calculate Price
    useEffect(() => {
        let regionFee = 0;
        if (region === "gyeonggi") regionFee = 50000;
        if (region === "province") regionFee = 100000;

        // Formula: (Base * People * Sessions) + (RegionFee * Sessions [Assumption: travel per session? or once? Let's say per session])
        const calculated = (basePrice * people * sessions) + (regionFee * sessions);
        setTotalPrice(calculated);
    }, [people, sessions, region, basePrice]);

    const handleSubmit = () => {
        if (!orgName || !picName || !contact || !date) {
            toast.error("필수 정보를 모두 입력해주세요.");
            return;
        }

        const estimateData = {
            programTitle,
            basePrice,
            people,
            sessions,
            region,
            regionLabel: region === "seoul" ? "서울" : region === "gyeonggi" ? "경기/인천" : "지방",
            date,
            orgName,
            picName,
            contact,
            totalPrice
        };
        
        // Trigger PDF generation in parent
        onGeneratePDF(estimateData);
        toast.success("견적서가 생성되었습니다.");
        
        // Mock Lead Generation (F-04) - In a real app, this would be an API call
        console.log("Lead Generated:", estimateData); 
    };

    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-lg">
            <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="w-5 h-5 text-primary" />
                    예상 견적 계산기
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* 1. Program Defaults */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>참여 인원 (명)</Label>
                        <div className="relative">
                            <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                type="number" 
                                min={10} 
                                value={people} 
                                onChange={(e) => setPeople(parseInt(e.target.value) || 0)} 
                                className="pl-9"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>진행 회기 (회)</Label>
                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                type="number" 
                                min={1} 
                                value={sessions} 
                                onChange={(e) => setSessions(parseInt(e.target.value) || 0)} 
                                className="pl-9"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>진행 지역 (출장비 산정)</Label>
                    <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger className="pl-9 relative">
                             <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <SelectValue placeholder="지역 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="seoul">서울 (출장비 없음)</SelectItem>
                            <SelectItem value="gyeonggi">경기/인천 (+50,000원/회)</SelectItem>
                            <SelectItem value="province">그 외 지방 (+100,000원/회)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                     <Label>희망 일정</Label>
                     <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <Separator />

                {/* 2. Contact Info for Lead */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">신청자 정보</Label>
                    <Input placeholder="기관/학교명 (예: 한국고등학교)" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="담당자 성함" value={picName} onChange={(e) => setPicName(e.target.value)} />
                        <Input placeholder="연락처" value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex-col gap-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="w-full flex justify-between items-center">
                    <span className="text-slate-500 font-medium">총 예상 견적</span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        {totalPrice.toLocaleString()}원
                    </span>
                </div>
                <Button className="w-full h-12 text-lg" onClick={handleSubmit}>
                    <FileDown className="w-5 h-5 mr-2" /> 견적서 PDF 다운로드
                </Button>
                <p className="text-xs text-slate-400 text-center">
                    * 위 금액은 부가세 별도이며, 정확한 최종 견적은 담당자와의 상담 후 확정됩니다.
                </p>
            </CardFooter>
        </Card>
    );
}
