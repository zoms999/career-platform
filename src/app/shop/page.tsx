"use client";

import { useState } from "react";
import { Product, ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Mock Data
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "1:1 진로 컨설팅 (1시간)",
    category: "컨설팅",
    price: 99000,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    isBest: true,
  },
  {
    id: "2",
    title: "OCTO 성향 검사 심화 리포트",
    category: "검사",
    price: 15000,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "3",
    title: "이직 성공패키지 (자소서 첨삭 + 면접 코칭)",
    category: "컨설팅",
    price: 350000,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "직무 부트캠프: 마케팅 실무",
    category: "강의",
    price: 120000,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "진로 다이어리 2024",
    category: "굿즈",
    price: 24000,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
   {
    id: "6",
    title: "청소년을 위한 꿈찾기 워크샵",
    category: "강의",
    price: 55000,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop",
  }
];

const CATEGORIES = ["전체", "검사", "컨설팅", "강의", "굿즈"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "전체" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">스토어</h1>
                <p className="text-muted-foreground">당신의 커리어를 위한 최고의 선택</p>
            </div>
            
            <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        placeholder="상품명 검색..." 
                        className="pl-9 bg-white dark:bg-slate-800"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* Filter button placeholder for future sorting features */}
                <Button variant="outline" size="icon" className="shrink-0 bg-white dark:bg-slate-800">
                    <SlidersHorizontal className="w-4 h-4" />
                </Button>
            </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        activeCategory === category
                            ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                            : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
                <Button 
                    variant="link" 
                    onClick={() => {setActiveCategory("전체"); setSearchQuery("");}}
                    className="mt-2"
                >
                    모두보기
                </Button>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
