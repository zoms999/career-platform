"use client";

import { useEffect, useState } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { useCartStore } from "@/lib/store/cart-store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Toss Payments Client Key (Test Key)
const clientKey = "test_ck_D5GePWuy5jkPE0pz2vnL3gqHrVyn"; // Public Test Key

export default function CheckoutPage() {
  const { totalPrice, items, clearCart } = useCartStore();
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const [isPaymentWidgetLoaded, setIsPaymentWidgetLoaded] = useState(false);
  
  // Use a mock customer key for non-logged in users or generate one
  const customerKey = "mock_customer_key_" + Math.random().toString(36).substring(7);

  useEffect(() => {
    (async () => {
      try {
        const loadedWidget = await loadPaymentWidget(clientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Failed to load payment widget:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (paymentWidget) {
        const price = totalPrice();
        if(price > 0) {
            paymentWidget.renderPaymentMethods(
                "#payment-widget",
                { value: price },
                { variantKey: "DEFAULT" } // Use default variant
            );
            paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
            setIsPaymentWidgetLoaded(true);
        }
    }
  }, [paymentWidget, totalPrice]);

  const handlePayment = async () => {
    if (!paymentWidget) return;
    
    try {
      await paymentWidget.requestPayment({
        orderId: "ORDER_" + new Date().getTime(),
        orderName: items.length > 1 ? `${items[0].title} 외 ${items.length - 1}건` : items[0].title,
        customerName: "김토스", // Mock user name
        customerEmail: "customer@example.com",
        customerMobilePhone: "01012345678",
        successUrl: `${window.location.origin}/shop/success`,
        failUrl: `${window.location.origin}/shop/fail`,
      });
      clearCart(); // Ideally clear after success, but for simple client flow this might clear early if redirect happens fast
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if(items.length === 0) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              장바구니가 비어있습니다.
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">주문/결제</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-lg font-bold mb-4">주문 상품</h2>
                     <ul className="space-y-2">
                        {items.map(item => (
                            <li key={item.id} className="flex justify-between text-sm">
                                <span>{item.title} x {item.quantity}</span>
                                <span className="font-bold">{(item.price * item.quantity).toLocaleString()}원</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                        <span>총 결제금액</span>
                        <span className="text-primary">{totalPrice().toLocaleString()}원</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                     <h2 className="text-lg font-bold mb-4">주문자 정보 (Mock)</h2>
                     <p>이름: 김토스</p>
                     <p>연락처: 010-1234-5678</p>
                     <p>이메일: customer@example.com</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-bold mb-4">결제 수단</h2>
                <div id="payment-widget" className="w-full" />
                <div id="agreement" className="w-full" />
                
                <Button 
                    className="w-full h-14 text-lg rounded-xl font-bold mt-6" 
                    onClick={handlePayment}
                    disabled={!isPaymentWidgetLoaded}
                >
                    {isPaymentWidgetLoaded ? "결제하기" : <><Loader2 className="w-4 h-4 animate-spin mr-2"/> 로딩중...</>}
                </Button>
            </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
