"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, Star, Truck, ShieldCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";

// Mock Data (duplicated for simplicity in this demo phase)
const MOCK_PRODUCTS: any = {
  "1": {
    id: "1",
    title: "1:1 진로 컨설팅 (1시간)",
    category: "컨설팅",
    price: 99000,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    description: "전문 컨설턴트와 함께하는 심층 진로 상담 세션입니다. 당신의 강점을 발견하고 나아갈 방향을 명확히 설정해보세요.",
    time: "60분",
    target: "전연령",
    rating: 4.8,
    reviews: 124,
  },
  "2": {
    id: "2",
    title: "OCTO 성향 검사 심화 리포트",
    category: "검사",
    price: 15000,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    description: "단순한 유형 분석을 넘어, 당신의 잠재력과 직무 적합성을 다각도로 분석한 프리미엄 리포트입니다.",
    time: "즉시 발급",
    target: "고등학생 이상",
    rating: 4.9,
    reviews: 850,
  },
  // Fallback for other IDs
  "default": {
    id: "0",
    title: "샘플 상품 페이지",
    category: "기타",
    price: 50000,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop",
    description: "이 상품은 예시 데이터입니다.",
    time: "기간 무제한",
    target: "전체",
    rating: 0,
    reviews: 0,
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = MOCK_PRODUCTS[id] || MOCK_PRODUCTS["default"];

  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    // Add multiple times based on quantity - simplistic approach or update store to accept qty
    // For now, simpler: loop or just rely on user clicking multiple times? 
    // Better: Update store to accept quantity in addItem, but interface says Omit quantity.
    // Let's just Loop for now or better, update the store later. 
    // Wait, the store logic `existingItem` adds +1. I should probably loop `quantity` times or update store.
    // Let's simplistic loop for this demo or update store.
    // Actually, let's update store to accept quantity is better, but I can't edit store easily now without context switch.
    // I will loop.
    for(let i=1; i<quantity; i++) {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
        });
    }
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 dark:border-slate-800">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Thumbnails placeholder */}
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square rounded-xl bg-slate-50 border border-slate-100 dark:border-slate-800" />
                    ))}
                </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-primary bg-primary/10 hover:bg-primary/20">{product.category}</Badge>
                    <div className="flex items-center text-amber-500 text-sm font-medium">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        {product.rating} ({product.reviews} 리뷰)
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{product.title}</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                    {product.description}
                </p>

                <div className="space-y-4 mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                        <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> 소요 시간</span>
                        <span className="font-medium">{product.time}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                        <span className="text-slate-500 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 이용 대상</span>
                        <span className="font-medium">{product.target}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 flex items-center justify-center text-lg hover:bg-slate-50 dark:hover:bg-slate-800 rounded-l-xl transition-colors"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center text-lg hover:bg-slate-50 dark:hover:bg-slate-800 rounded-r-xl transition-colors"
                            >
                                +
                            </button>
                         </div>
                         <div className="text-3xl font-bold">{(product.price * quantity).toLocaleString()}원</div>
                    </div>

                    <div className="grid grid-cols-[1fr_auto] gap-3">
                        <Button 
                            size="lg" 
                            className={cn("h-14 text-lg rounded-xl font-bold transition-all", isAdded ? "bg-green-600 hover:bg-green-700 text-white" : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900")}
                            onClick={handleAddToCart}
                            disabled={isAdded}
                        >
                            {isAdded ? "장바구니에 담겼습니다!" : "장바구니 담기"}
                        </Button>
                        <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl">
                            <Heart className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="detail" className="w-full">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-slate-200 dark:border-slate-800 mb-8">
                <TabsTrigger value="detail" className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base">상세정보</TabsTrigger>
                <TabsTrigger value="reviews" className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base">후기 ({product.reviews})</TabsTrigger>
                <TabsTrigger value="qna" className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base">문의</TabsTrigger>
            </TabsList>
            <TabsContent value="detail" className="min-h-[400px]">
                <div className="prose max-w-none dark:prose-invert">
                    <h3>상품 상세 정보</h3>
                    <p>이곳에 상품 상세 설명이 들어갑니다. (HTML 에디터 내용)</p>
                    <ul>
                        <li>특징 1: 전문성 있는 커리큘럼</li>
                        <li>특징 2: 1:1 맞춤형 피드백</li>
                        <li>특징 3: 실무 중심의 과제 수행</li>
                    </ul>
                </div>
            </TabsContent>
            <TabsContent value="reviews">
                <div className="text-center py-10 text-muted-foreground">후기가 준비 중입니다.</div>
            </TabsContent>
        </Tabs>

      </main>

      <Footer />
    </div>
  );
}
