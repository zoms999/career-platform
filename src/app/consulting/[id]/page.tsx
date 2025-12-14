"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Monitor, Clock, CheckCircle2, ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format, addDays, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";

// Mock Data (Shared source ideally, but duplicated for demo speed)
const MOCK_CONSULTANTS: any = {
  "1": {
    id: "1",
    name: "김진로",
    role: "수석 컨설턴트",
    specialties: ["진로설계", "대입수시", "입시전략"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: 128,
    location: "Online / Seoul",
    isOnlineAvailable: true,
    description: "15년 경력의 진로 진학 전문가입니다. 학생의 잠재력을 발견하고 최적의 진로 로드맵을 제시합니다. 다수의 명문대 합격생 배출 경험을 바탕으로 현실적이고 구체적인 전략을 수립해드립니다.",
    careers: ["現 한국진로적성센터 수석 컨설턴트", "前 대치동 입시연구소 소장", "진로진학상담사 1급"],
    education: ["서울대학교 교육학 석사", "연세대학교 교육학 학사"]
  },
  "2": {
    id: "2",
    name: "이취업",
    role: "커리어 코치",
    specialties: ["취업면접", "자소서첨삭", "이직상담"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: 95,
    location: "Online",
    isOnlineAvailable: true,
    description: "대기업 인사팀 출신의 실전 취업 코칭. 면접관의 관점에서 당신의 강점을 어필하는 방법을 알려드립니다.",
     careers: ["現 커리어 코치", "前 S전자 인사팀 채용담당", "직업상담사 2급"],
    education: ["고려대학교 경영학 학사"]
  },
  "3": {
    id: "3",
    name: "박심리",
    role: "임상심리사",
    specialties: ["심리상담", "학습클리닉", "부모상담"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    rating: 5.0,
    reviews: 210,
    location: "Center (Gangnam)",
    isOnlineAvailable: false,
    description: "마음의 소리를 듣는 따뜻한 상담. 학습 부진의 원인을 심리적 관점에서 분석하고 해결책을 찾아갑니다.",
     careers: ["現 한국진로적성센터 심리상담사", "임상심리사 1급", "청소년상담사 2급"],
    education: ["이화여자대학교 심리학 석사"]
  }
};

// Mock Time Slots
const TIME_SLOTS = [
  "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "19:00", "20:00"
];

export default function ConsultantDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const consultant = MOCK_CONSULTANTS[id as string] || MOCK_CONSULTANTS["1"]; // Fallback

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Auto-scroll to booking if ?book=true is present
  useEffect(() => {
    if (searchParams.get("book") === "true") {
      const bookingSection = document.getElementById("booking-section");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  const handleBooking = () => {
    if (!date || !selectedTime) {
      toast.error("날짜와 시간을 선택해주세요.");
      return;
    }
    
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      toast.success("예약이 확정되었습니다!");
      // Logic to redirect to confirmation or payment would go here
      // router.push("/consulting/confirmation?id=..."); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 mt-20 max-w-6xl">
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로 돌아가기
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Consultant Info */}
            <div className="lg:col-span-2 space-y-8">
                {/* Profile Header */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-8">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-slate-50 dark:border-slate-700 shadow-md">
                        <Image
                            src={consultant.image}
                            alt={consultant.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{consultant.name} {consultant.role}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-current" /> {consultant.rating} ({consultant.reviews} 후기)</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">{consultant.isOnlineAvailable ? <Monitor className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />} {consultant.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                             {consultant.specialties?.map((s: string) => (
                                <Badge key={s} variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                    {s}
                                </Badge>
                             ))}
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                            {consultant.description}
                        </p>
                    </div>
                </div>

                {/* Details: Career & Education */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" /> 주요 경력 및 학력
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Career</h3>
                            <ul className="space-y-2">
                                {consultant.careers?.map((c: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Education</h3>
                             <ul className="space-y-2">
                                {consultant.education?.map((e: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                        {e}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Booking Widget */}
            <div className="lg:col-span-1">
                <div id="booking-section" className="sticky top-24 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-primary/10">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" /> 상담 예약하기
                    </h2>

                    {/* Date Picker */}
                    <div className="border rounded-xl p-4 mb-6 bg-slate-50 dark:bg-slate-900/50 flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border-0"
                            disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                            locale={ko}
                        />
                    </div>

                    {/* Time Slots */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                            {date ? format(date, "MM월 dd일 (E)", { locale: ko }) : "날짜를 선택하세요"} 가능 시간
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map((time) => (
                                <button
                                    key={time}
                                    disabled={!date}
                                    onClick={() => setSelectedTime(time)}
                                    className={cn(
                                        "py-2 px-1 rounded-lg text-sm font-medium transition-all border",
                                        selectedTime === time
                                            ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/20"
                                            : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-primary hover:text-primary",
                                        !date && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Summary & Action */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-muted-foreground">상담 비용 (50분)</span>
                            <span className="text-lg font-bold">100,000원</span>
                        </div>
                        <Button 
                            className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20" 
                            disabled={!date || !selectedTime || isBooking}
                            onClick={handleBooking}
                        >
                            {isBooking ? "예약 처리중..." : "예약 확정하기"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-3">
                            예약 확정 후 24시간 이내 취소 시 100% 환불
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
