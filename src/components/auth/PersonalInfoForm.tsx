"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Check, X, ShieldCheck } from "lucide-react";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { individualSignupSchema } from "@/lib/validations/auth";
import { IdentityVerification } from "@/components/auth/IdentityVerification";
import { cn } from "@/lib/utils";

// Partial schema for step 2
const personalInfoSchema = individualSignupSchema.omit({
  agreeToTerms: true,
  agreeToPrivacy: true,
  agreeToMarketing: true,
});

type PersonalInfoInput = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onNext: (data: PersonalInfoInput) => void;
  defaultValues?: Partial<PersonalInfoInput>;
}

export function PersonalInfoForm({
  onNext,
  defaultValues,
}: PersonalInfoFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      gender: undefined,
    },
  });

  const checkEmailDuplicate = async (email: string) => {
    if (!email || !email.includes("@")) return;

    setIsCheckingEmail(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const isTaken = email.endsWith("@test.com");
    setEmailAvailable(!isTaken);
    setIsCheckingEmail(false);
  };

  const handleVerificationSuccess = (data: { name: string; phone: string; birthDate: string; gender: "male" | "female" | "other" }) => {
      form.setValue("name", data.name);
      form.setValue("phone", data.phone);
      form.setValue("birthDate", data.birthDate);
      form.setValue("gender", data.gender);
      setIsVerified(true);
  };

  const password = form.watch("password");
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;

    const labels = ["", "약함", "보통", "안전", "완벽"];
    const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
    return { strength, label: labels[strength], color: colors[strength] };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = (data: PersonalInfoInput) => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      {!isVerified && (
         <div className="animate-in fade-in slide-in-from-top-4">
            <IdentityVerification onVerified={handleVerificationSuccess} />
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted-foreground/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">또는 직접 입력</span>
                </div>
            </div>
         </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 pb-4">
          
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-foreground/80 pl-1">이름</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="홍길동" 
                      className={cn("h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base", isVerified && "bg-blue-50/50 border-blue-200 text-blue-900")} 
                      readOnly={isVerified}
                      {...field} 
                    />
                    {isVerified && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />}
                  </div>
                </FormControl>
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-foreground/80 pl-1">이메일</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <div className="relative flex-1">
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        className="h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setEmailAvailable(null);
                        }}
                      />
                      {emailAvailable !== null && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {emailAvailable ? (
                            <div className="bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                          ) : (
                            <div className="bg-red-100 p-1 rounded-full"><X className="w-3 h-3 text-red-600" /></div>
                          )}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-13 px-4 rounded-xl border-muted-foreground/20"
                    onClick={() => checkEmailDuplicate(field.value)}
                    disabled={isCheckingEmail || !field.value}
                  >
                    {isCheckingEmail ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "중복확인"
                    )}
                  </Button>
                </div>
                {emailAvailable === false && (
                  <p className="text-xs text-red-500 pl-1 font-medium">이미 사용 중인 이메일입니다</p>
                )}
                {emailAvailable === true && (
                  <p className="text-xs text-green-600 pl-1 font-medium">사용 가능한 이메일입니다</p>
                )}
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                 <FormLabel className="text-foreground/80 pl-1">휴대폰 번호</FormLabel>
                <FormControl>
                  <div className="relative">
                     <Input 
                        placeholder="010-1234-5678" 
                        className={cn("h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base", isVerified && "bg-blue-50/50 border-blue-200 text-blue-900")}
                        readOnly={isVerified}
                        {...field} 
                     />
                     {isVerified && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />}
                  </div>
                </FormControl>
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                 <FormLabel className="text-foreground/80 pl-1">비밀번호</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="8자 이상, 대소문자/숫자/특수문자"
                      className="h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-4 text-muted-foreground/50"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </FormControl>
                {password && (
                  <div className="flex gap-1.5 pt-1 px-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= passwordStrength.strength
                            ? passwordStrength.color
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                )}
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
               <FormItem className="space-y-1.5">
                 <FormLabel className="text-foreground/80 pl-1">비밀번호 확인</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="비밀번호 다시 입력"
                      className="h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base pr-12"
                      {...field}
                    />
                     <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-4 text-muted-foreground/50"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="pl-1" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
               {/* Birth Date */}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                     <FormLabel className="text-foreground/80 pl-1">생년월일 (선택)</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className={cn("h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base", isVerified && "bg-blue-50/50 border-blue-200 text-blue-900")}
                        readOnly={isVerified}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="pl-1" />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                     <FormLabel className="text-foreground/80 pl-1">성별 (선택)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isVerified}>
                      <FormControl>
                        <SelectTrigger className={cn("h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base text-muted-foreground", isVerified && "bg-blue-50/50 border-blue-200 text-blue-900 opacity-100")}>
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="pl-1" />
                  </FormItem>
                )}
              />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
              가입하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}

