"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IdentityVerification } from "@/components/auth/IdentityVerification";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, Mail, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Password Reset Schema
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export default function FindAccountPage() {
  const [activeTab, setActiveTab] = useState("find-id");
  const [resetStep, setResetStep] = useState<"verify" | "reset" | "complete">("verify");
  
  // Find ID State
  const [foundId, setFoundId] = useState<string | null>(null);

  // Password Reset Form
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleIdVerification = (data: any) => {
    // Mock ID finding logic
    setTimeout(() => {
        setFoundId("humanx***@gmail.com"); // Mock result
    }, 1000);
  };

  const handlePasswordVerification = (data: any) => {
    // Mock user identification logic
    setTimeout(() => {
        setResetStep("reset");
    }, 1000);
  };

  const handlePasswordReset = async (data: ResetPasswordInput) => {
    // Mock password reset API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResetStep("complete");
  };

  return (
    <AuthLayout
      title="계정 찾기"
      description="아이디를 잊으셨거나 비밀번호를 재설정하시겠습니까?"
      showBackButton
    >
    <AuthLayout
      title="계정 찾기"
      description="아이디를 잊으셨거나 비밀번호를 재설정하시겠습니까?"
      showBackButton
    >
      <div className="w-full">
        <div className="grid w-full grid-cols-2 mb-8 h-12 rounded-xl bg-muted/50 p-1">
          <button
            onClick={() => setActiveTab("find-id")}
            className={`rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "find-id"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            아이디 찾기
          </button>
          <button
            onClick={() => setActiveTab("reset-pw")}
            className={`rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "reset-pw"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            비밀번호 찾기
          </button>
        </div>

        <div className="min-h-[300px]">
          {/* Find ID Tab */}
          {activeTab === "find-id" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {!foundId ? (
                <div className="space-y-6">
                    <div className="bg-blue-50/50 p-4 rounded-xl text-sm text-blue-700 leading-relaxed border border-blue-100">
                        <p className="flex gap-2">
                           <User className="w-5 h-5 shrink-0" />
                           가입 시 등록한 휴대폰 번호로 본인인증을 진행하시면 아이디(이메일)를 확인하실 수 있습니다.
                        </p>
                    </div>
                    <IdentityVerification 
                        onVerified={handleIdVerification} 
                        className="w-full h-14 text-lg bg-white hover:bg-slate-50 border-2 border-primary/20 hover:border-primary text-primary"
                    />
                </div>
              ) : (
                <div className="text-center space-y-8 py-4 animate-in zoom-in-50">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <div>
                        <p className="text-muted-foreground mb-2">회원님의 아이디는 아래와 같습니다.</p>
                        <h3 className="text-2xl font-bold text-foreground">{foundId}</h3>
                    </div>
                    <Button asChild className="w-full h-14 rounded-2xl text-lg mt-4">
                        <Link href="/login">구한 아이디로 로그인</Link>
                    </Button>
                </div>
              )}
            </div>
          )}

          {/* Reset Password Tab */}
          {activeTab === "reset-pw" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               {resetStep === "verify" && (
                    <div className="space-y-6">
                        <div className="bg-orange-50/50 p-4 rounded-xl text-sm text-orange-700 leading-relaxed border border-orange-100">
                            <p className="flex gap-2">
                            <Lock className="w-5 h-5 shrink-0" />
                             가입 시 등록한 정보를 통해 본인인증을 완료하시면 비밀번호를 재설정하실 수 있습니다.
                            </p>
                        </div>
                        <IdentityVerification 
                            onVerified={handlePasswordVerification} 
                            className="w-full h-14 text-lg bg-white hover:bg-slate-50 border-2 border-orange-500/20 hover:border-orange-500 text-orange-600"
                        />
                    </div>
               )}

               {resetStep === "reset" && (
                   <Form {...form}>
                     <form onSubmit={form.handleSubmit(handlePasswordReset)} className="space-y-5 animate-in slide-in-from-right-4">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold">새 비밀번호 설정</h3>
                            <p className="text-sm text-muted-foreground">새로운 비밀번호를 입력해주세요.</p>
                        </div>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>새 비밀번호</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="8자 이상, 영문/숫자/특수문자" className="h-13 rounded-xl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>새 비밀번호 확인</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="비밀번호 재입력" className="h-13 rounded-xl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full h-14 rounded-2xl text-lg mt-4">
                            비밀번호 변경하기
                        </Button>
                     </form>
                   </Form>
               )}

               {resetStep === "complete" && (
                   <div className="text-center space-y-8 py-4 animate-in zoom-in-50">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">비밀번호 변경 완료</h3>
                            <p className="text-muted-foreground mt-2">새로운 비밀번호로 로그인해주세요.</p>
                        </div>
                        <Button asChild className="w-full h-14 rounded-2xl text-lg mt-4">
                            <Link href="/login">로그인 하러 가기</Link>
                        </Button>
                    </div>
               )}
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
    </AuthLayout>
  );
}
