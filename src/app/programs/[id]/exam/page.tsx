"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Timer, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// Mock Exam Data (E-06)
const EXAM_DATA = {
    title: "진로 적성 상담사 2급 자격 시험",
    timeLimit: 3600, // 60 minutes in seconds
    passingScore: 70,
    questions: [
        {
            id: 1,
            question: "진로 상담의 주요 목표로 가장 적절하지 않은 것은?",
            options: [
                "내담자의 자기 이해 증진",
                "직업 정보 탐색 및 수집 능력 함양",
                "상담사가 내담자의 직업을 직접 결정해 주는 것",
                "합리적인 의사결정 능력 향상"
            ],
            answer: 2
        },
        {
            id: 2,
            question: "홀랜드(Holland)의 직업적 성격 유형 6가지에 속하지 않는 것은?",
            options: [
                "현실형 (Realistic)",
                "탐구형 (Investigative)",
                "분석형 (Analytic)",
                "예술형 (Artistic)"
            ],
            answer: 2
        },
        {
            id: 3,
            question: "검사 결과 해석 시 상담사의 태도로 바람직한 것은?",
            options: [
                "검사 결과가 절대적임을 강조한다.",
                "내담자가 결과를 어떻게 받아들이는지 확인하며 해석한다.",
                "전문용어를 최대한 많이 사용하여 전문성을 보인다.",
                "내담자의 반응보다는 검사 수치 전달에 집중한다."
            ],
            answer: 1
        },
        {
            id: 4,
            question: "직업 발달 단계 중 '탐색기'에 해당하는 주요 과업은?",
            options: [
                "자신의 흥미와 적성을 발견하고 잠정적인 진로를 탐색한다.",
                "은퇴를 준비하고 노후 생활을 계획한다.",
                "직업 생활에 안정을 취하고 지위를 공고히 한다.",
                "구체적인 직업을 선택하고 취업 준비를 완료한다."
            ],
            answer: 0
        },
        {
            id: 5,
            question: "초기 면담에서 라포(Rapport) 형성을 위해 필요한 것은?",
            options: [
                "내담자의 말을 비판적으로 분석하기",
                "상담사의 권위를 내세우기",
                "공감적 이해와 수용적인 태도 보이기",
                "빠르게 문제 해결책 제시하기"
            ],
            answer: 2
        }
    ]
};

export default function ExamPage() {
    const router = useRouter();
    const params = useParams();
    const programId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(EXAM_DATA.timeLimit);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // Timer Logic
    useEffect(() => {
        if (isSubmitted) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isSubmitted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswer = (value: string) => {
        setAnswers({ ...answers, [EXAM_DATA.questions[currentQuestionIdx].id]: parseInt(value) });
    };

    const handleNext = () => {
        if (currentQuestionIdx < EXAM_DATA.questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        // Calculate Score
        let correctCount = 0;
        EXAM_DATA.questions.forEach((q) => {
            if (answers[q.id] === q.answer - 1 + 1) { // logic check: options index vs 1-based answer? Mock data seems 0-based index logically but stored answer is 0-based index? 
                // Wait, Looking at Q1: answer 2 (3rd option). Options are 0,1,2,3.
                // In handleAnswer, I parse value which is index.
                // Q5 answer 2. 
                // Let's assume 'answer' in mock data is the 0-based index of the correct option.
                if (answers[q.id] === q.answer) correctCount++;
            }
        });
        const finalScore = (correctCount / EXAM_DATA.questions.length) * 100;
        setScore(finalScore);
        setShowResult(true);
    };

    const progressPercent = ((currentQuestionIdx + 1) / EXAM_DATA.questions.length) * 100;

    if (showResult) {
        const passed = score >= EXAM_DATA.passingScore;
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
                <Card className="max-w-md w-full shadow-xl">
                    <CardHeader className="text-center">
                        <div className={cn("mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4", passed ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900")}>
                            {passed ? <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" /> : <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />}
                        </div>
                        <CardTitle className="text-2xl font-bold">{passed ? "합격을 축하합니다!" : "아쉽게도 불합격했습니다."}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-slate-600 dark:text-slate-400">
                            {passed ? "시험에 통과하여 자격증을 발급받을 수 있습니다." : "재시험을 통해 다시 도전해보세요."}
                        </p>
                        <div className="text-4xl font-bold font-mono py-4">
                            {score}점
                        </div>
                        {passed && (
                            <Alert className="bg-blue-50 border-blue-200 text-left">
                                <AlertTitle className="text-blue-800">안내</AlertTitle>
                                <AlertDescription className="text-blue-700 text-sm">
                                    자격증 발급 페이지로 이동하여 PDF를 다운로드하세요.
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        {passed ? (
                            <Button className="w-full h-12 text-lg" onClick={() => router.push(`/programs/${programId}/certificate`)}>
                                자격증 발급받기 <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (
                            <Button className="w-full" variant="outline" onClick={() => window.location.reload()}>
                                재시험 응시
                            </Button>
                        )}
                        <Button variant="ghost" className="w-full" onClick={() => router.push(`/programs/${programId}/learn`)}>
                            강의실로 돌아가기
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center py-10 px-4">
            <div className="max-w-2xl w-full space-y-6">
                {/* Header info */}
                <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div>
                        <h1 className="font-bold text-lg">{EXAM_DATA.title}</h1>
                        <p className="text-sm text-slate-500">총 {EXAM_DATA.questions.length}문제 / {EXAM_DATA.passingScore}점 이상 합격</p>
                    </div>
                    <div className={cn("flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg", timeLeft < 300 ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-800")}>
                        <Timer className="w-5 h-5" />
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Progress */}
                <Progress value={progressPercent} className="h-2" />

                {/* Question Card */}
                <Card className="min-h-[400px] flex flex-col">
                    <CardHeader>
                        <div className="text-sm font-medium text-slate-500 mb-2">
                            Question {currentQuestionIdx + 1} of {EXAM_DATA.questions.length}
                        </div>
                        <CardTitle className="text-xl leading-relaxed">
                            {EXAM_DATA.questions[currentQuestionIdx].question}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <RadioGroup 
                            value={answers[EXAM_DATA.questions[currentQuestionIdx].id]?.toString()} 
                            onValueChange={handleAnswer}
                            className="space-y-4"
                        >
                            {EXAM_DATA.questions[currentQuestionIdx].options.map((option, idx) => (
                                <div key={idx} className={cn(
                                    "flex items-center space-x-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800",
                                    answers[EXAM_DATA.questions[currentQuestionIdx].id] === idx ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
                                )}>
                                    <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                                    <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer font-medium leading-normal">
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                        <Button 
                            variant="outline" 
                            onClick={handlePrev} 
                            disabled={currentQuestionIdx === 0}
                        >
                            이전 문제
                        </Button>
                        
                        {currentQuestionIdx === EXAM_DATA.questions.length - 1 ? (
                            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                                시험 종료 및 제출
                            </Button>
                        ) : (
                            <Button onClick={handleNext}>
                                다음 문제
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
