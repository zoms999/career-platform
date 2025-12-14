"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-sm font-semibold border border-blue-200/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            50만 건 이상의누적 데이터 분석
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            나의 숨겨진 <span className="text-primary">가능성</span>을<br />
            <span className="relative inline-block">
               데이터로 증명하다
               <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
               </svg>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            한국진로적성센터의 독자적인 8가지 지능(OCTO) 분석 알고리즘으로<br className="hidden sm:block"/>
            당신에게 가장 적합한 직무와 학습 전략을 제시합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
             <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 w-full sm:w-auto" asChild>
               <Link href="/test">
                 무료 적성검사 시작하기 <MoveRight className="ml-2 w-5 h-5" />
               </Link>
             </Button>
             <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 hover:bg-slate-50 w-full sm:w-auto overflow-hidden group">
                <PlayCircle className="mr-2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                서비스 소개 영상
             </Button>
          </div>

          <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-400 text-sm font-medium">
             <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900" />
                   ))}
                </div>
                <span>500,000+ 분석 완료</span>
             </div>
             <div className="w-px h-4 bg-slate-300" />
             <div className="flex items-center gap-1">
                ⭐ 4.9/5 만족도
             </div>
          </div>
        </motion.div>

        {/* Visual Element (Mockup) */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative hidden lg:block"
        >
           <div className="relative w-full h-[600px] bg-white rounded-[2.5rem] shadow-2xl border p-4 rotate-[-3deg] hover:rotate-0 transition-transform duration-500 ease-out z-10">
              <div className="w-full h-full bg-slate-50 rounded-3xl overflow-hidden relative">
                 {/* Fake UI Content */}
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
                 
                 {/* Graph Visual Mock */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[30px] border-blue-500 rounded-full" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[30px] border-indigo-500 rounded-full" />
                 <div className="absolute bottom-10 left-10 p-4 bg-white/80 backdrop-blur rounded-xl shadow-lg border w-48">
                    <div className="h-2 w-24 bg-slate-200 rounded mb-2" />
                    <div className="h-2 w-16 bg-slate-200 rounded" />
                 </div>
                  <div className="absolute top-10 right-10 p-4 bg-white/80 backdrop-blur rounded-xl shadow-lg border w-40">
                     <div className="flex gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100" />
                        <div>
                           <div className="h-2 w-20 bg-slate-200 rounded mb-1" />
                           <div className="h-2 w-10 bg-slate-200 rounded" />
                        </div>
                     </div>
                 </div>
              </div>
           </div>
           
           {/* Background Card Effect */}
           <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-[3deg] opacity-10 -z-10 translate-y-4 translate-x-4" />
        </motion.div>
      </div>
    </section>
  );
}
