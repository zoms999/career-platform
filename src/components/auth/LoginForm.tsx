"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { SocialLoginButtons } from "./SocialLoginButtons";

interface LoginFormProps {
  onSubmit?: (data: LoginInput) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log("Login data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Social Login Area */}
      <div className="space-y-6">
        <SocialLoginButtons />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground/60 font-medium tracking-wider">
              Or Login with Email
            </span>
          </div>
        </div>
      </div>

      {/* Email Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6 flex-1 flex flex-col">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground/80 pl-1">이메일</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="hello@example.com"
                        className="h-14 rounded-xl px-4 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all text-base"
                        {...field}
                        disabled={isLoading}
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                    </div>
                  </FormControl>
                  <FormMessage className="pl-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground/80 pl-1">비밀번호</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요"
                        className="h-14 rounded-xl px-4 bg-muted/30 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all text-base pr-12"
                        {...field}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-4 hover:text-foreground text-muted-foreground/50 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="pl-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="w-5 h-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-muted-foreground cursor-pointer select-none">
                    자동 로그인
                  </FormLabel>
                </FormItem>
              )}
            />

            <Link
              href="/find-account"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              비밀번호 찾기
            </Link>
          </div>

          <div className="pt-4 mt-auto">
             <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.01] active:scale-[0.99]" 
                disabled={isLoading}
             >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  "로그인"
                )}
            </Button>
            
            <p className="text-center mt-6 text-sm text-muted-foreground">
              아직 계정이 없으신가요?{" "}
              <Link href="/signup/individual" className="text-primary font-bold hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
