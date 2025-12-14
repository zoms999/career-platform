import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* CTA Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
           {/* Overlay for darkening */}
           <div className="absolute inset-0 bg-black/60" />
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mb-20" />

           <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
               지금 바로 당신의 적성을 찾아보세요
             </h2>
             <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
               50만 명 이상의 데이터가 입증하는 한국진로적성센터의 검사로
               가장 나다운 진로를 발견할 수 있습니다.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button size="lg" variant="secondary" className="h-14 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
                 <Link href="/test">
                    무료 검사 체험하기
                 </Link>
               </Button>
               <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg font-semibold border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                 <Link href="/signup/organization">
                    기업/단체 문의하기 <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
               </Button>
             </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
