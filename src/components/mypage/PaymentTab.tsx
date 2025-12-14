"use client";

import { ShoppingBag, CreditCard, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const MOCK_ORDERS = [
  {
    id: "ord_12345",
    date: "2025.12.10",
    items: ["진로적성검사 (개인용)", "진로 가이드북"],
    total: 85000,
    status: "Delivered",
  },
  {
    id: "ord_12344",
    date: "2025.11.28",
    items: ["1:1 심층 상담 1회권"],
    total: 150000,
    status: "Completed",
  }
];

export function PaymentTab() {
  return (
    <div className="space-y-8">
         <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> 최근 주문 내역
            </h3>
            <div className="grid gap-4">
                {MOCK_ORDERS.map(o => (
                    <Card key={o.id} className="shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                                 <span className="text-sm font-medium text-muted-foreground">{o.date} <span className="mx-2 text-slate-300">|</span> 주문번호 {o.id}</span>
                                 <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300">{o.status === "Delivered" ? "배송완료" : "구매확정"}</Badge>
                            </div>
                            <CardTitle className="text-base mt-1 line-clamp-1">{o.items.join(", ")}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3 pt-0">
                             <div className="text-right font-bold text-lg">
                                {o.total.toLocaleString()}원
                             </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-end gap-2 border-t p-4 mt-2 bg-slate-50/50">
                            <Button variant="outline" size="sm">
                                <CreditCard className="w-3.5 h-3.5 mr-2" /> 영수증 조회
                            </Button>
                            <Button variant="outline" size="sm">상세보기</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
         </section>
    </div>
  );
}
