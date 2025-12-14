"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CheckCircle2, Clock, Users, Calendar, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EstimateForm } from "@/components/business/EstimateForm";
import { EstimatePDF } from "@/components/business/EstimatePDF";

// Reuse Mock data or fetch (Mocking simply for now based on ID logic if needed, but using static example for F-02)
const PROGRAM_DETAIL = {
    id: "b1",
    title: "청소년 진로 탐색 캠프 '꿈을 찾는 여행'",
    description: "다양한 직업 체험과 적성 검사를 통해 자신의 잠재력을 발견하고 미래를 설계하는 몰입형 캠프입니다. 학교 현장에서 가장 만족도가 높은 프로그램으로, 4차 산업혁명 시대의 유망 직업군을 체험하고 전문가 멘토링을 통해 구체적인 진로 로드맵을 수립합니다.",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop",
    curriculum: [
        { time: "1교시(90분)", content: "Ice Breaking 및 자기이해 진단 (OCTO 검사)" },
        { time: "2교시(90분)", content: "미래 유망 직업 트렌드 특강 및 조별 토의" },
        { time: "중식(60분)", content: "점심 식사 및 휴식" },
        { time: "3교시(120분)", content: "직업 체험 실습 (코딩, 메이커, 디자인 등 택1)" },
        { time: "4교시(60분)", content: "진로 로드맵 발표 및 수료식" }
    ],
    features: ["검증된 커리큘럼", "전문 자격증 보유 강사진", "최신형 실습 기자재 제공", "결과 보고서 제공"],
    basePrice: 50000 // Per person approx
};

export default function BusinessDetailPage() {
    const params = useParams();
    // In real app, fetch program by params.id
    
    const [estimateData, setEstimateData] = useState<any>(null);
    const pdfRef = useRef<HTMLDivElement>(null);

    const handleGeneratePDF = (data: any) => {
        setEstimateData(data);
        // Wait for state to update and render PDF component, then print
        setTimeout(() => {
            window.print();
        }, 500);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
             {/* Printable Area */}
             <EstimatePDF ref={pdfRef} data={estimateData} />

             {/* Web Content */}
             <div className="print:hidden">
                 {/* Hero Image */}
                 <div className="relative h-[40vh] w-full">
                      <Image 
                          src={PROGRAM_DETAIL.thumbnail} 
                          alt="Program Detail"
                          fill
                          className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto">
                           <Badge className="mb-4 bg-primary text-white">학교/단체 프로그램</Badge>
                           <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{PROGRAM_DETAIL.title}</h1>
                           <div className="flex flex-wrap gap-6 text-white/80">
                               <div className="flex items-center gap-2">
                                   <Clock className="w-5 h-5" />
                                   <span>1일 (6시간) 과정</span>
                               </div>
                               <div className="flex items-center gap-2">
                                   <Users className="w-5 h-5" />
                                   <span>20~100명 권장</span>
                               </div>
                               <div className="flex items-center gap-2">
                                   <Calendar className="w-5 h-5" />
                                   <span>연중 상시 운영</span>
                               </div>
                           </div>
                      </div>
                 </div>

                 <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                     {/* Left: Detail Content */}
                     <div className="lg:col-span-2 space-y-12">
                          <section>
                              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                                  프로그램 소개
                              </h2>
                              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                                  {PROGRAM_DETAIL.description}
                              </p>
                          </section>

                          <section>
                              <h2 className="text-2xl font-bold mb-6">주요 특징</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {PROGRAM_DETAIL.features.map((feature, idx) => (
                                       <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                           <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                           <span className="font-semibold">{feature}</span>
                                       </div>
                                   ))}
                              </div>
                          </section>

                          <section>
                              <h2 className="text-2xl font-bold mb-6">커리큘럼 예시</h2>
                              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                  {PROGRAM_DETAIL.curriculum.map((item, idx) => (
                                      <div key={idx} className="flex border-b last:border-0 border-slate-100 dark:border-slate-800">
                                          <div className="w-32 md:w-40 bg-slate-50 dark:bg-slate-900 p-4 font-semibold text-slate-600 flex items-center justify-center border-r border-slate-100 dark:border-slate-800 shrink-0 text-sm md:text-base">
                                              {item.time}
                                          </div>
                                          <div className="p-4 flex items-center text-sm md:text-base">
                                              {item.content}
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </section>

                          <section>
                              <h2 className="text-2xl font-bold mb-6">진행 사례</h2>
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="aspect-video bg-slate-200 rounded-xl relative overflow-hidden">
                                      <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop" alt="Gallery 1" fill className="object-cover" />
                                  </div>
                                  <div className="aspect-video bg-slate-200 rounded-xl relative overflow-hidden">
                                      <Image src="https://images.unsplash.com/photo-1524178232363-1fb2b075b955?q=80&w=2670&auto=format&fit=crop" alt="Gallery 2" fill className="object-cover" />
                                  </div>
                              </div>
                          </section>
                     </div>

                     {/* Right: Estimate Calculator Sticky */}
                     <div className="lg:col-span-1">
                         <div className="sticky top-24">
                              <EstimateForm 
                                  basePrice={PROGRAM_DETAIL.basePrice} 
                                  programTitle={PROGRAM_DETAIL.title}
                                  onGeneratePDF={handleGeneratePDF}
                              />
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
}
