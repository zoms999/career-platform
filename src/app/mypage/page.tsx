"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookOpen, MessageSquare, CreditCard } from "lucide-react";
import { ProfileCard } from "@/components/mypage/ProfileCard";
import { LearningTab } from "@/components/mypage/LearningTab";
import { ConsultingTab } from "@/components/mypage/ConsultingTab";
import { PaymentTab } from "@/components/mypage/PaymentTab";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("learning");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20 max-w-5xl">
        <div className="flex items-center gap-2 mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">마이 페이지</h1>
            <User className="w-8 h-8 text-primary opacity-20" />
        </div>

        {/* H-01: Profile Summary */}
        <div className="mb-10">
             <ProfileCard />
        </div>

        {/* Tabs for H-01, H-02 */}
        <Tabs defaultValue="learning" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-1 shadow-sm">
                <TabsTrigger value="learning" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700 rounded-lg text-base gap-2">
                    <BookOpen className="w-4 h-4" /> 학습/검사 관리
                </TabsTrigger>
                <TabsTrigger value="consulting" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700 rounded-lg text-base gap-2">
                    <MessageSquare className="w-4 h-4" /> 상담 예약 관리
                </TabsTrigger>
                <TabsTrigger value="payments" className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700 rounded-lg text-base gap-2">
                    <CreditCard className="w-4 h-4" /> 결제/주문 내역
                </TabsTrigger>
            </TabsList>

            <div className="min-h-[400px]">
                {/* H-01: Learning & Tests */}
                <TabsContent value="learning" className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <LearningTab />
                </TabsContent>

                {/* H-02: Consulting Reservations */}
                <TabsContent value="consulting" className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <ConsultingTab />
                </TabsContent>

                {/* H-02: Payments */}
                <TabsContent value="payments" className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <PaymentTab />
                </TabsContent>
            </div>
        </Tabs>

      </main>

      <Footer />
    </div>
  );
}
