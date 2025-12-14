"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Search, BookOpen, Clock, BarChart, Filter, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Programs
export interface Program {
  id: string;
  title: string;
  category: string;
  level: "초급" | "중급" | "고급";
  duration: string;
  price: number;
  instructor: string;
  rating: number;
  studentCount: number;
  thumbnail: string;
  tags: string[];
}

export const MOCK_PROGRAMS: Program[] = [
  {
    id: "p1",
    title: "진로 적성 상담사 2급 자격 과정",
    category: "자격증",
    level: "초급",
    duration: "4주 (20시간)",
    price: 350000,
    instructor: "김진로 박사",
    rating: 4.9,
    studentCount: 1250,
    thumbnail: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop",
    tags: ["자격증", "상담", "진로설계"],
  },
  {
    id: "p2",
    title: "청소년 학습 코칭 전문가 과정",
    category: "전문가",
    level: "중급",
    duration: "8주 (40시간)",
    price: 550000,
    instructor: "이학습 교수",
    rating: 4.8,
    studentCount: 890,
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
    tags: ["코칭", "학습법", "청소년"],
  },
  {
    id: "p3",
    title: "MBTI 활용 진로 지도법",
    category: "직무역량",
    level: "초급",
    duration: "2주 (10시간)",
    price: 150000,
    instructor: "박심리 강사",
    rating: 4.7,
    studentCount: 3400,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    tags: ["심리검사", "진로지도", "MBTI"],
  },
  {
    id: "p4",
    title: "대입 수시/정시 컨설팅 마스터 클래스",
    category: "전문가",
    level: "고급",
    duration: "12주 (60시간)",
    price: 1200000,
    instructor: "최입시 소장",
    rating: 5.0,
    studentCount: 450,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    tags: ["입시", "컨설팅", "실전"],
  },
  {
    id: "p5",
    title: "자기주도학습 멘토링 입문",
    category: "교양",
    level: "초급",
    duration: "3주 (15시간)",
    price: 200000,
    instructor: "정멘토 코치",
    rating: 4.6,
    studentCount: 120,
    thumbnail: "https://images.unsplash.com/photo-1513258496098-882605922721?q=80&w=800&auto=format&fit=crop",
    tags: ["멘토링", "자기주도", "입문"],
  }
];

const CATEGORIES = ["전체", "자격증", "전문가", "직무역량", "교양"];

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = MOCK_PROGRAMS.filter((program) => {
    const matchesCategory = activeCategory === "전체" || program.category === activeCategory;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          program.instructor.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              교육 프로그램 <BookOpen className="w-8 h-8 text-primary" />
            </h1>
            <p className="text-muted-foreground text-lg">
              전문성을 높이고 새로운 기회를 여는 최고의 교육 과정을 만나보세요.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
             <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                    placeholder="과정명, 강사명 검색..." 
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
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                        "px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                        activeCategory === category
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:border-white"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                    <Link href={`/programs/${program.id}`} key={program.id} className="group">
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 overflow-hidden">
                            {/* Thumbnail */}
                            <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                                <Image
                                    src={program.thumbnail}
                                    alt={program.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-900/90 dark:text-white backdrop-blur-sm shadow-sm">
                                        {program.category}
                                    </Badge>
                                </div>
                            </div>
                            
                            <CardContent className="p-5">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1"><BarChart className="w-3.5 h-3.5" /> {program.level}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {program.duration}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                    {program.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">{program.instructor}</p>
                                
                                <div className="flex items-center gap-3 text-sm">
                                     <div className="flex items-center text-amber-500 font-medium">
                                        <Star className="w-4 h-4 fill-current mr-1" />
                                        {program.rating}
                                     </div>
                                     <div className="flex items-center text-slate-500">
                                         <Users className="w-4 h-4 mr-1" />
                                         {program.studentCount.toLocaleString()}명
                                     </div>
                                </div>
                            </CardContent>

                            <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-auto pt-4">
                                <div className="font-bold text-lg text-primary">
                                    {program.price.toLocaleString()}원
                                </div>
                                <Button variant="ghost" size="sm" className="hover:bg-primary/5 hover:text-primary -mr-2">
                                    상세보기
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))
            ) : (
                <div className="col-span-full text-center py-20">
                     <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
                     <Button 
                        variant="link" 
                        onClick={() => {setActiveCategory("전체"); setSearchQuery("");}}
                        className="mt-2"
                     >
                        전체 목록 보기
                     </Button>
                </div>
            )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
