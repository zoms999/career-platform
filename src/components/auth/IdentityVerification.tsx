"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, CheckCircle, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationResult {
  name: string;
  phone: string;
  birthDate: string;
  gender: "male" | "female";
}

interface IdentityVerificationProps {
  onVerified: (result: VerificationResult) => void;
  className?: string;
}

export function IdentityVerification({ onVerified, className }: IdentityVerificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"carrier" | "method" | "input" | "processing" | "success">("carrier");
  const [carrier, setCarrier] = useState("");
  const [method, setMethod] = useState<"pass" | "sms">("pass");
  
  // Mock Data Input
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  const handleVerify = async () => {
    setStep("processing");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep("success");
    
    // Auto-close after success and return data
    setTimeout(() => {
        setIsOpen(false);
        // Mock result based on input or default
        onVerified({
            name: name || "김진로",
            phone: phone || "010-1234-5678",
            birthDate: birth || "1995-05-15",
            gender: "female", // Mock
        });
        // Reset state for next time
        setTimeout(() => setStep("carrier"), 500);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("w-full h-14 rounded-xl border-dashed border-2 text-primary hover:bg-primary/5", className)}>
          <ShieldCheck className="w-5 h-5 mr-2" />
          휴대폰 본인인증으로 시작하기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>휴대폰 본인인증</DialogTitle>
          <DialogDescription>
            안전한 회원가입을 위해 본인인증을 진행해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
            {step === "carrier" && (
                <div className="grid grid-cols-2 gap-3">
                    {["SKT", "KT", "LG U+", "알뜰폰"].map((c) => (
                        <Button 
                            key={c} 
                            variant="outline" 
                            className="h-20 text-lg hover:border-primary hover:bg-primary/5"
                            onClick={() => { setCarrier(c); setStep("method"); }}
                        >
                            {c}
                        </Button>
                    ))}
                </div>
            )}

            {step === "method" && (
                <div className="space-y-4">
                    <Button 
                        variant="outline" 
                        className="w-full h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                        onClick={() => { setMethod("pass"); setStep("input"); }}
                    >
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        <span className="font-bold text-lg">PASS 앱으로 인증</span>
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                        onClick={() => { setMethod("sms"); setStep("input"); }}
                    >
                        <Smartphone className="w-8 h-8 text-primary" />
                        <span className="font-bold text-lg">문자(SMS)로 인증</span>
                    </Button>
                </div>
            )}

            {step === "input" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2">
                        <Label>이름</Label>
                        <Input placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                        <Label>생년월일 (6자리)</Label>
                        <Input placeholder="YYMMDD" value={birth} onChange={(e) => setBirth(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                        <Label>휴대폰 번호</Label>
                        <Input placeholder="숫자만 입력" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12" />
                    </div>
                    <Button className="w-full h-12 mt-4" onClick={handleVerify}>
                        인증요청
                    </Button>
                </div>
            )}

            {step === "processing" && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">
                        {method === "pass" ? "PASS 앱을 확인해주세요..." : "인증번호를 확인하고 있습니다..."}
                    </p>
                </div>
            )}

            {step === "success" && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center animate-in zoom-in-50">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-lg font-bold">본인인증 완료</p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
