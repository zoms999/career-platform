import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { AiChatWidget } from "@/components/ai/AiChatWidget";

// Pretendard font for Korean support
const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "한국진로적성센터 - 통합 플랫폼",
  description: "진로 적성 검사 및 분석 서비스를 제공하는 한국진로적성센터 통합 플랫폼",
  keywords: ["진로", "적성검사", "진로상담", "진로교육"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <AiChatWidget />
      </body>
    </html>
  );
}
