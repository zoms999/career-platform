"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full py-4 px-1">
      <div className="flex items-center gap-2 mb-2">
        {steps.map((_, index) => {
           const isActive = index + 1 <= currentStep;
           return (
             <div 
               key={index}
               className={cn(
                 "h-1.5 flex-1 rounded-full bg-muted overflow-hidden",
                 isActive ? "bg-primary/20" : "bg-muted"
               )}
             >
                {isActive && (
                   <motion.div 
                     layoutId={`step-${index}`}
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className="h-full bg-primary rounded-full"
                   />
                )}
             </div>
           )
        })}
      </div>
      <div className="flex justify-between items-center px-1">
         <span className="text-sm font-bold text-primary">
            Step {currentStep}
         </span>
         <span className="text-xs font-medium text-muted-foreground/70">
            {steps[currentStep - 1]}
         </span>
      </div>
    </div>
  );
}
