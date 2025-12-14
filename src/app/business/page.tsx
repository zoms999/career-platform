"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProgramCard, ProgramProps } from "@/components/business/ProgramCard";

// Mock Data
const MOCK_PROGRAMS: ProgramProps[] = [
    {
        id: "b1",
        title: "청소년 진로 탐색 캠프 '꿈을 찾는 여행'",
        target: "school",
        description: "다양한 직업 체험과 적성 검사를 통해 자신의 잠재력을 발견하고 미래를 설계하는 몰입형 캠프입니다.",
        thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop",
        minPeople: 20,
        maxPeople: 100,
        duration: "1일 (6시간)",
        tags: ["진로탐색", "적성검사", "직업체험"]
    },
    {
        id: "b2",
        title: "신입사원 비즈니스 역량 강화 워크숍",
        target: "company",
        description: "조직 적응력 향상과 효과적인 커뮤니케이션 스킬을 배양하여 팀워크를 극대화하는 실무 중심 교육입니다.",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        minPeople: 10,
        maxPeople: 50,
        duration: "1박 2일",
        tags: ["조직문화", "커뮤니케이션", "팀빌딩"]
    },
    {
        id: "b3",
        title: "은퇴 예정자를 위한 생애 설계 프로그램",
        target: "public",
        description: "제2의 인생을 준비하는 신중년을 위한 재무, 건강, 여가, 일자리 종합 솔루션을 제공합니다.",
        thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop",
        minPeople: 15,
        maxPeople: 40,
        duration: "4회기 (회당 2시간)",
        tags: ["생애설계", "재취업", "노후준비"]
    },
    {
        id: "b4",
        title: "복지관 이용자 대상 디지털 리터러시 교육",
        target: "welfare",
        description: "스마트폰 활용부터 키오스크 사용법까지, 일상생활에 필수적인 디지털 기기 활용 능력을 키웁니다.",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
        minPeople: 10,
        maxPeople: 20,
        duration: "8회기 (회당 1.5시간)",
        tags: ["디지털교육", "생활적응", "정보격차해소"]
    },
    {
        id: "b5",
        title: "대학생 취업 역량 강화 및 모의 면접",
        target: "school",
        description: "최신 채용 트렌드 분석과 실전 모의 면접을 통해 취업 경쟁력을 높이는 집중 트레이닝 과정입니다.",
        thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop",
        minPeople: 30,
        maxPeople: 200,
        duration: "반일 (4시간)",
        tags: ["취업준비", "면접코칭", "자기소개서"]
    },
    {
        id: "b6",
        title: "중간관리자 리더십 코칭",
        target: "company",
        description: "MZ세대 팀원과의 소통법과 성과 관리 노하우를 배우는 중간관리자 맞춤형 리더십 프로그램입니다.",
        thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
        minPeople: 5,
        maxPeople: 30,
        duration: "2일 (16시간)",
        tags: ["리더십", "성과관리", "코칭"]
    }
];

export default function BusinessListingPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = MOCK_PROGRAMS.filter(program => {
      const matchesTarget = activeFilter === "all" || program.target === activeFilter;
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            program.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTarget && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
       {/* Hero Section */}
       <section className="relative h-[400px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
           <div className="absolute inset-0 z-0">
               <Image 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                  alt="Business Hero"
                  fill
                  className="object-cover opacity-30"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />
           </div>
           
           <div className="relative z-10 text-center max-w-3xl px-6">
               <Badge className="mb-4 bg-primary text-white border-0 px-3 py-1 text-sm">B2B / B2G 기관 전용</Badge>
               <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                   최고의 교육 파트너,<br/>
                   <span className="text-primary">한국진로적성센터</span>와 함께하세요
               </h1>
               <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
                   학교, 기업, 공공기관을 위한 맞춤형 교육 솔루션을 제공합니다.
                   원하는 프로그램을 찾고 1분 만에 예상 견적을 확인해보세요.
               </p>
               
               <div className="flex max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20">
                    <div className="pl-4 flex items-center justify-center text-white/60">
                        <Search className="w-5 h-5" />
                    </div>
                    <Input 
                        placeholder="찾으시는 교육 주제나 키워드를 입력하세요" 
                        className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button className="rounded-full px-6 bg-primary hover:bg-primary/90">검색</Button>
               </div>
           </div>
       </section>

       {/* Main Content */}
       <section className="container mx-auto px-4 -mt-10 relative z-20">
           {/* Filters */}
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-2 mb-10 inline-flex flex-wrap gap-1 border border-slate-100 dark:border-slate-800 mx-auto left-0 right-0 w-fit md:w-auto overflow-x-auto justify-center md:justify-start">
                {[
                    { id: "all", label: "전체 보기" },
                    { id: "school", label: "학교 (초/중/고/대)" },
                    { id: "company", label: "기업/기관" },
                    { id: "public", label: "공공기관" },
                    { id: "welfare", label: "복지관" }
                ].map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                            activeFilter === filter.id 
                            ? "bg-slate-900 text-white shadow-md" 
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
           </div>

           {/* Count */}
           <div className="flex items-center justify-between mb-6 px-2">
               <h2 className="text-xl font-bold flex items-center gap-2">
                   <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">{filteredPrograms.length}</span>
                   개의 프로그램을 찾았습니다
               </h2>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <SlidersHorizontal className="w-4 h-4" />
                   <span>추천순</span>
               </div>
           </div>

           {/* Grid */}
           {filteredPrograms.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {filteredPrograms.map((program) => (
                       <ProgramCard key={program.id} program={program} />
                   ))}
               </div>
           ) : (
               <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                   <p className="text-lg text-slate-500">조건에 맞는 프로그램이 없습니다.</p>
                   <Button variant="link" onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}>
                       전체 목록 보기
                   </Button>
               </div>
           )}
       </section>

       {/* Banner */}
       <section className="container mx-auto px-4 mt-20">
           <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-10 md:p-16 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
               <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl font-bold mb-4">원하는 교육이 없으신가요?</h2>
                    <p className="text-blue-100 text-lg mb-8">
                        기관의 니즈에 딱 맞는 커스텀 교육 프로그램을 기획해 드립니다.
                        전문 컨설턴트와 상담해보세요.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-white text-blue-900 hover:bg-white/90 font-bold h-12 px-8">
                            전화 상담 신청
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8">
                            브로슈어 다운로드
                        </Button>
                    </div>
               </div>
               
               {/* Decorative Circle */}
               <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           </div>
       </section>
    </div>
  );
}
