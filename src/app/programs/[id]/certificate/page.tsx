"use client";

import { useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Share2, Home, Printer } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CertificatePage() {
    const params = useParams();
    const router = useRouter();
    const programId = Array.isArray(params.id) ? params.id[0] : params.id;
    const certificateRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center py-10 px-4 print:p-0 print:bg-white">
            {/* Header / Actions (Hidden in Print) */}
            <div className="max-w-4xl w-full flex justify-between items-center mb-8 print:hidden">
                <Button variant="outline" onClick={() => router.push(`/programs/${programId}/learn`)}>
                    <Home className="w-4 h-4 mr-2" /> 과정으로 돌아가기
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="w-4 h-4 mr-2" /> 인쇄 / PDF 저장
                    </Button>
                    <Button>
                        <Share2 className="w-4 h-4 mr-2" /> 공유하기
                    </Button>
                </div>
            </div>

            {/* Certificate Template */}
            <div className="max-w-4xl w-full aspect-[1.414/1] bg-white text-slate-900 shadow-2xl relative p-12 print:shadow-none print:w-[297mm] print:h-[210mm] print:absolute print:top-0 print:left-0">
                {/* Border Decoration */}
                <div className="absolute inset-4 border-[8px] border-double border-slate-200 pointer-events-none" />
                <div className="absolute inset-6 border border-slate-800 pointer-events-none" />

                <div className="h-full flex flex-col items-center justify-center text-center relative z-10 space-y-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">C</div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">Korea Career Aptitude Center</span>
                    </div>

                    <h1 className="text-5xl font-serif font-bold text-slate-900 tracking-wide pt-4">CERTIFICATE</h1>
                    <p className="text-xl text-slate-500 font-serif italic">OF COMPLETION</p>

                    <div className="space-y-2 pt-8">
                        <p className="text-slate-600">This is to certify that</p>
                        <p className="text-4xl font-bold text-blue-900 border-b-2 border-slate-300 pb-2 px-10 inline-block font-serif">
                            Kim Chul Soo
                        </p>
                    </div>

                    <div className="space-y-4 pt-4 max-w-2xl px-10">
                        <p className="text-lg leading-relaxed text-slate-700">
                            has successfully completed the
                            <strong className="block text-2xl py-2">Certified Career Counselor Level 2</strong>
                            course, satisfying all requirements and passing the final examination.
                        </p>
                    </div>

                    <div className="flex justify-between w-full max-w-3xl pt-16 px-10">
                        <div className="text-center">
                            <div className="w-48 border-b border-black mb-2"></div>
                            <p className="font-bold">2023. 12. 15</p>
                            <p className="text-sm text-slate-500">Date Issued</p>
                        </div>
                        <div className="text-center relative">
                            {/* Seal */}
                            <div className="absolute -top-12 -left-4 w-24 h-24 border-4 border-blue-900/30 rounded-full flex items-center justify-center rotate-12 opacity-50">
                                <span className="text-xs font-bold text-blue-900 uppercase">Official Seal</span>
                            </div>
                            <div className="w-48 border-b border-black mb-2 relative z-10">
                                <span className="font-script text-3xl">Director Lee</span>
                            </div>
                            <p className="font-bold">Lee Young Hee</p>
                            <p className="text-sm text-slate-500">Director of Education</p>
                        </div>
                    </div>
                </div>

                {/* ID and Verification */}
                <div className="absolute bottom-6 right-8 text-xs text-slate-400 text-right">
                    <p>Certificate ID: KCAC-2023-12-00591</p>
                    <p>Verify this certificate at: career-center.kr/verify/KCAC-2023-12-00591</p>
                </div>
            </div>
        </div>
    );
}
