"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, Clock, BarChart, Users, Star, CheckCircle2, FileText, Share2, Heart } from "lucide-react";
import { MOCK_PROGRAMS, Program } from "../page"; // Import mock data

// Extended Mock Data for Detail
const MOCK_CURRICULUM = [
    {
        section: "섹션 1: 진로 상담의 기초",
        lectures: [
            { title: "1강. 진로 상담이란 무엇인가?", duration: "15:00", free: true },
            { title: "2강. 상담사의 윤리와 자세", duration: "20:00", free: false },
            { title: "3강. 진로 발달 이론의 이해", duration: "25:00", free: false },
        ]
    },
    {
        section: "섹션 2: 진로 적성 검사 활용",
        lectures: [
            { title: "4강. OCTO 검사의 이해", duration: "30:00", free: false },
            { title: "5강. 검사 결과 해석 방법 (기초)", duration: "45:00", free: false },
            { title: "6강. 검사 결과 해석 방법 (심화)", duration: "50:00", free: false },
            { title: "7강. 유형별 상담 사례 분석", duration: "40:00", free: false },
        ]
    }
];

export default function ProgramDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  // Find program by ID (Fallback to first one if not found for mock)
  const program: Program = MOCK_PROGRAMS.find(p => p.id === id) || MOCK_PROGRAMS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 mt-16">
        {/* Hero Section */}
        <div className="bg-slate-900 text-white relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20" />
            
             <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10">
                     {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-2">
                             <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 border-0">
                                {program.category}
                             </Badge>
                             <span className="text-slate-400 flex items-center gap-1 text-sm">
                                <Star className="w-4 h-4 text-amber-400 fill-current" /> {program.rating} ({program.studentCount}명 수강)
                             </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            {program.title}
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
                            전문가의 노하우가 담긴 체계적인 커리큘럼으로 당신의 역량을 한 단계 업그레이드하세요. 
                            이론부터 실전까지 완벽하게 마스터할 수 있습니다.
                        </p>
                        
                        <div className="flex items-center gap-6 text-sm text-slate-300 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                     {/* Placeholder for instructor avatar */}
                                     <User className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">강사</p>
                                    <p className="font-semibold text-white">{program.instructor}</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-slate-700" />
                            <div>
                                <p className="text-xs text-slate-400">마지막 업데이트</p>
                                <p className="font-semibold text-white">2023.12.01</p>
                            </div>
                        </div>
                    </div>

                     {/* Floating Video/Price Card (Desktop) */}
                    <div className="hidden lg:block w-[380px] relative">
                         {/* This will be handled in the Layout/Sidebar area properly in real responsive design, 
                             but for now putting it here as part of the hero for visual flow */}
                    </div>
                </div>
             </div>
        </div>

        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10 relative">
             {/* Left Column: Content */}
             <div className="flex-1 space-y-12">
                 {/* What you'll learn */}
                 <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-6">이런 것을 배울 수 있어요</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-slate-600 dark:text-slate-300">
                                    진로 상담의 핵심 이론과 실제 적용 방법을 체계적으로 학습합니다.
                                </span>
                            </div>
                        ))}
                    </div>
                 </section>

                 {/* Curriculum */}
                 <section>
                     <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" /> 커리큘럼
                     </h2>
                     <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                            {MOCK_CURRICULUM.map((section, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`} className="border-b-slate-100 px-6 last:border-0">
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="text-left">
                                            <div className="font-bold text-lg">{section.section}</div>
                                            <div className="text-sm text-muted-foreground font-normal mt-1">
                                                {section.lectures.length}강 • 총 60분
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2 pb-6">
                                        {section.lectures.map((lecture, lIdx) => (
                                            <div key={lIdx} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <PlayCircle className={cn(
                                                        "w-5 h-5 group-hover:text-primary transition-colors",
                                                        lecture.free ? "text-primary" : "text-slate-400"
                                                    )} />
                                                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                                                        {lecture.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {lecture.free && (
                                                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                                                            미리보기
                                                        </Badge>
                                                    )}
                                                    <span className="text-sm text-muted-foreground tabular-nums">
                                                        {lecture.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                     </div>
                 </section>
             </div>

             {/* Right Column: Sticky Sidebar */}
             <div className="lg:w-[380px] shrink-0">
                 <div className="sticky top-24 space-y-6">
                     {/* Purchase Card */}
                     <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                         {/* Thumbnail for Mobile/Sidebar */}
                         <div className="relative h-48 bg-slate-200">
                             <Image 
                                src={program.thumbnail} 
                                alt={program.title}
                                fill
                                className="object-cover"
                             />
                             <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                 <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                             </div>
                         </div>
                         
                         <div className="p-6">
                             <div className="mb-6">
                                 <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {program.price.toLocaleString()}원
                                 </div>
                                 <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                     <CheckCircle2 className="w-4 h-4" /> 수강 기간 제한 없음 (무제한)
                                 </div>
                             </div>

                             <div className="space-y-3 mb-6">
                                 <Button className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20" size="lg">
                                     수강 신청하기
                                 </Button>
                                 <Button variant="outline" className="w-full h-12 rounded-xl">
                                     장바구니 담기
                                 </Button>
                             </div>

                             <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
                                 <div className="flex justify-between">
                                     <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 총 강의 시간</span>
                                     <span className="font-medium text-slate-900 dark:text-white tabular-nums">{program.duration}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="flex items-center gap-2"><BarChart className="w-4 h-4" /> 난이도</span>
                                     <span className="font-medium text-slate-900 dark:text-white">{program.level}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> 교재/자료</span>
                                     <span className="font-medium text-slate-900 dark:text-white">PDF 제공</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 수강 대상</span>
                                     <span className="font-medium text-slate-900 dark:text-white">누구나</span>
                                 </div>
                             </div>
                         </div>
                     </div>

                     {/* Actions */}
                     <div className="flex justify-center gap-4">
                         <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
                             <Heart className="w-5 h-5 mr-2" /> 찜하기
                         </Button>
                         <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
                             <Share2 className="w-5 h-5 mr-2" /> 공유하기
                         </Button>
                     </div>
                 </div>
             </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
