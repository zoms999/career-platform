"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, PlayCircle, Lock, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

// Shared interfaces would ideally be in a types file
interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Section {
  title: string;
  lectures: Lecture[];
}

interface ClassroomSidebarProps {
  curriculum: Section[];
  currentLectureId: string;
  onLectureSelect: (id: string) => void;
  className?: string;
  progress: number; // Overall progress
}

export function ClassroomSidebar({ curriculum, currentLectureId, onLectureSelect, className, progress }: ClassroomSidebarProps) {
  return (
    <div className={cn("flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800", className)}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-lg mb-4">커리큘럼</h2>
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                    <span>진도율</span>
                    <span>{Math.round(progress)}% 완료</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>
        </div>

        {/* List */}
        <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
                {curriculum.map((section, sIdx) => (
                    <div key={sIdx}>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 px-2 flex items-center">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.lectures.map((lecture) => {
                                const isActive = lecture.id === currentLectureId;
                                return (
                                    <button
                                        key={lecture.id}
                                        onClick={() => !lecture.locked && onLectureSelect(lecture.id)}
                                        disabled={lecture.locked}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all text-sm",
                                            isActive 
                                                ? "bg-primary/10 text-primary font-medium" 
                                                : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
                                            lecture.locked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                        )}
                                    >
                                        <div className="shrink-0">
                                            {lecture.completed ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : lecture.locked ? (
                                                <Lock className="w-4 h-4" />
                                            ) : (
                                                <PlayCircle className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-400")} />
                                            )}
                                        </div>
                                        <div className="flex-1 line-clamp-2">
                                            {lecture.title}
                                            <span className="block text-xs mt-1 opacity-70 font-normal">{lecture.duration}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    </div>
  );
}
