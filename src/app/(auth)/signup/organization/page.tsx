"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { StepIndicator } from "@/components/auth/StepIndicator";
import { TermsAgreement } from "@/components/auth/TermsAgreement";
import { ManagerInfoForm } from "@/components/auth/ManagerInfoForm";
import { OrganizationInfoForm } from "@/components/auth/OrganizationInfoForm";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Clock } from "lucide-react";
import Link from "next/link";

export default function OrganizationSignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<any>({});

  const steps = ["약관 동의", "담당자 정보", "기관 구비 서류", "신청 완료"];
  const titles = ["약관 동의", "담당자 정보 확인", "기관 정보 제출", "신청 완료"];

  const handleTermsNext = (data: any) => {
    setSignupData((prev: any) => ({ ...prev, ...data }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleManagerNext = (data: any) => {
    setSignupData((prev: any) => ({ ...prev, ...data }));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrgNext = async (data: any) => {
    setSignupData((prev: any) => ({ ...prev, ...data }));
    
    // Simulate API submission
    console.log("Org Signup Data:", { ...signupData, ...data });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 4) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <AuthLayout
      title={currentStep === 4 ? "" : titles[currentStep - 1]}
      description={
        currentStep === 1
          ? "기관/기업 서비스 이용을 위해 약관에 동의해주세요."
          : currentStep === 2
          ? "계정 관리를 위한 담당자 정보를 입력해주세요."
          : currentStep === 3
          ? "사업자 정보와 증빙 서류를 제출해주세요."
          : ""
      }
      showBackButton={currentStep < 4}
      onBack={handleBack}
    >
      {currentStep < 4 && (
        <div className="mb-8">
           <StepIndicator currentStep={currentStep} steps={steps} />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
           key={currentStep}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.3 }}
        >
           {currentStep === 1 && <TermsAgreement onNext={handleTermsNext} />}
           {currentStep === 2 && <ManagerInfoForm onNext={handleManagerNext} />}
           {currentStep === 3 && <OrganizationInfoForm onNext={handleOrgNext} />}
           
           {currentStep === 4 && (
              <div className="flex flex-col items-center text-center h-full py-10">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-12 h-12 text-blue-600" />
                    </div>
                </motion.div>

                <h3 className="text-3xl font-bold tracking-tight text-foreground mb-3">가입 신청 완료</h3>
                <p className="text-muted-foreground text-lg mb-8">
                    관리자 승인 후 서비스 이용이 가능합니다.<br/>
                    <span className="text-sm opacity-80">(평일 기준 1~2일 소요)</span>
                </p>

                <div className="w-full max-w-sm bg-muted/30 p-6 rounded-2xl mb-auto border border-muted-foreground/10 text-left">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">담당자 이메일</span>
                        <span className="font-medium">{signupData.managerEmail}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">신청 기관명</span>
                        <span className="font-medium">{signupData.organizationName}</span>
                    </div>
                     <div className="h-px bg-muted-foreground/10 my-4" />
                    <p className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                        <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                        제출하신 서류 검토가 완료되면 이메일과 문자로 승인 결과를 알려드립니다.
                    </p>
                </div>

                <div className="w-full space-y-3 mt-8">
                    <Button asChild className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                     <Link href="/">홈으로 이동</Link>
                    </Button>
                </div>
              </div>
           )}
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  );
}
