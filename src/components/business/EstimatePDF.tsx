"use client";

import { forwardRef } from "react";

interface EstimateData {
    programTitle: string;
    basePrice: number;
    people: number;
    sessions: number;
    regionLabel: string;
    totalPrice: number;
    orgName: string;
    picName: string;
    date: string;
}

export const EstimatePDF = forwardRef<HTMLDivElement, { data: EstimateData | null }>(({ data }, ref) => {
    if (!data) return null;

    const today = new Date().toLocaleDateString("ko-KR");
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("ko-KR");

    return (
        <div className="hidden print:block print:w-full print:h-screen bg-white text-black p-12" ref={ref}>
            <div className="max-w-3xl mx-auto border border-gray-300 p-8">
                {/* Header */}
                <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">견 적 서 (ESTIMATE)</h1>
                    <p className="text-sm text-slate-500 mt-2">No. 2023-{Math.floor(Math.random() * 10000)}</p>
                </div>

                {/* Sub Header */}
                <div className="flex justify-between mb-8">
                    <div className="w-1/2">
                        <h3 className="font-bold text-lg mb-2">수신 (To): {data.orgName} 귀중</h3>
                        <p>담당자: {data.picName} 님</p>
                        <p>일자: {today}</p>
                    </div>
                    <div className="w-1/2 text-right">
                        <h3 className="font-bold text-lg mb-2">공급자 (From)</h3>
                        <p>상호: 한국진로적성센터</p>
                        <p>대표: 홍길동</p>
                        <p>주소: 서울특별시 강남구 테헤란로 123</p>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full mb-8 border-collapse border border-slate-300 text-sm">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="border border-slate-300 p-2 w-16 text-center">No</th>
                            <th className="border border-slate-300 p-2 text-left">품목 (Item)</th>
                            <th className="border border-slate-300 p-2 w-24 text-center">수량/규격</th>
                            <th className="border border-slate-300 p-2 w-32 text-right">금액 (Amount)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-slate-300 p-2 text-center">1</td>
                            <td className="border border-slate-300 p-2 font-bold">{data.programTitle}</td>
                            <td className="border border-slate-300 p-2 text-center">1식</td>
                            <td className="border border-slate-300 p-2 text-right">{data.totalPrice.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 p-2 text-center"></td>
                            <td className="border border-slate-300 p-2 text-slate-500 pl-4">
                                - 대상인원: {data.people}명<br/>
                                - 진행회기: {data.sessions}회<br/>
                                - 진행지역: {data.regionLabel}<br/>
                                - 희망일정: {data.date}
                            </td>
                            <td className="border border-slate-300 p-2 text-center"></td>
                            <td className="border border-slate-300 p-2 text-right"></td>
                        </tr>
                    </tbody>
                    <tfoot>
                         <tr className="bg-slate-50 font-bold">
                             <td colSpan={3} className="border border-slate-300 p-3 text-center text-lg">합 계 (Total)</td>
                             <td className="border border-slate-300 p-3 text-right text-lg text-blue-900">{data.totalPrice.toLocaleString()} 원</td>
                         </tr>
                    </tfoot>
                </table>

                {/* Footer Notes */}
                <div className="mt-12 text-sm text-slate-600 space-y-2">
                    <p>1. 본 견적서의 유효기간은 발행일로부터 30일({validUntil})까지입니다.</p>
                    <p>2. 위 금액은 부가가치세(VAT) 별도 금액입니다.</p>
                    <p>3. 자세한 커리큘럼 및 강사 배정은 계약 체결 후 확정됩니다.</p>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl font-bold font-serif">한국진로적성센터 (인)</p>
                </div>
            </div>
        </div>
    );
});
EstimatePDF.displayName = "EstimatePDF";
