"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check, Upload, FileText, X, AlertCircle } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { organizationSignupSchema } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

// Partial schema for organization info
const orgInfoSchema = organizationSignupSchema.pick({
  organizationName: true,
  organizationType: true,
  businessNumber: true,
  // documents: true, // Handle separately usually for file input in react-hook-form
}).extend({
   // Add documents manually basically
   // documents: z.any().refine((files) => files?.length > 0, "증빙서류를 업로드해주세요"),
});
// Actually let's use the schema properly, but might need to cast input
// For simplicity in this demo, I'll skip rigorous zod file validation in the form hook and handle manually or use a trick.
// Let's stick to the schema but we might need to use `setValue` manually.

type OrgInfoInput = z.infer<typeof orgInfoSchema> & { documents?: File[] };

interface OrganizationInfoFormProps {
  onNext: (data: any) => void;
  defaultValues?: any;
}

export function OrganizationInfoForm({
  onNext,
  defaultValues,
}: OrganizationInfoFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<OrgInfoInput>({
    resolver: zodResolver(orgInfoSchema),
    defaultValues: defaultValues || {
      organizationName: "",
      organizationType: "",
      businessNumber: "",
    },
  });

  const handleVerifyBusiness = async () => {
    const bizNum = form.getValues("businessNumber");
    if (!bizNum || bizNum.length < 10) return;

    setIsVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsVerified(true);
    setIsVerifying(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: OrgInfoInput) => {
    if (files.length === 0) {
      form.setError("root", { message: "증빙서류를 최소 1개 이상 업로드해주세요" });
      return;
    }
    onNext({ ...data, documents: files });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-4">
        
        {/* Organization Name */}
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-foreground/80 pl-1">기관명</FormLabel>
              <FormControl>
                <Input placeholder="(주)한국진로적성센터" className="h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base" {...field} />
              </FormControl>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />

        {/* Organization Type */}
        <FormField
          control={form.control}
          name="organizationType"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-foreground/80 pl-1">기관 유형</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-13 rounded-xl bg-muted/30 border-muted-foreground/20 text-base text-muted-foreground">
                    <SelectValue placeholder="선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="corporation">법인 기업</SelectItem>
                  <SelectItem value="private">개인 사업자</SelectItem>
                  <SelectItem value="school">학교/교육기관</SelectItem>
                  <SelectItem value="public">공공기관</SelectItem>
                  <SelectItem value="nonprofit">비영리단체</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />

        {/* Business Number */}
        <FormField
          control={form.control}
          name="businessNumber"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-foreground/80 pl-1">사업자 등록번호</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <div className="relative flex-1">
                    <Input
                      placeholder="000-00-00000"
                      className={cn(
                        "h-13 rounded-xl border-muted-foreground/20 text-base transition-colors",
                        isVerified ? "bg-green-50 border-green-200 text-green-800" : "bg-muted/30"
                      )}
                      {...field}
                      onChange={(e) => {
                        // Auto format logic could go here
                        let val = e.target.value.replace(/[^0-9]/g, "");
                        if (val.length > 3 && val.length <= 5) {
                            val = `${val.slice(0,3)}-${val.slice(3)}`;
                        } else if (val.length > 5) {
                            val = `${val.slice(0,3)}-${val.slice(3,5)}-${val.slice(5, 10)}`;
                        }
                        field.onChange(val);
                        setIsVerified(false);
                      }}
                      maxLength={12}
                    />
                    {isVerified && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                           <Check className="w-5 h-5 text-green-600" />
                        </div>
                    )}
                  </div>
                </FormControl>
                <Button
                  type="button"
                  variant={isVerified ? "outline" : "secondary"}
                  className={cn("h-13 px-4 rounded-xl", isVerified && "text-green-600 border-green-200 bg-green-50")}
                  onClick={handleVerifyBusiness}
                  disabled={isVerifying || !field.value || field.value.length < 10 || isVerified}
                >
                  {isVerifying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isVerified ? (
                    "인증완료"
                  ) : (
                    "실명인증"
                  )}
                </Button>
              </div>
              <FormDescription className="pl-1 text-xs">
                * 국세청에 등록된 사업자 정보와 일치해야 합니다.
              </FormDescription>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />

        {/* File Upload */}
        <div className="space-y-3 pt-2">
            <FormLabel className="text-foreground/80 pl-1 flex justify-between items-center">
               증빙서류 첨부 <span className="text-xs font-normal text-muted-foreground">사업자등록증, 고유번호증 등</span>
            </FormLabel>
            
            <div className="grid grid-cols-1 gap-2">
                {files.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-background border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            onClick={() => removeFile(idx)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>

            <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-xl bg-muted/10 hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group">
                <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf" 
                    multiple 
                />
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-foreground">클릭하여 파일 업로드</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF (최대 10MB)</p>
                </div>
            </label>
             {form.formState.errors.root && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-red-500 pl-1">
                    <AlertCircle className="w-4 h-4" />
                    {form.formState.errors.root.message}
                </p>
            )}
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
             가입 신청하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
