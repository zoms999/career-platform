"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoPlayer } from "@/components/lms/VideoPlayer";
import { ClassroomSidebar } from "@/components/lms/ClassroomSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Mock Data (Shared with Detail Page in real app via API/State)
const MOCK_CURRICULUM = [
    {
        title: "섹션 1: 진로 상담의 기초",
        lectures: [
            { id: "l1", title: "1강. 진로 상담이란 무엇인가?", duration: "15:00", completed: true, locked: false },
            { id: "l2", title: "2강. 상담사의 윤리와 자세", duration: "20:00", completed: false, locked: false },
            { id: "l3", title: "3강. 진로 발달 이론의 이해", duration: "25:00", completed: false, locked: true },
        ]
    },
    {
        title: "섹션 2: 진로 적성 검사 활용",
        lectures: [
            { id: "l4", title: "4강. OCTO 검사의 이해", duration: "30:00", completed: false, locked: true },
            { id: "l5", title: "5강. 검사 결과 해석 방법 (기초)", duration: "45:00", completed: false, locked: true },
        ]
    }
];

export default function ClassroomPage() {
  const params = useParams();
  const router = useRouter();
  const programId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [currentLectureId, setCurrentLectureId] = useState("l1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(20); // Mock overall progress

  // Find current lecture details
  const currentLecture = MOCK_CURRICULUM
    .flatMap(s => s.lectures)
    .find(l => l.id === currentLectureId);

  const handleLectureSelect = (id: string) => {
    setCurrentLectureId(id);
    setSidebarOpen(false); // Close mobile sidebar on select
  };

  const handleVideoProgress = (percent: number) => {
      // Logic to update progress would go here
      // console.log("Progress:", percent);
  };

  const handleVideoComplete = () => {
      // Logic to mark as complete and unlock next
      alert("학습을 완료했습니다! 다음 강의가 잠금 해제됩니다.");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-900 shrink-0">
         <div className="flex items-center gap-4">
             <Link href={`/programs/${programId}`} className="hover:bg-slate-800 p-2 rounded-full transition-colors">
                 <ChevronLeft className="w-6 h-6" />
             </Link>
             <h1 className="font-semibold text-lg line-clamp-1">
                진로 적성 상담사 2급 자격 과정
             </h1>
         </div>
         
         <div className="flex items-center gap-2">
             <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                 <SheetTrigger asChild>
                     <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-slate-800">
                         <Menu className="w-6 h-6" />
                     </Button>
                 </SheetTrigger>
                 <SheetContent side="right" className="p-0 w-80 border-l border-slate-800 bg-slate-900 text-white">
                      <ClassroomSidebar 
                        curriculum={MOCK_CURRICULUM}
                        currentLectureId={currentLectureId}
                        onLectureSelect={handleLectureSelect}
                        progress={progress}
                        className="bg-slate-900 border-none h-full"
                      />
                 </SheetContent>
             </Sheet>
         </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
              {/* Video Player Container */}
              <div className="w-full bg-black aspect-video max-h-[70vh] shadow-2xl">
                  <VideoPlayer 
                    src="" 
                    onProgress={handleVideoProgress}
                    onComplete={handleVideoComplete}
                    className="w-full h-full rounded-none"
                  />
              </div>

              {/* Content Below Video */}
              <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
                  <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
                      <div className="flex gap-4 text-sm text-slate-400">
                          <span>강의 시간: {currentLecture?.duration}</span>
                          <span>수강 기한: 무제한</span>
                      </div>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="bg-slate-900 border border-slate-800">
                          <TabsTrigger value="overview">강의 소개</TabsTrigger>
                          <TabsTrigger value="qna">질문 & 답변</TabsTrigger>
                          <TabsTrigger value="notes">강의 자료</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="mt-6 text-slate-300 leading-relaxed space-y-4">
                          <p>
                              이번 강의에서는 진로 상담의 가장 기초가 되는 개념과 철학에 대해 다룹니다.
                              상담사가 갖추어야 할 기본적인 태도와 내담자를 마주하는 마인드셋을 학습합니다.
                          </p>
                          <h3 className="text-lg font-bold text-white mt-4">학습 목표</h3>
                          <ul className="list-disc pl-5 space-y-1">
                              <li>진로 상담의 정의를 이해한다.</li>
                              <li>상담의 3대 요소를 설명할 수 있다.</li>
                              <li>라포 형성의 중요성을 인지한다.</li>
                          </ul>
                      </TabsContent>
                      <TabsContent value="qna" className="mt-6">
                          <div className="text-center py-10 text-slate-500">
                              등록된 질문이 없습니다. 첫 번째 질문을 남겨보세요!
                          </div>
                      </TabsContent>
                      <TabsContent value="notes" className="mt-6">
                           <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800">
                               <div className="flex items-center gap-3">
                                   <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold">PDF</div>
                                   <div>
                                       <div className="font-medium">1강 강의 교안.pdf</div>
                                       <div className="text-xs text-slate-500">2.5 MB</div>
                                   </div>
                               </div>
                               <Button variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800">다운로드</Button>
                           </div>
                      </TabsContent>
                  </Tabs>
              </div>
          </main>

          {/* Desktop Sidebar (Right Side) */}
          <aside className="hidden lg:block w-96 shrink-0 border-l border-slate-800 bg-slate-900">
               <ClassroomSidebar 
                    curriculum={MOCK_CURRICULUM}
                    currentLectureId={currentLectureId}
                    onLectureSelect={handleLectureSelect}
                    progress={progress}
                    className="bg-slate-900 border-none h-full text-white"
               />
          </aside>
      </div>
    </div>
  );
}
