"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { Trash2, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  // Hydration fix for zustand persist
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">장바구니</h1>

        {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4 items-center">
                            <div className="relative w-24 h-24 shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-muted-foreground mb-1">{item.category}</div>
                                <h3 className="text-base font-semibold truncate mb-1">{item.title}</h3>
                                <div className="text-lg font-bold">{item.price.toLocaleString()}원</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg h-9">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-l-lg"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-r-lg"
                                    >
                                        +
                                    </button>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    
                    <Button variant="outline" className="w-full text-muted-foreground" onClick={clearCart}>
                        장바구니 비우기
                    </Button>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">주문 내역</h2>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>상품 금액</span>
                                <span>{totalPrice().toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>할인</span>
                                <span>0원</span>
                            </div>
                            <div className="border-t border-slate-100 dark:border-slate-700 my-4 pt-4 flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white">
                                <span>결제 예정 금액</span>
                                <span className="text-primary">{totalPrice().toLocaleString()}원</span>
                            </div>
                        </div>

                        <Button className="w-full h-14 text-lg rounded-xl font-bold shadow-lg shadow-primary/20" size="lg" asChild>
                            <Link href="/shop/checkout">
                                <CreditCard className="w-5 h-5 mr-2" />
                                결제하기
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 border-dashed">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-slate-400" />
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-2">장바구니가 비어있습니다</h2>
                <p className="text-muted-foreground mb-8">원하는 상품을 찾아보세요!</p>
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/shop">
                        상품 보러가기 <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
