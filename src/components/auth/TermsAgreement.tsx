"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TermsAgreementProps {
  onNext: (agreements: {
    agreeToTerms: boolean;
    agreeToPrivacy: boolean;
    agreeToMarketing: boolean;
  }) => void;
}

export function TermsAgreement({ onNext }: TermsAgreementProps) {
  const [agreeAll, setAgreeAll] = React.useState(false);
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = React.useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = React.useState(false);

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeToTerms(checked);
    setAgreeToPrivacy(checked);
    setAgreeToMarketing(checked);
  };

  React.useEffect(() => {
    if (agreeToTerms && agreeToPrivacy && agreeToMarketing) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [agreeToTerms, agreeToPrivacy, agreeToMarketing]);

  const handleNext = () => {
    if (agreeToTerms && agreeToPrivacy) {
      onNext({ agreeToTerms, agreeToPrivacy, agreeToMarketing });
    }
  };

  const canProceed = agreeToTerms && agreeToPrivacy;

  const TermItem = ({ 
    id, 
    checked, 
    onCheckedChange, 
    label, 
    required, 
    desc 
  }: { 
    id: string; 
    checked: boolean; 
    onCheckedChange: (c: boolean) => void; 
    label: string; 
    required?: boolean; 
    desc?: string 
  }) => (
    <div 
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl border border-transparent bg-muted/30 transition-all active:scale-[0.99]",
        checked ? "border-primary/20 bg-primary/5" : "hover:bg-muted/50"
      )}
      onClick={() => onCheckedChange(!checked)}
    >
       <div className={cn(
         "flex items-center justify-center w-6 h-6 rounded-full border transition-colors mt-0.5 shrink-0",
         checked ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-background"
       )}>
          {checked && <Check className="w-3.5 h-3.5" />}
       </div>
       <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
              <span className={cn("font-medium text-base", checked ? "text-primary" : "text-foreground")}>
                 {label} 
                 {required !== undefined && (
                   <span className={cn("ml-1.5 text-xs font-bold", required ? "text-primary" : "text-muted-foreground")}>
                      {required ? "(필수)" : "(선택)"}
                   </span>
                 )}
              </span>
              <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground/50 -mr-2" onClick={(e) => {
                 e.stopPropagation();
                 // Show modal or link
              }}>
                 <ChevronRight className="w-4 h-4" />
              </Button>
          </div>
          {desc && <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="space-y-4 flex-1">
        {/* All Agree Box */}
        <div 
          onClick={() => handleAgreeAll(!agreeAll)}
          className={cn(
            "flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer",
            agreeAll 
              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
              : "bg-muted/50 border-transparent hover:bg-muted"
          )}
        >
           <div className={cn(
             "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
              agreeAll ? "border-white bg-white/20" : "border-muted-foreground/30"
           )}>
             {agreeAll && <Check className="w-4 h-4 text-white" />}
           </div>
           <span className="font-bold text-lg">약관 전체 동의</span>
        </div>

        <div className="space-y-2.5">
          <TermItem 
            id="term-1" 
            checked={agreeToTerms} 
            onCheckedChange={setAgreeToTerms} 
            label="이용약관" 
            required
            desc="서비스 이용을 위한 필수 규칙입니다."
          />
          <TermItem 
            id="term-2" 
            checked={agreeToPrivacy} 
            onCheckedChange={setAgreeToPrivacy} 
            label="개인정보 처리방침" 
            required
             desc="개인정보 수집 및 이용에 대한 동의입니다."
          />
           <TermItem 
            id="term-3" 
            checked={agreeToMarketing} 
            onCheckedChange={setAgreeToMarketing} 
            label="마케팅 정보 수신" 
            required={false}
             desc="이벤트 및 혜택 정보를 받아보실 수 있습니다."
          />
        </div>
      </div>

      <Button
        onClick={handleNext}
        disabled={!canProceed}
        className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
      >
        다음
      </Button>
    </div>
  );
}
