"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface SignupCompleteProps {
  email: string;
}

export function SignupComplete({ email }: SignupCompleteProps) {
  return (
    <div className="flex flex-col items-center text-center h-full py-10">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2 mb-8"
      >
        <h3 className="text-3xl font-bold tracking-tight text-foreground">회원가입 완료!</h3>
        <p className="text-muted-foreground text-lg">
          환영합니다! 가입이 완료되었습니다.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm bg-muted/30 p-6 rounded-2xl mb-auto border border-muted-foreground/10"
      >
         <p className="text-sm text-muted-foreground mb-1">가입 이메일</p>
         <p className="font-semibold text-lg text-foreground">{email}</p>
         <div className="h-px bg-muted-foreground/10 my-4" />
         <p className="text-xs text-muted-foreground leading-relaxed">
            인증 메일이 발송되었습니다. 메일함 확인 후 인증을 진행해주세요.
         </p>
      </motion.div>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.6 }}
         className="w-full space-y-3 mt-8"
      >
        <Button asChild className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
          <Link href="/login">로그인하러 가기</Link>
        </Button>
        <Button asChild variant="ghost" className="w-full h-14 rounded-2xl text-base font-medium text-muted-foreground hover:bg-muted/50">
          <Link href="/">홈으로 이동</Link>
        </Button>
      </motion.div>
    </div>
  );
}
