"use client";

import { useState } from "react";
import { Consultant, ConsultantCard } from "@/components/consulting/ConsultantCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Users, Calendar, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock Data
const MOCK_CONSULTANTS: Consultant[] = [
  {
    id: "1",
    name: "김진로",
    role: "수석 컨설턴트",
    specialties: ["진로설계", "대입수시", "입시전략"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 128,
    location: "Online / Seoul",
    isOnlineAvailable: true,
    nextAvailable: "오늘 14:00",
    description: "15년 경력의 진로 진학 전문가입니다. 학생의 잠재력을 발견하고 최적의 진로 로드맵을 제시합니다.",
  },
  {
    id: "2",
    name: "이취업",
    role: "커리어 코치",
    specialties: ["취업면접", "자소서첨삭", "이직상담"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 95,
    location: "Online",
    isOnlineAvailable: true,
    nextAvailable: "내일 10:00",
    description: "대기업 인사팀 출신의 실전 취업 코칭. 면접관의 관점에서 당신의 강점을 어필하는 방법을 알려드립니다.",
  },
  {
    id: "3",
    name: "박심리",
    role: "임상심리사",
    specialties: ["심리상담", "학습클리닉", "부모상담"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    rating: 5.0,
    reviews: 210,
    location: "Center (Gangnam)",
    isOnlineAvailable: false,
    nextAvailable: "12월 20일",
    description: "마음의 소리를 듣는 따뜻한 상담. 학습 부진의 원인을 심리적 관점에서 분석하고 해결책을 찾아갑니다.",
  },
  {
    id: "4",
    name: "최적성",
    role: "진로적성 분석가",
    specialties: ["검사해석", "진로탐색", "성향분석"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
    reviews: 56,
    location: "Online",
    isOnlineAvailable: true,
    nextAvailable: "오늘 16:30",
    description: "데이터 기반의 정확한 적성 분석. OCTO 검사 결과에 숨겨진 당신만의 재능을 찾아드립니다.",
  },
  {
    id: "5",
    name: "정멘토",
    role: "청소년 멘토",
    specialties: ["학습동기", "습관형성", "멘토링"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 82,
    location: "Online",
    isOnlineAvailable: true,
    nextAvailable: "내일 19:00",
    description: "형/누나 같은 편안한 멘토링. 공부가 하기 싫은 이유를 함께 찾고 스스로 공부하는 힘을 길러줍니다.",
  }
];

const SPECIALTIES = ["전체", "진로설계", "취업면접", "심리상담", "검사해석", "학습클리닉"];

export default function ConsultingPage() {
  const [activeSpecialty, setActiveSpecialty] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConsultants = MOCK_CONSULTANTS.filter((consultant) => {
    const matchesSpecialty = activeSpecialty === "전체" || consultant.specialties.includes(activeSpecialty);
    const matchesSearch = 
        consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        consultant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    전문가 찾기 <Users className="w-6 h-6 text-primary" />
                </h1>
                <p className="text-muted-foreground text-lg">
                    당신의 고민을 해결해줄 최고의 전문가를 만나보세요.
                </p>
            </div>

            <div className="flex w-full md:w-auto gap-3">
                 <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        placeholder="이름, 전문분야 검색..." 
                        className="pl-9 h-12 bg-white dark:bg-slate-800 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button size="icon" variant="outline" className="h-12 w-12 rounded-xl bg-white dark:bg-slate-800 shrink-0">
                    <Filter className="w-5 h-5" />
                </Button>
            </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-6 gap-2 mb-4 no-scrollbar">
            {SPECIALTIES.map((specialty) => (
                <button
                    key={specialty}
                    onClick={() => setActiveSpecialty(specialty)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                        activeSpecialty === specialty
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:border-white"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                    }`}
                >
                    {specialty}
                </button>
            ))}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
                총 <span className="text-primary font-bold">{filteredConsultants.length}</span>명의 전문가가 있습니다.
            </span>
            {/* Sorting (Placeholder) */}
            <div className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">
                <SlidersHorizontal className="w-4 h-4" /> 추천순
            </div>
        </div>

        {/* Consultant Grid */}
        {filteredConsultants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredConsultants.map((consultant) => (
                    <ConsultantCard key={consultant.id} consultant={consultant} />
                ))}
            </div>
        ) : (
             <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold mb-1">검색 결과가 없습니다</h3>
                <p className="text-muted-foreground">다른 키워드나 카테고리를 선택해보세요.</p>
                <Button 
                    variant="link" 
                    onClick={() => {setActiveSpecialty("전체"); setSearchQuery("");}}
                    className="mt-4"
                >
                    전체 목록 보기
                </Button>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
