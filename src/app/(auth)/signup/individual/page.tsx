"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { StepIndicator } from "@/components/auth/StepIndicator";
import { TermsAgreement } from "@/components/auth/TermsAgreement";
import { PersonalInfoForm } from "@/components/auth/PersonalInfoForm";
import { SignupComplete } from "@/components/auth/SignupComplete";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { AnimatePresence, motion } from "framer-motion";

type SignupData = {
  agreements?: {
    agreeToTerms: boolean;
    agreeToPrivacy: boolean;
    agreeToMarketing: boolean;
  };
  personalInfo?: any;
};

export default function IndividualSignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({});

  const steps = ["약관 동의", "정보 입력", "가입 완료"];

  const handleTermsNext = (agreements: SignupData["agreements"]) => {
    setSignupData((prev) => ({ ...prev, agreements }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePersonalInfoNext = async (personalInfo: any) => {
    setSignupData((prev) => ({ ...prev, personalInfo }));
    
    // Simulate API call
    console.log("Signup data:", { ...signupData, personalInfo });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 3) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const titles = ["약관 동의", "회원 정보 입력", "가입 완료"];

  return (
    <AuthLayout
      title={currentStep === 3 ? "" : titles[currentStep - 1]}
      description={
        currentStep === 1
          ? "서비스 이용을 위한 약관에 동의해주세요."
          : currentStep === 2 
            ? "본인 확인을 위한 정보를 입력해주세요."
            : ""
      }
      showBackButton={currentStep < 3}
      onBack={handleBack}
    >
      {/* SNS Signup (only on step 1) */}
      {currentStep === 1 && (
         <div className="mb-8">
            <SocialLoginButtons className="mb-6" />
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground/60 font-medium tracking-wider">
                  Or Sign up with Email
                </span>
              </div>
            </div>
         </div>
      )}

      {currentStep < 3 && (
        <div className="mb-6">
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
          
          {currentStep === 2 && (
            <PersonalInfoForm
              onNext={handlePersonalInfoNext}
              defaultValues={signupData.personalInfo}
            />
          )}
          
          {currentStep === 3 && (
            <SignupComplete email={signupData.personalInfo?.email || "test@email.com"} />
          )}
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  );
}
